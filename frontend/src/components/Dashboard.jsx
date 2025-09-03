import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                setLoading(false);
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const startExam = () => {
        navigate('/exam');
    };

    if (loading) {
        return (
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid vh-100 bg-light">
            <div className="row h-100">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Online Exam Portal</a>
                            <div className="d-flex align-items-center">
                                <span className="text-white me-3">Welcome, <strong>{user?.username}</strong>!</span>
                                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </nav>
                </div>
                
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="card shadow" style={{ width: '100%', maxWidth: '800px', marginTop: '-100px' }}>
                        <div className="card-body p-5">
                            <div className="text-center mb-5">
                                <h1 className="display-4 mb-3">Welcome, {user?.username}!</h1>
                                <p className="lead">Ready to test your knowledge? Start your exam now!</p>
                            </div>
                            
                            <div className="d-flex justify-content-center">
                                <div className="card border-primary mb-3" style={{ maxWidth: '400px' }}>
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="mb-0">Exam Information</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Questions:</span>
                                                <strong>20</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Time Limit:</span>
                                                <strong className="ms-2">30 minutes</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Type:</span>
                                                <strong>Multiple Choice</strong>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center mt-5">
                                <button 
                                    className="btn btn-primary btn-lg px-5 py-3"
                                    onClick={startExam}
                                    style={{ fontSize: '1.2rem' }}
                                >
                                    Start Exam
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;