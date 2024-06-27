// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import * as jwt from 'jwt-decode';
import { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => { },
    isAdmin: false,
    setIsAdmin: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwt.jwtDecode<User>(token);
                setAuthToken(token);
                setUser(decodedUser);
                setIsAdmin(decodedUser.role === 'admin');
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && user && !user.adminUuid) {
            navigate('/set-admin-uuid');
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
