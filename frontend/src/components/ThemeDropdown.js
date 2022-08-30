import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const ThemeDropdown = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <>
            <button className='dropdown-btn'>
                Theme
                <div className="dropdown-content">
                    <a href='#' id='espresso-theme' onClick={() => setTheme('espresso')}>Espresso</a>
                    <a href='#' id='cappuccino-theme' onClick={() => setTheme('cappuccino')}>Cappuccino</a>
                    <a href='#' id='latte-theme' onClick={() => setTheme('latte')}>Latte</a>
                    <a href='#' id='yerba-theme' onClick={() => setTheme('yerba')}>Yerba Mate</a>
                </div>
            </button>
        </>
    )
}

export default ThemeDropdown;