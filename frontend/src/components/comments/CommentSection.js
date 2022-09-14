import { useFetch } from "../../utils/hooks";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = ({ id }) => {
    const { loading, data, error } = useFetch('/api/get_comments/' + id);
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;
    return (
        <section className="comment-section"> {/* list of comments, each comment has its own list of repiles */}
            <h2 id="discussion">Discussion</h2>
            <CommentForm post={id} />
            {data.map(commentData =>
                <Comment commentData={commentData} />
            )}
        </section>
    )
}

export default CommentSection;