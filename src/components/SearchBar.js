const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Search the pokemon here? 🔍"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-bar"
  />
);

export default SearchBar;
