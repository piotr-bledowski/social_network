import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import ReplyList from "../replies/ReplyList";
import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import { useUser } from "../../utils/hooks";


const Comment = ({ commentData }) => {
    const { id, author, text, date, likes, replies } = commentData;
    const [showReplies, setShowReplies] = useState(false);
    const user = useUser();
    const my = user === author;

    const toggleReplies = () => {
        const list = document.getElementById(`reply-list-${id}`);
        if (showReplies) {
            list.style.display = 'none';
            setShowReplies(false);
        }
        else {
            list.style.display = 'block';
            setShowReplies(true);
        }
    }

    return (
        <>
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
                    {my && <DeleteButton type={'comment'} id={id} />}
                </div>
            </div>
            <ReplyList commentId={id} uri={`/api/get_replies/${id}`} />
        </>
    )
}

export default Comment;