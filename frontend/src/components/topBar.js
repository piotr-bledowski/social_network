import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import ThemeDropdown from "./buttons/ThemeDropdown";
import ProfileButton from "./buttons/ProfileButton";
import LogoutButton from "./buttons/LogoutButton";
import NotificationButton from "./buttons/NotificationButton";

const TopBar = () => {

    return (
        <div className='top-bar'>
            <div className="flex-container">
                <FontAwesomeIcon className='main-icon' icon={faMugHot} />
                <h1 id='network-name'><a href='/'>BEAN HUB</a></h1>
                <NotificationButton />
                <ProfileButton />
                <LogoutButton />
                <ThemeDropdown />
            </div>
        </div>
    )
}

export default TopBar;