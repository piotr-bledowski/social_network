import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const ProfileButton = () => {
    const user = useContext(UserContext);

    return (
        <a id='profile-link' href='profile'>
            <button className='inner-btn'>
                <h3>{user}</h3>
            </button>
        </a>
    )
}

export default ProfileButton;