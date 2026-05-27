const { getProfile, updateProfile } = require('./users.service');

// Profile dekho
exports.getProfile = async (req, res) => {
    try {
        const user = await getProfile(req.user.id);
        res.status(200).json({
            message: 'Profile mila!',
            data: user
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Profile update karo
exports.updateProfile = async (req, res) => {
    try {
        const { bio, github, linkedin, skills } = req.body;

        const updated = await updateProfile(req.user.id, {
            bio,
            github,
            linkedin,
            skills
        });

        res.status(200).json({
            message: 'Profile update ho gaya!',
            data: updated
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};