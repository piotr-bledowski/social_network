import { useFetch } from "../../utils/hooks";
import CommentButton from "../buttons/CommentButton";
import LikeButton from "../buttons/LikeButton";
import PostContent from "./PostContent";
import PostProfileLink from "./PostProfileLink";

// The post displayed on the feed with main text shortened as nesessary and no comments displayed

const Post = ({ post }) => {
    const { id, author, title, date, likes, comments } = post;

    return (
        <div className="post">
            <div className="post-header">
                <PostProfileLink author={author} />
                <p className="post-date">{date}</p>
                <h3 className="post-title">{title}</h3>
            </div>
            <PostContent data={{ ...post }} />
            <div className="post-bottom-bar">
                <LikeButton likeData={{ id: id, likes: likes, type: 'post' }} />
                <a href={'/post/' + id}>
                    <CommentButton data={{ comments: comments, type: 'post' }} />
                </a>
            </div>
        </div>
    )
}

export default Post;