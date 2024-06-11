// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import * as jwt from 'jwt-decode';
import { setAuthToken } from '../services/api';

interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = jwt.jwtDecode<User>(token);
            setAuthToken(token);
            setUser(decodedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
