
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris',
    },
    {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4',
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
        answer: 'Jupiter',
    },
    {
        question: 'What is the chemical symbol for gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        answer: 'Au',
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        answer: 'William Shakespeare',
    },
    {
        question: 'What is the tallest mammal?',
        options: ['Elephant', 'Giraffe', 'Hippopotamus', 'Rhino'],
        answer: 'Giraffe',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Mars',
    },
    {
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        answer: 'Pacific Ocean',
    },
    {
        question: 'How many continents are there?',
        options: ['5', '6', '7', '8'],
        answer: '7',
    },
    {
        question: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
        answer: 'Diamond',
    },
    {
        question: 'What is the main gas found in the Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        answer: 'Nitrogen',
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'Japan', 'Thailand', 'South Korea'],
        answer: 'Japan',
    },
    {
        question: 'What is the largest bone in the human body?',
        options: ['Femur', 'Tibia', 'Fibula', 'Humerus'],
        answer: 'Femur',
    },
    {
        question: 'What is the smallest country in the world?',
        options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
        answer: 'Vatican City',
    },
    {
        question: 'What is the longest river in the world?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        answer: 'Nile River',
    },
    {
        question: 'Which element has the chemical symbol "O"?',
        options: ['Osmium', 'Oxygen', 'Oganesson', 'Olivine'],
        answer: 'Oxygen',
    },
    {
        question: 'What is the largest mammal in the world?',
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        answer: 'Blue Whale',
    },
    {
        question: 'How many bones are there in an adult human body?',
        options: ['206', '300', '150', '189'],
        answer: '206',
    },
    {
        question: 'Which is the fastest land animal?',
        options: ['Cheetah', 'Lion', 'Leopard', 'Horse'],
        answer: 'Cheetah',
    },
    {
        question: 'What is the largest internal organ in the human body?',
        options: ['Heart', 'Liver', 'Brain', 'Skin'],
        answer: 'Liver',
    },
];

const seedDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await Question.deleteMany({});
    await Question.insertMany(questions);

    mongoose.connection.close();
};

seedDB().then(() => {
    console.log('Database seeded with 20 questions!');
});
