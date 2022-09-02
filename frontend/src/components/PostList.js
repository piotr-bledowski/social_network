import { useUser } from '../utils/hooks';
import { useFetch } from '../utils/hooks';
import PostFeed from './Post';

const PostList = () => {
    const user = useUser();

    const { loading, data, error } = useFetch('api/get_public_posts/');

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>

    return (
        <div className='post-list'>
            {data.map((post) =>
                <PostFeed post={{ ...post, detailed: false }} />
            )}
        </div>
    )
}

export default PostList;