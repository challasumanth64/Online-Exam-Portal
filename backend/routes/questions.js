
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get random questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 20 } }]);
        res.json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
