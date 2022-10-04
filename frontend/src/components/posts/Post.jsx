import PostBottomBar from "./PostBottomBar";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

const Post = ({ post }) => {

    return (
        <div className="post">
            <PostHeader post={{ ...post }} />
            <PostContent data={{ ...post }} />
            <PostBottomBar post={{ ...post }} />
        </div>
    )
}

export default Post;