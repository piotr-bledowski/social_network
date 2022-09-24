import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    const handleSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input id='search-text' type='text' />
            {/* using button instead of input allows children (FontAwesomeIcon in this case) */}
            <button id='search-button' type='submit'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    )
}

export default SearchBar;