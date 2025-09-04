# Online Exam Application

A full-stack web application for conducting online exams with user authentication, question management, and result tracking.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Database Seeding](#database-seeding)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (register/login)
- Dashboard with user information
- Online exam interface with 20 multiple-choice questions
- 30-minute timer for the exam
- Fullscreen mode for focused exam experience
- Progress tracking during the exam
- Detailed result page with performance analysis
- Responsive design for all device sizes

## Technologies Used

### Frontend
- React.js
- React Router
- Bootstrap 5
- Axios
- Vite (Build tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing

### Database
- MongoDB Atlas (Cloud MongoDB)

## Project Structure

```
online-exam-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Question.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── questions.js
│   │   └── exam.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Exam.jsx
│   │   │   ├── Result.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── ...
├── docs/
│   ├── Online Exam API.postman_collection.json
│   ├── API_TESTING.md
│   ├── test_api.sh
│   └── test_api.bat
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account or local MongoDB instance

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd online-exam-app
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Setup

### Environment Variables

Each directory (`backend` and `frontend`) contains a `.env.example` file that shows the required environment variables.

1. Create a `.env` file in the `backend` directory by copying `.env.example`:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
2. Update the values in `.env` with your actual configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

### MongoDB Setup

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster and database
3. Update the `MONGODB_URI` in your `.env` file with your connection string

## Running the Application

### Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

For development with auto-restart:
```bash
npm run dev
```

### Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend development server will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user

### Questions
- `GET /api/questions` - Get random exam questions

### Exam
- `POST /api/exam/submit` - Submit exam answers and get score

## Testing

### Using Postman

1. Import the Postman collection from `docs/Online Exam API.postman_collection.json`
2. Test the endpoints directly from Postman

### Using cURL

Refer to `docs/API_TESTING.md` for cURL commands to test the API endpoints.

### Automated Testing Scripts

- For Unix/Linux/Mac: Run `docs/test_api.sh`
- For Windows: Run `docs/test_api.bat`

## Database Seeding

To seed the database with questions:

```bash
cd backend
npm run seed
```

This will populate the database with 20 sample questions.

## Deployment

### Render Deployment (Recommended)

This project is configured for deployment on [Render](https://render.com). The repository includes a `render.yaml` file that defines the services for both frontend and backend.

#### Prerequisites
1. A Render account
2. A MongoDB Atlas account (for database)

#### Steps
1. Fork this repository to your GitHub account
2. Log in to Render and connect your GitHub account
3. Create a new Web Service and select your forked repository
4. Render will automatically detect the `render.yaml` file and configure both services
5. Add your environment variables in the Render dashboard:
   - For backend: `MONGODB_URI`, `JWT_SECRET`
   - For frontend: `VITE_API_URL` (set to your backend service URL)

#### Manual Configuration (if automatic detection fails)
If Render doesn't automatically detect the configuration:
- For backend:
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
- For frontend:
  - Root Directory: `frontend`
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`

### Environment Variables for Production

Make sure to set the appropriate environment variables in your production environment:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secret key for JWT token signing
- `PORT` - Port for the backend service (optional, defaults to 5000)
- `VITE_API_URL` - URL of your deployed backend API (for frontend)

### Traditional Deployment

#### Frontend

To build the frontend for production:

```bash
cd frontend
npm run build
```

The build files will be in the `dist` directory.

For deployment, you may need to set environment variables like `VITE_API_BASE_URL` to point to your deployed backend.

#### Backend

For production deployment, ensure:
1. Environment variables are properly set
2. MongoDB connection is configured
3. Use a process manager like PM2 to run the server

```bash
cd backend
npm install -g pm2
pm2 start server.js
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Ensure your `MONGODB_URI` is correct and your MongoDB instance is running.

2. **Port Conflicts**: Change the `PORT` in the `.env` file if port 5000 is already in use.

3. **JWT Secret Missing**: Ensure `JWT_SECRET` is set in your `.env` file.

### Getting Help

If you encounter any issues, please check the existing issues in the repository or create a new one.