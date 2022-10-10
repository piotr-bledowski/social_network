import Friend from "./Friend";
import { useFetch } from "../../utils/hooks";

const FriendList = ({uri}) => {
    const { loading, data, error } = useFetch(uri);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="friend-list">
            <h2>Your friends</h2>
            {data.map(friend => 
                <Friend friend={{...friend}} />
            )}
        </div>
    )
}

export default FriendList;