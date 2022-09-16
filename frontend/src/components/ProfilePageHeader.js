import { useFetch } from "../utils/hooks";


const ProfilePageHeader = ({ user, my }) => {
    const { data } = useFetch(`/api/get_profile_pic/${user}`);

    return (
        <section className="profile-page-header">
            <img src={`http://127.0.0.1:8000${data.picture}`} />
            <h1>{user}</h1>
        </section>
    )
}

export default ProfilePageHeader;