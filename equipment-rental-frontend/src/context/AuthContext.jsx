import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);

    // Save token & userId to localStorage when they change
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }

        if (userId) {
            localStorage.setItem("userId", userId);
        } else {
            localStorage.removeItem("userId");
        }
    }, [token, userId]);

    const login = (tokenValue, userIdValue) => {
        setToken(tokenValue);
        setUserId(userIdValue);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access auth anywhere
export const useAuth = () => useContext(AuthContext);
