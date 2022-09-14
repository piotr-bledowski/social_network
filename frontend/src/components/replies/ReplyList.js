import { useFetch } from '../utils/hooks';
import Reply from './Reply';

const ReplyList = ({ uri }) => {
    const { loading, data, error } = useFetch(uri);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className='reply-list'>
            {data.map(reply =>
                <Reply reply={{ ...reply }} />
            )}
        </div>
    )
}

export default ReplyList;