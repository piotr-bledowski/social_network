import { useFetch } from "../utils/hooks";
import ProfilePicForm from "./ProfilePicForm";


const ProfilePageHeader = ({ user, my }) => {
    const { data } = useFetch(`/api/get_profile_pic/${user}`);

    return (
        <section className="profile-page-header">
            <img src={`http://127.0.0.1:8000${data.picture}`} />
            {my &&
                <ProfilePicForm user={user} /> // If it's user's own profile page, they can change their profile pic
            }
            <h1>{user}</h1>
        </section>
    )
}

export default ProfilePageHeader;