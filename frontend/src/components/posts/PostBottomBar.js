import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";

const PostBottomBar = ({ post }) => {
    const { id, likes, comments } = post;

    return (
        <div className="post-bottom-bar">
            <LikeButton likeData={{ id: id, likes: likes, type: 'post' }} />
            <a href={'/post/' + id}>
                <CommentButton data={{ comments: comments, type: 'post' }} />
            </a>
        </div>
    )
}

export default PostBottomBar;