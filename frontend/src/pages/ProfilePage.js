import { useParams } from "react-router-dom";
import { useUser } from "../utils/hooks";

const ProfilePage = () => {
    const { user } = useParams();
    const currentUser = useUser();

    const my = user === currentUser; // A neat shortcut to selectively display elements specific for "my" profile, as in current user's

    return (
        <>
            <h1>
                Profile page!
            </h1>
        </>
    )
}

export default ProfilePage;