const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth.middleware');
const { fetchLogs } = require('./activity.controller');

router.get('/', authMiddleware, fetchLogs);

module.exports = router;
