// const redis = require('redis');

// const client = redis.createClient({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
// });

// client.on('error', (err) => console.log('Redis Client Error', err));

// module.exports = client;

const redis = require('redis');
require('dotenv').config();


const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

client.on('connect', () => {
    console.log('Redis connected! ✅');
});

client.on('error', (err) => {
    console.log('Redis error:', err);
});

client.connect();

module.exports = client;
