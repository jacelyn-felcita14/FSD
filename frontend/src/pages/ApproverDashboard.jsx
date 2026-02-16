import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

const ApproverDashboard = () => {
    const { logout } = useAuth();
    const [requests, setRequests] = useState([]);

    const fetchAllRequests = async () => {
        try {
            const { data } = await api.get('/requests/all');
            setRequests(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadAll = async () => {
            await fetchAllRequests();
        };
        loadAll();
    }, []);

    const handleAction = async (id, status) => {
        try {
            const comments = prompt('Any comments? (Optional)');
            await api.put(`/requests/${id}`, { status, comments });
            fetchAllRequests();
        } catch (err) {
            alert(err.response?.data?.error || 'Action failed');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Approver Dashboard</h1>
                <button onClick={logout} className="glass" style={{ padding: '0.5rem 1rem', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
            </div>

            <div className="glass" style={{ padding: '2rem' }}>
                <h3><Shield style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> All Access Requests</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '1rem' }}>User</th>
                                <th style={{ padding: '1rem' }}>Reason</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>{req.requester?.username}</td>
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
                                            {req.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {req.status === 'PENDING' && (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleAction(req._id, 'APPROVED')}
                                                    style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req._id, 'REJECTED')}
                                                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        {req.status !== 'PENDING' && <span style={{ opacity: 0.5 }}>Processed</span>}
                                    </td>
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

export default ApproverDashboard;
