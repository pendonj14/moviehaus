import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosterUrl } from '../api/tmdb';

/**
 * RecentlyWatched Component
 * Displays recently watched movies from localStorage
 */
const RecentlyWatched = () => {
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    // Load recently watched movies from localStorage
    const loadRecentMovies = () => {
      try {
        const stored = localStorage.getItem('recentlyWatched');
        if (stored) {
          const movies = JSON.parse(stored);
          // Reverse to show most recent first
          setRecentMovies(movies.reverse());
        }
      } catch (error) {
        console.error('Error loading recently watched:', error);
      }
    };

    loadRecentMovies();

    // Listen for storage changes (in case user watches a movie in another tab)
    const handleStorageChange = () => {
      loadRecentMovies();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case of same-tab updates
    const interval = setInterval(loadRecentMovies, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (recentMovies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Recently Watched</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {recentMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/watch/${movie.id}`}
              className="group relative min-w-[200px] flex-shrink-0 overflow-hidden rounded-lg bg-slate-800 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                  src={getPosterUrl(movie.poster_path)}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {movie.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyWatched;

