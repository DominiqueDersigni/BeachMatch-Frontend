import './SearchBar.css';

function SearchBar({value, onSearch}) {
    return (
        <input className = "search-bar"
               type="search"
               placeholder="Search for place, province..."
               value={value}
               onChange={(e) => onSearch(e.target.value)}
        />
    );
}

export default  SearchBar
