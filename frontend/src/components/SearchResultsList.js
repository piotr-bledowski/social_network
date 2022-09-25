import { useFetch } from "../utils/hooks";


const SearchResultsList = ({ uri }) => {
    const { data } = useFetch(uri);

    return (
        <div className="search-results">
            {data.length > 0 ?
                <></> :
                <h1>Well, it appears that nothing has been found...</h1>
            }
        </div>
    )
}

export default SearchResultsList;