import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentButton = () => {


    return (
        <button className="comment-button">
            <FontAwesomeIcon className="post-icon" icon={faPenNib} />
            <h4>Debate</h4>
        </button>
    )
}

export default CommentButton;