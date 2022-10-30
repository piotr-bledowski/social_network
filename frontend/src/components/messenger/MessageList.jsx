import { useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks";
import Message from "./Message";

const MessageList = ({ uri, trigger, setTrigger }) => {
    const { loading, data, error } = useFetch(uri);

    const [messageData, setMessageData] = useState(data);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="message-list">
            {data.map(message =>
                <Message message={{ ...message }} />
            )}
        </div>
    )
}

export default MessageList;