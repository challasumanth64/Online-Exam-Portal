
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Submit exam
router.post('/submit', async (req, res) => {
    const { answers } = req.body;
    let score = 0;

    try {
        const questions = await Question.find({ _id: { $in: Object.keys(answers) } });

        questions.forEach(question => {
            if (question.answer === answers[question._id]) {
                score++;
            }
        });

        res.json({ score });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
