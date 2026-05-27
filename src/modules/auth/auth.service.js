const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const redis = require('../../config/redis');

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
    // Token blacklist karo Redis mein
    await redis.setEx(`blacklist:${token}`, 86400, 'blacklisted');
    return { message: 'Logged out successfully' };
};
