import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    let user_raw = document.getElementById('username').textContent; // Is wrapped in ""
    const user = user_raw.slice(1, user_raw.length - 1); // Removes the ""

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}