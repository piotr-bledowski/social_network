import { useFetch } from "../utils/hooks";
import Comment from "./Comment";

const CommentSection = ({ id }) => {
    const { loading, data, error } = useFetch('/api/get_comments/' + id);
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;
    console.log(data);
    return (
        <section className="comment-section"> {/* list of comments, each comment has its own list of repiles */}
            {data.map(commentData =>
                <Comment commentData={commentData} />
            )}
        </section>
    )
}

export default CommentSection;