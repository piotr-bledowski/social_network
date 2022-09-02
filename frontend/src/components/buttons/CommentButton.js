import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentButton = ({ comments }) => {


    return (
        <button className="comment-button">
            <h3 className="counter">{comments}</h3>
            <FontAwesomeIcon className="post-icon" icon={faPenNib} />
            <h4>Debate</h4>
        </button>
    )
}

export default CommentButton;