import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = document.getElementById('username').textContent;

    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    )
}