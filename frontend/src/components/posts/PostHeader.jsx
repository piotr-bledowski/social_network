import PostGroupLink from "./PostGroupLink";
import PostProfileLink from "./PostProfileLink";

const PostHeader = ({ post }) => {
    const { author, date, title, group } = post;
    return (
        <div className="post-header">
            <PostProfileLink author={author} />
            {group &&
                <PostGroupLink group={group} />
            }
            <p className="post-date">{date}</p>
            <h3 className="post-title">{title}</h3>
        </div>
    )
}

export default PostHeader;