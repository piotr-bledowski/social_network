

const Comment = ({ commentData }) => {
    const { author, text, date } = commentData;
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

            </div>
        </div>
    )
}

export default Comment;