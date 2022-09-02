import CommentButton from "./buttons/CommentButton";
import LikeButton from "./buttons/LikeButton";
import PostContent from "./PostContent";

// The post displayed on the feed with main text shortened as nesessary and no comments displayed

const PostFeed = ({ post }) => {
    const { author, title, text, date, img, likes, comments, detailed } = post;

    return (
        <div className="post">
            <div className="post-header">
                <h4 className="post-author">{author.username}</h4>
                <p className="post-date">{date}</p>
                <h3 className="post-title">{title}</h3>
            </div>
            <PostContent data={{ img: img, text: text, detailed: detailed }} />
            <div className="post-bottom-bar">
                <LikeButton likes={likes} />
                <CommentButton comments={comments} />
            </div>
        </div>
    )
}

export default PostFeed;