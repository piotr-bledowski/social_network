import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useFetch, useUser } from "../../utils/hooks";

const LikeButton = ({ likeData }) => {
    const { id, likes, type } = likeData;
    const [currentLikes, setCurrentLikes] = useState(likes); // Need to do this, because likes above is read-only and has to be changed on click
    const user = useUser();
    const [liked, setLiked] = useState(false);
    const { data } = useFetch(`/api/is_liked/${type}/${user}/${id}`); // Even custom hook has to follow the rules, useFetch would throw an error if called inside useEffect

    // Called on first render only, not when the like button is clicked
    useEffect(() => {
        setLiked(data.liked === 'yes' ? true : false); // set "liked" state depending on the API's response
    }, [data]);

    const handleClick = () => {
        if (liked) {
            fetch(`/api/unlike/${type}/${user}/${id}`, {
                method: 'DELETE'
            });
            setLiked(false);
            setCurrentLikes(() => currentLikes - 1);
        }
        else {
            fetch(`/api/like/${type}/${user}/${id}`, {
                method: 'POST'
            });
            setLiked(true);
            setCurrentLikes(() => currentLikes + 1);
        }
    }

    useEffect(() => {
        setTimeout(fetch(`/api/get_${type}/${id}`)
        .then(data => data.json())
        .then(data => data.likes)
        .then(setCurrentLikes),
        50)
    }); // Somehow this is how I got the like counter to show, I don't even want to know

    return (
        <button className="like-button" onClick={handleClick}>
            <h3 className="counter">{currentLikes}</h3>
            <FontAwesomeIcon className="post-icon" icon={faMugHot} />
            {liked // fancy ternary operator for switching the text based on "liked" state
                ? <h4>Indeed...</h4>
                : <h4>Hmm, exquisite...</h4>
            }
        </button>
    )
}

export default LikeButton;