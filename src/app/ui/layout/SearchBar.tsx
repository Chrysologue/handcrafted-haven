
'use client';
import './SearchBar.css';

type SearchBarProps = {
  onSearch?: (term: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ onSearch, searchTerm, setSearchTerm }: SearchBarProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

    return (
        <form onSubmit={handleSearch} className="searchbar-form">
          <div className="searchbar-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchbar-input"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="searchbar-button"
              aria-label="Submit search"
            >
              <svg
                className="searchbar-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
    );
}