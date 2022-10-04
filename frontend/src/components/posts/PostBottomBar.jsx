import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import DeleteButton from "../buttons/DeleteButton";
import { useUser } from "../../utils/hooks";

const PostBottomBar = ({ post }) => {
    const { id, likes, comments, author } = post;
    const user = useUser();
    const my = user === author;

    return (
        <div className="post-bottom-bar">
            <LikeButton likeData={{ id: id, likes: likes, type: 'post' }} />
            <a href={'/post/' + id}>
                <CommentButton data={{ comments: comments, type: 'post' }} />
            </a>
            {my && <DeleteButton type={'post'} id={id} />}
        </div>
    )
}

export default PostBottomBar;