const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth.middleware');
const { getProfile, updateProfile } = require('./users.controller');

// Protected routes — token chahiye
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;