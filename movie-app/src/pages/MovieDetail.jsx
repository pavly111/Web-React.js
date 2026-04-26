import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
        const data = await res.json()
        setMovie(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) return <div className="loading-screen">Loading...</div>
  if (!movie) return <div className="loading-screen">Movie not found</div>

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-card">
        <img src={poster} alt={movie.title} className="detail-poster" />
        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          <div className="detail-meta">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>📅 {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</span>
            <span>⏱ {movie.runtime} min</span>
          </div>
          <div className="genres">
            {movie.genres.map((g) => (
              <span key={g.id} className="genre-tag">{g.name}</span>
            ))}
          </div>
          <p className="detail-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail