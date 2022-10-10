import { createContext } from "react";
import { useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('espresso');

    useEffect(() => {
        const currentTheme = localStorage.getItem('current-theme'); // localStorage saves theme on page reload
        if (currentTheme) {
            setTheme(currentTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}