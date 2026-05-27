const db = require('../../config/db');

// Profile dekho
exports.getProfile = async (userId) => {
    const user = await db('users')
        .where({ id: userId })
        .select('id', 'username', 'email', 'bio', 'avatar', 'github', 'linkedin', 'skills', 'created_at')
        .first();

    if (!user) throw new Error('User nahi mila');
    return user;
};

// Profile update karo
exports.updateProfile = async (userId, data) => {
    const { bio, github, linkedin, skills } = data;

    await db('users').where({ id: userId }).update({
        bio,
        github,
        linkedin,
        skills,
        updated_at: new Date()
    });

    return await db('users')
        .where({ id: userId })
        .select('id', 'username', 'email', 'bio', 'github', 'linkedin', 'skills')
        .first();
};