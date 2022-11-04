import { useState } from "react";
import { hideConvo } from "../../utils/helpers";
import { useFetch, useUser } from "../../utils/hooks";
import ConversationTopBar from "./ConversationTopBar";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

const Conversation = ({ friend }) => {
    const { username } = friend;

    const user = useUser();

    // This makes the changes apply after user sends a message
    const [trigger, setTrigger] = useState(true);

    return (
        <div id={`convo-${username}`} className="convo">
            <ConversationTopBar username={username} />
            <MessageList trigger={trigger} setTrigger={setTrigger} uri={`/api/get_messages/${username}/${user}`} />
            <MessageForm trigger={trigger} setTrigger={setTrigger} user={username} />
        </div>
    )
}

export default Conversation;