import { Link } from 'react-router-dom';
import { getPosterUrl } from '../api/tmdb';

/**
 * MovieRow Component
 * Displays a horizontal row of movies with a title
 */
const MovieRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {movies.map((movie) => (
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
                {movie.release_date && (
                  <p className="mt-1 text-xs text-gray-300">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;

