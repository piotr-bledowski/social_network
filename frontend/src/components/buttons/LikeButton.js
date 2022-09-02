import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LikeButton = () => {


    return (
        <button className="like-button">
            <FontAwesomeIcon className="post-icon" icon={faMugHot} />
            <h4>Hmm, exquisite...</h4>
        </button>
    )
}

export default LikeButton;