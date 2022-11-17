import { useEffect, useRef, useState } from "react";
import { useConversationSetup, useFetch } from "../../utils/hooks";
import Message from "./Message";

const MessageList = ({ uri, trigger, setTrigger }) => {
    const { loading, data, error } = useFetch(uri);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    const [messageData, setMessageData] = useState(data);

    const { setupTrigger, setSetupTrigger } = useConversationSetup();

    const [intervalTrigger, setIntervalTrigger] = useState(true);

    const updateMessages = () => {
        fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(setMessageData)
    }

    useEffect(() => {
        updateMessages();
        setTimeout(() => {
            setIntervalTrigger(() => intervalTrigger ? false : true)
        }, 3000);
        console.log('Messages fetched!');
    }, [trigger, intervalTrigger]);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageData, setupTrigger]);

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