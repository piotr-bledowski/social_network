import { showConvo } from "../../utils/helpers";
import { useFetch, useUser, useConversationSetup, useMessageCounter } from "../../utils/hooks";
import Conversation from "./Conversation";
import { apiPost } from "../../utils/helpers";
import { useState } from "react";


const Friend = ({ friend }) => {
    const { username } = friend;
    const currentUser = useUser();
    const { setupTrigger, setSetupTrigger } = useConversationSetup(); // making conversations scroll down do the bottom upon opening
    const { messageCounter, setMessageCounter } = useMessageCounter();
    const { data } = useFetch(`/api/get_profile_pic/${username}`);

    const handleClick = () => {
        showConvo(username);

        apiPost(`read_messages/${username}/${currentUser}`, 'application/json', {});

        // change URL without reloading the page so that websocket connection works
        //let chatName = user < username ? `${user}_${username}` : `${username}_${user}`;
        //history.replaceState({}, 'Coffee Bean', `/chat/${chatName}`);

        setTimeout(() => setSetupTrigger(setupTrigger ? false : true), 50);
    }

    return (
        <>
            <div className="friend">
                <button onClick={handleClick}>
                    {newMessagesCounter > 0 &&
                        <h4 className="new-messages-counter">{newMessagesCounter}</h4>
                    }
                    <img src={`http://127.0.0.1:8000${data.picture}`} className="friend-pic" />
                    <h3 className="friend-name">{username}</h3>
                </button>
            </div>
            <Conversation friend={friend} />
        </>
    )
}

export default Friend;