import Post from "../posts/Post";
import { useFetch } from "../../utils/hooks";

const SearchResult = ({ result }) => {
    if (result.type === 'post') {
        return (
            <Post post={{ ...result, detailed: false }} />
        )
    }

    if (result.type === 'group') {
        return (
            <div className="result-group">
                <a href={`/group/${result.name}`}>
                    <img className="result-group-pic" src={`http://127.0.0.1:8000${result.picture}`} />
                    <h2>{result.name}</h2>
                </a>
            </div>
        )
    }

    // else == user
    const { data } = useFetch(`/api/get_profile_pic/${result.username}`);

    return (
        <div className="result-user">
            <a href={'/profile/' + result.username} >
                <img className="profile-pic" src={`http://127.0.0.1:8000${data.picture}`} />
                <h2>{result.username}</h2>
            </a>
        </div>
    )
}

export default SearchResult;