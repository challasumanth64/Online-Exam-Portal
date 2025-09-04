
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
// Use PORT for Render, or default to 5000 for local development
const PORT = process.env.PORT || 5000;

// Configure CORS for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB with better error handling
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined in environment variables');
  console.error('Please set MONGODB_URI in your .env file');
  console.error('Example: MONGODB_URI=mongodb://localhost:27017/online_exam_db');
  process.exit(1);
}

// Validate MongoDB URI format
if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
  console.error('ERROR: Invalid MONGODB_URI format');
  console.error('Connection string must start with "mongodb://" or "mongodb+srv://"');
  console.error('Current value:', MONGODB_URI);
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/exam', require('./routes/exam'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
