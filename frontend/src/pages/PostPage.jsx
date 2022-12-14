import { useParams } from "react-router-dom"
import { useFetch } from "../utils/hooks";
import Post from "../components/posts/Post";
import CommentSection from "../components/comments/CommentSection";


const PostPage = () => {
    const { id } = useParams();
    const { loading, data, error } = useFetch('/api/get_post/' + id);
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="post-wrapper">
            <Post post={{ ...data, detailed: true }} />
            <CommentSection id={id} />
        </div>
    )
}

export default PostPage;