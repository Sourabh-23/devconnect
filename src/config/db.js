// const knex = require('knex');

// const db = knex({
//   client: 'mysql2',
//   connection: {
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'devconnect',
//     port: process.env.DB_PORT || 3306,
//   },
// });

// module.exports = db;

const knex = require('knex');

const db = knex({
    client: 'mysql2',
   connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'devconnect'
    }
});

module.exports = db;

