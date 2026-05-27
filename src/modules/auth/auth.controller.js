const { registerUser, loginUser, logoutUser } = require('./auth.service');

// Register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Sab fields bharo' });
        }

        const result = await registerUser(username, email, password);
        res.status(201).json({ 
            message: 'User registered successfully', 
            data: result 
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email aur password bharo' });
        }

        const result = await loginUser(email, password);
        res.status(200).json({ 
            message: 'Login successful', 
            data: result 
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'Token nahi mila' });
        }

        const result = await logoutUser(token);
        res.status(200).json(result);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};