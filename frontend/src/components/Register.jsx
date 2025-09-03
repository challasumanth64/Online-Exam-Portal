
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { username, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            setSuccess('Registration successful! Redirecting to dashboard...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.msg);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card p-4 p-md-5 shadow" style={{ borderRadius: '15px' }}>
                        <div className="text-center mb-4">
                            <h2 className="display-4 mb-2">Register</h2>
                            <p className="text-muted">Create a new account</p>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <form onSubmit={onSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">Register</button>
                            <div className="text-center">
                                <span>Already have an account? </span>
                                <Link to="/login">Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
