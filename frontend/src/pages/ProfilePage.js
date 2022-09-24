import { useParams } from "react-router-dom";
import PostList from "../components/posts/PostList";
import ProfilePageHeader from "./ProfilePageHeader";
import { useUser } from "../utils/hooks";

const ProfilePage = () => {
    const { user } = useParams();
    const currentUser = useUser();
    const my = user === currentUser; // A neat shortcut to selectively display elements specific for "my" profile, as in current user's

    return (
        <>
            <ProfilePageHeader user={user} my={my} />
            <PostList uri={`/api/get_users_posts/${user}`} displayForm={my} />
        </>
    )
}

export default ProfilePage;