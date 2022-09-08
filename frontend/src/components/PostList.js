import { useFetch } from '../utils/hooks';
import Post from './Post';
import PostForm from './PostForm';

const PostList = ({ uri }) => {
    const { loading, data, error } = useFetch(uri);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className='post-list'>
            <PostForm />
            {data.map(post =>
                <Post post={{ ...post, detailed: false }} />
            )}
        </div>
    )
}

export default PostList;