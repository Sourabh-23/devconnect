const express = require('express');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const usersRoutes = require('./modules/users/users.routes'); // ← add karo
const postsRoutes = require('./modules/posts/posts.routes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes); 
app.use('/api/posts', postsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ 
        message: 'Protected route access mila!',
        user: req.user 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;