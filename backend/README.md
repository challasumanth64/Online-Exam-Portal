# Online Exam Application - Backend

This is the backend component of the Online Exam Application built with Node.js and Express.

## Features

- User authentication with JWT
- Password hashing with bcrypt
- MongoDB integration with Mongoose
- RESTful API endpoints
- Question management
- Exam scoring

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing
- Dotenv for environment management

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Then update the values in `.env` with your actual configuration.

3. Start the server:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

4. Seed the database with sample questions:
   ```bash
   npm run seed
   ```

## Project Structure

```
backend/
├── models/
│   ├── User.js
│   └── Question.js
├── routes/
│   ├── auth.js
│   ├── questions.js
│   └── exam.js
├── .env
├── .env.example
├── server.js
├── seed.js
└── package.json
```

## Environment Variables

The `.env.example` file contains the following variables that you need to configure:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT token generation
- `PORT`: The port on which the server will run (default: 5000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user

### Questions
- `GET /api/questions` - Get random exam questions

### Exam
- `POST /api/exam/submit` - Submit exam answers and get score

## Development

The backend server runs on `http://localhost:5000` by default.

Make sure MongoDB is running and the connection string is correctly configured in the `.env` file.