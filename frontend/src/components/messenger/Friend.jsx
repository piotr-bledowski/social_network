import { showConvo } from "../../utils/helpers";
import { useFetch, useUser } from "../../utils/hooks";
import Conversation from "./Conversation";


const Friend = ({ friend }) => {
    const { username } = friend;

    const user = useUser();
    const { data } = useFetch(`/api/get_profile_pic/${user}`);

    const handleClick = () => {
        showConvo(username);
    }

    return (
        <>
            <div className="friend">
                <button onClick={handleClick}>
                    <img src={`http://127.0.0.1:8000${data.picture}`} className="friend-pic" />
                    <h3 className="friend-name">{username}</h3>
                </button>
            </div>
            <Conversation friend={friend} />
        </>
    )
}

export default Friend;