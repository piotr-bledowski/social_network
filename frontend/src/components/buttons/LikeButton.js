import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LikeButton = ({ likes }) => {


    return (
        <button className="like-button">
            <h3 className="counter">{likes}</h3>
            <FontAwesomeIcon className="post-icon" icon={faMugHot} />
            <h4>Hmm, exquisite...</h4>
        </button>
    )
}

export default LikeButton;