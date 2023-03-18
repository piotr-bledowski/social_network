import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellConcierge } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useUser } from "../../utils/hooks";
import FriendRequest from "../notifications/FriendRequest";

const NotificationButton = () => {
    const user = useUser();
    const { data } = useFetch(`/api/get_friend_requests/${user}`);

    return (
        <button className="notification-btn">
            <h1>
                <FontAwesomeIcon icon={faBellConcierge} />
                <h4 id='notification-counter'>{data.length > 0 && data.length}</h4> {/* Show the number of notifications if there are any */}
            </h1>
            <div id='notification-dropdown' className="dropdown-content">
                {data.map(request =>
                    <FriendRequest request={{ ...request }} />
                )}
            </div>
        </button>
    )
}

export default NotificationButton;