import { useFetch } from "../../utils/hooks";
import SearchResult from "./SearchResult";


const SearchResultsList = ({ uri }) => {
    const { data } = useFetch(uri);

    return (
        <div className="search-results">
            {data.length > 0 ?
                data.map(result => <SearchResult result={result} />) :
                <h1>Well, it appears that nothing has been found...</h1>
            }
        </div>
    )
}

export default SearchResultsList;