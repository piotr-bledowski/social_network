import { useFetch } from "../../utils/hooks";

const MessageList = ({uri}) => {
    const { loading, data, error } = useFetch(uri);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="message-list">

        </div>
    )
}

export default MessageList;