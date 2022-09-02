import { faMugHot, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Post = ({ post }) => {
    const { author, title, text, date } = post;

    return (
        <div className="post">
            <div className="post-header">
                <h4 className="post-author">{author.username}</h4>
                <p className="post-date">{date}</p>
                <h3 className="post-title">{title}</h3>
            </div>
            <div className="post-content">
                <p>{text}</p>
            </div>
            <div className="post-bottom-bar">
                <button className="like-button">
                    <FontAwesomeIcon className="post-icon" icon={faMugHot} />
                    <h4>Hmm, exquisite...</h4>
                </button>
                <button className="comment-button">
                    <FontAwesomeIcon className="post-icon" icon={faPenNib} />
                    <h4>Debate</h4>
                </button>
            </div>
        </div>
    )
}

export default Post;