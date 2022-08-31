import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeDropdown = () => {
    const { setTheme } = useContext(ThemeContext);

    const handleClick = (theme) => {
        setTheme(theme);
        localStorage.setItem('current-theme', theme); // localStorage saves theme on page reload
    }

    return (
        <>
            <button className='dropdown-btn'>
                <h3>Theme</h3>
                <div className="dropdown-content">
                    <a href='#' id='espresso-theme' onClick={() => handleClick('espresso')}>Espresso</a>
                    <a href='#' id='cappuccino-theme' onClick={() => handleClick('cappuccino')}>Cappuccino</a>
                    <a href='#' id='latte-theme' onClick={() => handleClick('latte')}>Latte</a>
                    <a href='#' id='yerba-theme' onClick={() => handleClick('yerba')}>Yerba Mate</a>
                </div>
            </button>
        </>
    )
}

export default ThemeDropdown;