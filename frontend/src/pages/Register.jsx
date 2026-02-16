import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [form, setForm] = useState({ username: '', password: '', role: 'REQUESTER' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="card glass">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <UserPlus size={48} color="#a855f7" />
                <h2>Create Account</h2>
                <p style={{ opacity: 0.7 }}>Join the Access Management Portal</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={form.username}
                    onChange={(e) => { setForm({ ...form, username: e.target.value }); setError(''); }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={form.password}
                    onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
                    required
                />
                <select
                    className="input-field"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option value="REQUESTER">Requester</option>
                    <option value="APPROVER">Approver</option>
                </select>
                {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Register
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.8 }}>
                Already have an account? <Link to="/login" style={{ color: '#a855f7', fontWeight: 600 }}>Login</Link>
            </p>
        </div>
    );
};

export default Register;
