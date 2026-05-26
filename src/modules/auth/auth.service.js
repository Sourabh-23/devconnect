const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const redis = require('../../config/redis');

exports.register = async ({ email, password, name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db('users').insert({
    email,
    password: hashedPassword,
    name,
    created_at: new Date(),
  });
  return { id: result[0], email, name };
};

exports.login = async ({ email, password }) => {
  const user = await db('users').where('email', email).first();
  if (!user) throw new Error('User not found');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '24h' }
  );

  return { token, user: { id: user.id, email: user.email, name: user.name } };
};

exports.logout = async ({ token }) => {
  // Add token to redis blacklist
  await redis.setex(token, 86400, 'blacklisted');
  return { message: 'Logged out successfully' };
};
