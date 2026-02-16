import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const RequesterDashboard = () => {
    const { logout } = useAuth();
    const [reason, setReason] = useState('');
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchRequests = async () => {
        try {
            const { data } = await api.get('/requests/my');
            setRequests(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadRequests = async () => {
            await fetchRequests();
        };
        loadRequests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/requests', { reason });
            setReason('');
            setSuccess('Request submitted successfully!');
            fetchRequests();
        } catch (err) {
            setError(err.response?.data?.error || 'Submission failed');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Requester Dashboard</h1>
                <button onClick={logout} className="glass" style={{ padding: '0.5rem 1rem', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
            </div>

            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3><PlusCircle style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> New Access Request</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="input-field"
                        placeholder="Why do you need access?"
                        style={{ minHeight: '100px', resize: 'vertical' }}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: '#ef4444' }}>{error}</p>}
                    {success && <p style={{ color: '#10b981' }}>{success}</p>}
                    <button type="submit" className="btn-primary">Submit Request</button>
                </form>
            </div>

            <div className="glass" style={{ padding: '2rem' }}>
                <h3>My Requests</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '1rem' }}>Reason</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Submitted At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>{req.reason}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            background: req.status === 'PENDING' ? 'rgba(245, 158, 11, 0.1)' :
                                                req.status === 'APPROVED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: req.status === 'PENDING' ? '#f59e0b' :
                                                req.status === 'APPROVED' ? '#10b981' : '#ef4444'
                                        }}>
                                            {req.status === 'PENDING' && <Clock size={16} />}
                                            {req.status === 'APPROVED' && <CheckCircle size={16} />}
                                            {req.status === 'REJECTED' && <XCircle size={16} />}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', opacity: 0.6 }}>{new Date(req.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {requests.length === 0 && <p style={{ textAlign: 'center', opacity: 0.5, marginTop: '1rem' }}>No requests found</p>}
                </div>
            </div>
        </div>
    );
};

export default RequesterDashboard;
