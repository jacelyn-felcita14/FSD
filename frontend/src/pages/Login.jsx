import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await api.post('/auth/login', { username, password });
            login(data.token, data.role, data.username);
            navigate(data.role === 'APPROVER' ? '/approver' : '/requester');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="card glass">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <LogIn size={48} color="#6366f1" />
                <h2>Welcome Back</h2>
                <p style={{ opacity: 0.7 }}>Login to manage your access requests</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Sign In
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.8 }}>
                Don't have an account? <Link to="/register" style={{ color: '#6366f1', fontWeight: 600 }}>Register</Link>
            </p>
        </div>
    );
};

export default Login;
