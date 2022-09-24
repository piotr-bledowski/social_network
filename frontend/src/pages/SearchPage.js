import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { phrase } = useParams();
    return (
        <>
            <div className="search-menu">
                <button><h4>All</h4></button>
                <button><h4>Posts</h4></button>
                <button><h4>Groups</h4></button>
                <button><h4>Users</h4></button>
            </div>
        </>
    )
}

export default SearchPage;