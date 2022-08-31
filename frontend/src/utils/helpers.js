import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext); // made useTheme hook for simplicity