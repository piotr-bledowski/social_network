

const Post = ({ post }) => {
    const { author, title, text, date } = post;

    return (
        <div className="post">
            <div className="post-header">
                <h3>{title}</h3>
                <h4>{author}</h4>
                <p>{date}</p>
            </div>
            <div className="post-content">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Post;