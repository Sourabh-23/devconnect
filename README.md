# DevConnect

A Node.js authentication and user management application with Express, MySQL, Redis, and JWT.

## Features

- User authentication (register, login, logout)
- Password hashing with bcryptjs
- JWT token-based authentication
- Redis caching support
- MySQL database integration with Knex.js

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Redis Server

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=devconnect
DB_PORT=3306
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Application

```bash
node src/app.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

## Project Structure

```
devconnect/
├── src/
│   ├── config/
│   │   ├── redis.js
│   │   └── db.js
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.routes.js
│   │       ├── auth.controller.js
│   │       └── auth.service.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## License

MIT
