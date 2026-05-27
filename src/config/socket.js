const { Server } = require('socket.io');

let io;

// Online users store karo
// userId → socketId mapping
const onlineUsers = new Map();

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id} ✅`);

        // User apni ID register karta hai
        socket.on('register', (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        // User disconnect hone par
        socket.on('disconnect', () => {
            // Online users se hata do
            onlineUsers.forEach((socketId, userId) => {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`User ${userId} disconnected ❌`);
                }
            });
        });
    });

    return io;
};

// Kisi specific user ko notification bhejo
const sendNotification = (userId, event, data) => {
    const socketId = onlineUsers.get(String(userId));
    if (socketId) {
        io.to(socketId).emit(event, data);
        console.log(`Notification bheja user ${userId} ko ✅`);
    } else {
        console.log(`User ${userId} online nahi hai`);
    }
};

module.exports = { initSocket, sendNotification };