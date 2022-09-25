import { useState } from "react";
import { useParams } from "react-router-dom";
import SearchResultsList from "../components/SearchResultsList";
import { useUser } from "../utils/hooks"

const SearchPage = () => {
    const { phrase } = useParams();
    const user = useUser();
    const [type, setType] = useState('all');

    return (
        <>
            <div className="search-menu">
                <button onClick={() => setType('all')}><h4>All</h4></button>
                <button onClick={() => setType('posts')}><h4>Posts</h4></button>
                <button onClick={() => setType('groups')}><h4>Groups</h4></button>
                <button onClick={() => setType('users')}><h4>Users</h4></button>
            </div>
            <SearchResultsList uri={`/api/search/${user}/${type}/${phrase}`} />
        </>
    )
}

export default SearchPage;