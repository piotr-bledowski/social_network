import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SearchBar = () => {
    const [phrase, setPhrase] = useState('');

    return (
        <form action={`/search/${phrase}`} className="search-bar">
            <input value={phrase} onChange={(e) => setPhrase(e.target.value)} id='search-text' type='text' />
            {/* using button instead of input allows children (FontAwesomeIcon in this case) */}
            <button id='search-button' type='submit'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    )
}

export default SearchBar;