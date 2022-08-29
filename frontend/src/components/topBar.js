import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import ThemeDropdown from "./ThemeDropdown";

const TopBar = () => {
    return (
        <div className='top-bar'>
            <div className="flex-container">
                <FontAwesomeIcon className='navbar-item main-icon' icon={faMugHot} />
                <h1 id='network-name'>BEAN HUB</h1>
                <ThemeDropdown />
            </div>
        </div>
    )
}

export default TopBar;