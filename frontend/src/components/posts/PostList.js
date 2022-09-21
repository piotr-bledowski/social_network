import { useFetch } from '../../utils/hooks';
import Post from './Post';
import PostForm from './PostForm';

const PostList = ({ uri, displayForm, group }) => {
    const { loading, data, error } = useFetch(uri);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className='post-list'>
            {displayForm &&
                <PostForm group={group} /> // only display PostForm in certain circumstances (user's own profile page or homepage / group page)
            }
            {data.map(post =>
                <Post post={{ ...post, detailed: false }} />
            )}
        </div>
    )
}

export default PostList;