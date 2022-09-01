import { useUser } from "../utils/hooks";

const ProfileButton = () => {
    const user = useUser();

    return (
        <a id='profile-link' href='profile'>
            <button className='inner-btn'>
                <h3>{user}</h3>
            </button>
        </a>
    )
}

export default ProfileButton;