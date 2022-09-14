import LikeButton from "../buttons/LikeButton";


const Reply = ({ reply }) => {
    const { id, author, text, date, likes } = reply;

    return (
        <div className="reply">
            <div className="reply-header">
                <h4 className="reply-author">{author}</h4>
                <p className="reply-date">{date}</p>
            </div>
            <div className="reply-content">
                <p className="reply-text">{text}</p>
            </div>
            <div className="reply-bottom-bar">
                <LikeButton likeData={{ id: id, likes: likes, type: 'reply' }} />
            </div>
        </div>
    )
}

export default Reply;