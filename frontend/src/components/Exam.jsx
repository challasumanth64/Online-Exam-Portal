
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Exam.css';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const [fullscreen, setFullscreen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleFullscreen = () => {
        if (!fullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit fullscreen: ${err.message}`);
            });
        }
        setFullscreen(!fullscreen);
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/questions');
                setQuestions(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(timer);
            submitExam();
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const submitExam = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/exam/submit', { answers });
            // Redirect to result page with score
            navigate(`/result?score=${res.data.score}`);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    // Format time as MM:SS with leading zeros
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="exam-container vh-100 d-flex align-items-center">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
                        <div className="card exam-card shadow">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                                <h2 className="mb-0">Online Exam</h2>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-light me-2" onClick={toggleFullscreen}>
                                        {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                                    </button>
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="timer h4 mb-0">
                                        Time Left: <span className="fw-bold">{formatTime(timeLeft)}</span>
                                    </div>
                                    <div className="question-counter h5 mb-0">
                                        Question {currentQuestion + 1} of {questions.length}
                                    </div>
                                </div>
                                
                                <div className="progress-container mb-4">
                                    <div 
                                        className="progress-bar" 
                                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                    ></div>
                                </div>
                                
                                {questions.length > 0 ? (
                                    <div className="d-flex flex-column">
                                        <div className="card question-card mb-4">
                                            <div className="card-body p-4">
                                                <h4 className="mb-0">{questions[currentQuestion].question}</h4>
                                            </div>
                                        </div>
                                        <div className="options-container mb-4">
                                            <div className="row">
                                                {questions[currentQuestion].options.map((option, index) => (
                                                    <div className="col-md-6 mb-3" key={option}>
                                                        <div 
                                                            className={`option-card ${answers[questions[currentQuestion]._id] === option ? 'selected' : ''}`}
                                                            onClick={() => handleAnswer(questions[currentQuestion]._id, option)}
                                                        >
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name={questions[currentQuestion]._id}
                                                                    id={`${questions[currentQuestion]._id}-${index}`}
                                                                    value={option}
                                                                    onChange={() => handleAnswer(questions[currentQuestion]._id, option)}
                                                                    checked={answers[questions[currentQuestion]._id] === option}
                                                                    style={{ display: 'none' }}
                                                                />
                                                                <label className="form-check-label w-100" htmlFor={`${questions[currentQuestion]._id}-${index}`}>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="me-3">
                                                                            <strong>{String.fromCharCode(65 + index)}.</strong>
                                                                        </div>
                                                                        <div>{option}</div>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-secondary btn-lg"
                                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                                disabled={currentQuestion === 0}
                                            >
                                                Previous
                                            </button>
                                            {currentQuestion < questions.length - 1 ? (
                                                <button
                                                    className="btn btn-primary btn-lg"
                                                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                                >
                                                    Next
                                                </button>
                                            ) : (
                                                <button className="btn btn-success btn-lg" onClick={submitExam}>Submit Exam</button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                                        <div className="text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Loading questions...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exam;
