const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../../middleware/auth.middleware');
const { upload } = require('./files.controller');

const uploadMiddleware = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

router.post('/upload', authMiddleware, uploadMiddleware.single('file'), upload);

module.exports = router;
