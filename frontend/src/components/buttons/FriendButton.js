import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useFetch, useUser } from "../../utils/hooks";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";


const FriendButton = ({ user }) => {
    const currentUser = useUser();
    const friendData = useFetch(`/api/is_friend/${currentUser}/${user}`).data;
    const myRequestData = useFetch(`/api/get_friend_request/${currentUser}/${user}`).data;
    const theirRequestData = useFetch(`/api/get_friend_request/${user}/${currentUser}`).data;

    const [buttonText, setButtonText] = useState();
    const [handleClick, setHandleClick] = useState();

    useEffect(() => {
        if (friendData !== 'no') {
            setHandleClick(() => () => {
                fetch(`/api/unfriend/${friendData.id}`, {
                    method: 'DELETE'
                })
                setButtonText('Send friend request')
            });
            setButtonText('Unfriend');
        }
        else {
            if (myRequestData !== 'no') {
                setHandleClick(() => () => {
                    fetch(`/api/cancel_friend_request/${myRequestData.id}`, {
                        method: 'DELETE'
                    })
                    setButtonText('Send friend request')
                });
                setButtonText('Cancel friend request');
            }
            else if (theirRequestData !== 'no') {
                console.log(theirRequestData);
                setHandleClick(() => () => {
                    fetch(`/api/accept_friend_request/${theirRequestData.id}`, {
                        method: 'POST'
                    })
                    setButtonText('Unfriend')
                });
                setButtonText('Accept friend request');
            }
            else {
                setHandleClick(() => () => {
                    fetch(`/api/send_friend_request/${currentUser}/${user}`, {
                        method: 'POST'
                    })
                    setButtonText('Cancel friend request')
                });
                setButtonText('Send friend request');
            }
        }
    }, [friendData, myRequestData, theirRequestData]); // Same idea as with groupPage shenanigans

    return (
        <button onClick={handleClick} className="friend-btn">
            <FontAwesomeIcon icon={faUserTie} className="icon" />
            <h3>{buttonText}</h3>
        </button>
    )
}

export default FriendButton;