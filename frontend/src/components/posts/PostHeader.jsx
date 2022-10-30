import { formatDate } from "../../utils/helpers";
import PostGroupLink from "./PostGroupLink";
import PostProfileLink from "./PostProfileLink";

const PostHeader = ({ post }) => {
    const { author, date, title, group } = post;

    const postDate = formatDate(date);

    return (
        <div className="post-header">
            <PostProfileLink author={author} />
            {group &&
                <PostGroupLink group={group} />
            }
            <p className="post-date">{postDate}</p>
            <h3 className="post-title">{title}</h3>
        </div>
    )
}

export default PostHeader;