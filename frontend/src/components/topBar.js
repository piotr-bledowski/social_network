import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMugHot } from "@fortawesome/free-solid-svg-icons"

const TopBar = () => {
    return (
        <div className='top-bar'>
            <div className="flex-container">
                <FontAwesomeIcon className='navbar-item main-icon' icon={faMugHot} />
            </div>
        </div>
    )
}

export default TopBar;