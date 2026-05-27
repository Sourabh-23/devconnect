const db = require('../../config/db');
const { sendNotification } = require('../../config/socket');
const logActivity = require('../../config/activityLogger');

// Post banao
exports.createPost = async (userId, title, content) => {
    const [id] = await db('posts').insert({
        user_id: userId,
        title,
        content,
        created_at: new Date()
    });

    await logActivity(userId, 'create_post', 'User created a post', { postId: id });

    return await db('posts').where({ id }).first();
};

// Feed dekho
exports.getFeed = async () => {
    return await db('posts')
        .join('users', 'posts.user_id', 'users.id')
        .select(
            'posts.id',
            'posts.title',
            'posts.content',
            'posts.likes_count',
            'posts.comments_count',
            'posts.created_at',
            'users.username',
            'users.avatar'
        )
        .orderBy('posts.created_at', 'desc');
};

// Like karo
// Like karo
exports.likePost = async (userId, postId) => {
    const existing = await db('likes')
        .where({ user_id: userId, post_id: postId })
        .first();

    if (existing) {
        await db('likes').where({ user_id: userId, post_id: postId }).delete();
        await db('posts').where({ id: postId }).decrement('likes_count', 1);
        return { message: 'Unlike ho gaya!' };
    }

    // Like karo
    await db('likes').insert({ user_id: userId, post_id: postId });
    await db('posts').where({ id: postId }).increment('likes_count', 1);

    await logActivity(userId, 'like_post', 'User liked a post', { postId });

    // Post ka owner kaun hai? ← ANDAR hai
    const post = await db('posts').where({ id: postId }).first();

    // Owner ko notification bhejo ← ANDAR hai
    sendNotification(post.user_id, 'notification', {
        type: 'like',
        message: `Tumhari post like hui! ❤️`,
        postId: postId
    });

    return { message: 'Like ho gaya!' };
};

// Comment karo
exports.addComment = async (userId, postId, content) => {
    const [id] = await db('comments').insert({
        user_id: userId,
        post_id: postId,
        content,
        created_at: new Date()
    });

    await db('posts').where({ id: postId }).increment('comments_count', 1);

    await logActivity(userId, 'comment', 'User commented on a post', { postId, commentId: id });

    return await db('comments').where({ id }).first();
};

// Comments dekho
exports.getComments = async (postId) => {
    return await db('comments')
        .join('users', 'comments.user_id', 'users.id')
        .where('comments.post_id', postId)
        .select(
            'comments.id',
            'comments.content',
            'comments.created_at',
            'users.username',
            'users.avatar'
        )
        .orderBy('comments.created_at', 'desc');
};

