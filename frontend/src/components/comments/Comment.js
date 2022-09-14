import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";


const Comment = ({ commentData }) => {
    const { id, author, text, date, likes, replies } = commentData;

    const toggleReplies = () => {

    }

    return (
        <div className="comment">
            <div className="comment-header">
                <h4 className="comment-author">{author}</h4>
                <p className="comment-date">{date}</p>
            </div>
            <div className="comment-content">
                <p className="comment-text">{text}</p>
            </div>
            <div className="comment-bottom-bar">
                <LikeButton likeData={{ id: id, likes: likes, type: 'comment' }} />
                <CommentButton data={{ comments: replies, handleClick: toggleReplies }} />
            </div>
        </div>
    )
}

export default Comment;