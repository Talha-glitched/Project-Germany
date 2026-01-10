import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [user, setUser] = useState(
        localStorage.getItem('adminUser')
            ? JSON.parse(localStorage.getItem('adminUser'))
            : null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verify token on mount
        const verifyToken = async () => {
            console.log('🔵 [AuthContext] Verifying token on mount');
            const storedToken = localStorage.getItem('adminToken');
            if (storedToken) {
                console.log('🔵 [AuthContext] Token found in localStorage');
                try {
                    const url = API_ENDPOINTS.AUTH.VERIFY;
                    console.log('🔵 [AuthContext] Making request to:', url);
                    const response = await fetch(url, {
                        headers: {
                            'Authorization': `Bearer ${storedToken}`,
                        },
                    });

                    console.log('🔵 [AuthContext] Response status:', response.status);
                    console.log('🔵 [AuthContext] Response ok:', response.ok);

                    if (response.ok) {
                        const data = await response.json();
                        console.log('✅ [AuthContext] Token verified, user authenticated');
                        setUser(data.admin);
                        setToken(storedToken);
                    } else {
                        console.error('🔴 [AuthContext] Token verification failed, logging out');
                        logout();
                    }
                } catch (error) {
                    console.error('🔴 [AuthContext] Error verifying token:', error);
                    console.error('🔴 [AuthContext] Error message:', error.message);
                    logout();
                }
            } else {
                console.log('🔵 [AuthContext] No token found in localStorage');
            }
            setLoading(false);
        };

        verifyToken();
    }, []);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('adminToken', newToken);
        localStorage.setItem('adminUser', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    };

    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
