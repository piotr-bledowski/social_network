import { useFetch } from "../utils/hooks";
import FriendButton from "../components/buttons/FriendButton";
import PictureForm from "../components/PictureForm";


const ProfilePageHeader = ({ user, my }) => {
    const { data } = useFetch(`/api/get_profile_pic/${user}`);

    return (
        <section className="profile-page-header">
            <img src={`http://127.0.0.1:8000${data.picture}`} />
            {my &&
                <PictureForm type={'profile'} name={user} /> // If it's user's own profile page, they can change their profile pic
            }
            <h1>{user}</h1>
            {!my &&
                <FriendButton user={user} />
            }
        </section>
    )
}

export default ProfilePageHeader;