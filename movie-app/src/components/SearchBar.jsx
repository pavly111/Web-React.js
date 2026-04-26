function SearchBar({ query, onSearch }) {
  return (
    <div className="search-wrapper">
      <input
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search for a movie..."
        className="search-input"
      />
    </div>
  )
}

export default SearchBar