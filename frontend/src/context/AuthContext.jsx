import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser({
                        id: decoded.id,
                        role: decoded.role,
                        username: localStorage.getItem('username')
                    });
                }
            } catch {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (token, role, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role, username });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
