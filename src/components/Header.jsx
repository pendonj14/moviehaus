import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';

/**
 * Header Component
 * Displays the app header with search functionality
 */
const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Debounced search function
  const handleSearch = async (query) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/watch/${movieId}`);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleMovieClick(searchResults[0].id);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              NepFlix
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setShowResults(true);
                  }
                }}
                onBlur={() => {
                  // Delay hiding to allow click on results
                  setTimeout(() => setShowResults(false), 200);
                }}
                placeholder="Search movies..."
                className=" m-2 w-full rounded-full bg-slate-800 px-6 py-2 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                {isSearching ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400"
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
                )}
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto rounded-lg bg-slate-800 border border-slate-700 shadow-xl">
                {searchResults.map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-slate-700 transition-colors text-left"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/92x138?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{movie.title}</h3>
                      {movie.release_date && (
                        <p className="text-gray-400 text-sm">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

