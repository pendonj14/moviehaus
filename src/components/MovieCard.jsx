import { Link } from 'react-router-dom';
import { getPosterUrl } from '../api/tmdb';

/**
 * MovieCard Component
 * Displays a single movie poster and title in a card format
 * @param {Object} movie - Movie object from TMDB API
 */
const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/watch/${movie.id}`}
      className="group relative overflow-hidden rounded-lg bg-slate-800 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Movie Poster */}
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Movie Title Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {movie.title}
        </h3>
        {movie.release_date && (
          <p className="mt-1 text-sm text-gray-300">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;

