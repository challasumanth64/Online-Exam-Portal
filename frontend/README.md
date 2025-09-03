# Online Exam Application - Frontend

This is the frontend component of the Online Exam Application built with React and Vite.

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

- React.js
- React Router
- Bootstrap 5
- Axios
- Vite (Build tool)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file by copying `.env.example` (if needed):
   ```bash
   cp .env.example .env
   ```
   Then update the values in `.env` with your actual configuration.

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Exam.jsx
│   └── Result.jsx
├── App.jsx
└── main.jsx
```

## Environment Variables

The `.env.example` file contains examples of environment variables that can be used:

- `VITE_API_BASE_URL`: Base URL for API requests (useful for production deployments)
- `VITE_APP_NAME`: Application name

## Development

The frontend development server runs on `http://localhost:5173` by default.

Make sure the backend server is running on `http://localhost:5000` for API requests.
