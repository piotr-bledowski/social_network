import { useState } from "react";
import { hideConvo } from "../../utils/helpers";
import { useFetch, useUser } from "../../utils/hooks";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

const Conversation = ({ friend }) => {
    const { username } = friend;

    const user = useUser();

    const { data } = useFetch(`/api/get_profile_pic/${username}`);

    const handleClickClose = () => {
        hideConvo(username);
    }

    // This makes the changes apply after user sends a message
    const [trigger, setTrigger] = useState(true);

    return (
        <div id={`convo-${username}`} className="convo">
            <section className="convo-top-bar">
                <a href={`/profile/${username}`}>
                    <div className="convo-profile-link">
                        <img className="convo-profile-pic" src={`http://127.0.0.1:8000${data.picture}`} />
                        <h3>{username}</h3>
                    </div>
                </a>
                <button onClick={handleClickClose} className="convo-close-btn">x</button>
            </section>
            <MessageList trigger={trigger} setTrigger={setTrigger} uri={`/api/get_messages/${username}/${user}`} />
            <MessageForm trigger={trigger} setTrigger={setTrigger} user={username} />
        </div>
    )
}

export default Conversation;