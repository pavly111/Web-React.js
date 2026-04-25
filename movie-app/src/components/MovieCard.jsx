import { useNavigate } from 'react-router-dom'

function MovieCard({ movie }) {
  const navigate = useNavigate()

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img src={poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">
            {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
          </span>
          <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard