
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const score = new URLSearchParams(location.search).get('score');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                
                // Decode the JWT token to get user info
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const payload = JSON.parse(jsonPayload);
                setUser({ id: payload.user.id, username: payload.user.username || 'User' });
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    // Calculate percentage
    const percentage = score ? (score / 20) * 100 : 0;

    // Determine performance message
    let performanceMessage = '';
    let performanceClass = '';
    
    if (percentage >= 80) {
        performanceMessage = 'Excellent Work!';
        performanceClass = 'text-success';
    } else if (percentage >= 60) {
        performanceMessage = 'Good Job!';
        performanceClass = 'text-primary';
    } else if (percentage >= 40) {
        performanceMessage = 'Fair Effort!';
        performanceClass = 'text-warning';
    } else {
        performanceMessage = 'Keep Practicing!';
        performanceClass = 'text-danger';
    }

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card p-4 p-md-5 shadow" style={{ borderRadius: '15px' }}>
                        <div className="text-center mb-4">
                            <h1 className="display-3 mb-3">Exam Result</h1>
                            {user && <p className="lead">Hello, <strong>{user.username}</strong>! Here's how you performed on the exam</p>}
                        </div>
                        
                        <div className="card border-0 bg-light mb-4">
                            <div className="card-body text-center py-5">
                                <div className="display-1 mb-3">{score}<small className="text-muted">/20</small></div>
                                <div className={`h2 mb-4 ${performanceClass}`}>{performanceMessage}</div>
                                <div className="progress" style={{ height: '25px' }}>
                                    <div 
                                        className={`progress-bar ${percentage >= 80 ? 'bg-success' : percentage >= 60 ? 'bg-primary' : percentage >= 40 ? 'bg-warning' : 'bg-danger'}`}
                                        role="progressbar" 
                                        style={{ width: `${percentage}%` }}
                                    >
                                        {Math.round(percentage)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary btn-lg px-5" onClick={handleGoHome}>
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
