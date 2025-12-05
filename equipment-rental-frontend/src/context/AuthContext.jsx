import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

    const login = (jwt, id) => {
        localStorage.setItem("token", jwt);
        localStorage.setItem("userId", id);

        setToken(jwt);
        setUserId(id);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
