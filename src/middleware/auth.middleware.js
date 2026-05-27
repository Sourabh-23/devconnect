require('dotenv').config();
const jwt = require('jsonwebtoken');
const redis = require('../config/redis');

module.exports = async (req, res, next) => {
    try {
        // 1. Token header mein hai?
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token nahi mila' });
        }

        // 2. Token blacklist mein hai? (Redis check)
        const isBlacklisted = await redis.get(`blacklist:${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token invalid hai — dobara login karo' });
        }

        // 3. Token verify karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. User info request mein daalo
        req.user = decoded;

        // 5. Aage jaao
        next();

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expire ho gaya — dobara login karo' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};