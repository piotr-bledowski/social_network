import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../utils/hooks";
import Message from "./Message";

const MessageList = ({ uri, trigger, setTrigger }) => {
    const { loading, data, error } = useFetch(uri);

    const [messageData, setMessageData] = useState(data);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    useEffect(() => {
        fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(setMessageData)
    }, [trigger]);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageData]);

    return (
        <div className="message-list">
            {messageData.map(message =>
                <Message message={{ ...message }} />
            )}
            <div ref={bottomRef}></div>
        </div>
    )
}

export default MessageList;