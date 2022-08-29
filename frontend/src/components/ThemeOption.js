import { useState, useContext } from "react";
import setThemeName from "../helpers";
import { ThemeContext } from "../ThemeContext";

const ThemeOption = ({ themeName }) => {

    const { theme, setTheme } = useContext(ThemeContext); // Short name of CSS class
    const [name, setName] = useState(); // Name actually displayed

    setThemeName(themeName, setName); // Sets text to more readable form of corresponding CSS classes (yerba => Yerba Mate etc.)

    return (
        <>
            <a href='#' id={theme + '-theme'} onClick={() => setTheme('espresso')}>{name}</a>
        </>
    )
}

export default ThemeOption;