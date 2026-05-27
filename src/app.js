const express = require('express');
const http = require('http'); // ← add karo
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const usersRoutes = require('./modules/users/users.routes');
const postsRoutes = require('./modules/posts/posts.routes');
const { initSocket } = require('./config/socket'); // ← add karo
const connectMongo = require('./config/mongodb'); // ← add karo

dotenv.config();

// Email worker start karo
require('./queues/workers/emailWorker');

const app = express();
const server = http.createServer(app); // ← add karo
initSocket(server); // ← add karo
connectMongo(); // ← add karo
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

server.listen(PORT, () => { // ← app.listen se server.listen
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;