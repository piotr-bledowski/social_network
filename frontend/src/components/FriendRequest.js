import PostProfileLink from "./posts/PostProfileLink";


const FriendRequest = ({ request }) => {
    const { id, sender, receiver, date } = request;

    const accept = () => {
        fetch(`/api/accept_friend_request/${id}`, {
            method: 'POST'
        });
    }

    const reject = () => {
        fetch(`/api/cancel_friend_request/${id}`, {
            method: 'DELETE'
        });
    }

    return (
        <div className="friend-request">
            <div className="request-header">
                <a href={`/profile/${sender}`}>{sender}</a>
                <h4>wants to be your friend</h4>
            </div>
            <div className="request-menu">
                <button onClick={accept} className="accept-btn">Accept</button>
                <button onClick={reject} className="reject-btn">Reject</button>
            </div>
        </div>
    )
}

export default FriendRequest;