const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const redis = require('../../config/redis');
const emailQueue = require('../../queues/emailQueue'); // ← ADD KARO
const logActivity = require('../../config/activityLogger');

// Register
exports.registerUser = async (username, email, password) => {

    // Check email already exists
    const existing = await db('users').where({ email }).first();
    if (existing) throw new Error('Email already exists');

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB mein save karo
    const [id] = await db('users').insert({
        username,
        email,
        password: hashedPassword,
        created_at: new Date()
    });

    await logActivity(id, 'register', 'User registered');

    // Welcome email bhejo ← ADD KARO
    await emailQueue.add({
        to: email,
        subject: 'Welcome to DevConnect! 🚀',
        html: `
            <h1>Welcome ${username}!</h1>
            <p>DevConnect mein aapka swagat hai!</p>
            <p>Aap ab posts kar sakte hain, developers ko follow kar sakte hain.</p>
            <br/>
            <p>Team DevConnect</p>
        `
    });

    return { id, username, email };
};

// Login
exports.loginUser = async (email, password) => {

    // User dhundho
    const user = await db('users').where({ email }).first();
    if (!user) throw new Error('User not found');

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Wrong password');

    // JWT token banao
    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '24h' }
    );

    await logActivity(user.id, 'login', 'User logged in');

    return { 
        accessToken, 
        user: { 
            id: user.id, 
            username: user.username, 
            email: user.email 
        } 
    };
};

// Logout
exports.logoutUser = async (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    await logActivity(payload.id, 'logout', 'User logged out');
    // Token blacklist karo Redis mein
    await redis.setEx(`blacklist:${token}`, 86400, 'blacklisted');
    return { message: 'Logged out successfully' };
};