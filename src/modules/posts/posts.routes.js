const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth.middleware');
const { createPost, getFeed, likePost, addComment, getComments } = require('./posts.controller');

// All routes protected
router.post('/', authMiddleware, createPost);
router.get('/feed', authMiddleware, getFeed);
router.post('/:id/like', authMiddleware, likePost);
router.post('/:id/comment', authMiddleware, addComment);
router.get('/:id/comments', authMiddleware, getComments);

module.exports = router;