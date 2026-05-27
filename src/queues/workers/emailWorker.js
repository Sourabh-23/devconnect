require('dotenv').config();
const nodemailer = require('nodemailer');
const emailQueue = require('../emailQueue');

// Email sender setup
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Queue process karo
emailQueue.process(async (job) => {
    const { to, subject, html } = job.data;

    console.log(`Email bhej raha hoon: ${to}`);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    });

    console.log(`Email bhej diya: ${to} ✅`);
});

// Events
emailQueue.on('completed', (job) => {
    console.log(`Job ${job.id} completed ✅`);
});

emailQueue.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed ❌ — ${err.message}`);
});

module.exports = emailQueue;