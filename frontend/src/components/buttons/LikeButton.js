import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const LikeButton = ({ data }) => {
    const { id, likes } = data;

    const [liked, setLiked] = useState(false);

    return (
        <button className="like-button">
            <h3 className="counter">{likes}</h3>
            <FontAwesomeIcon className="post-icon" icon={faMugHot} />
            <h4>Hmm, exquisite...</h4>
        </button>
    )
}

export default LikeButton;