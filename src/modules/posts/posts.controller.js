const { createPost, getFeed, likePost, addComment, getComments } = require('./posts.service');

// Post banao
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title aur content bharo' });
        }

        const post = await createPost(req.user.id, title, content);
        res.status(201).json({
            message: 'Post ban gayi!',
            data: post
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Feed dekho
exports.getFeed = async (req, res) => {
    try {
        const posts = await getFeed();
        res.status(200).json({
            message: 'Feed mili!',
            data: posts
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Like karo
exports.likePost = async (req, res) => {
    try {
        const result = await likePost(req.user.id, req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Comment karo
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Comment likho' });
        }

        const comment = await addComment(req.user.id, req.params.id, content);
        res.status(201).json({
            message: 'Comment ho gaya!',
            data: comment
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Comments dekho
exports.getComments = async (req, res) => {
    try {
        const comments = await getComments(req.params.id);
        res.status(200).json({
            message: 'Comments mile!',
            data: comments
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};