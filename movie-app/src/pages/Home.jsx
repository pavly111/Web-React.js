import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (query.length < 2) {
      fetchPopular()
      return
    }
    const timer = setTimeout(() => {
      searchMovies(query)
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  async function fetchPopular() {
    setLoading(true)
    try {
      const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
      const data = await res.json()
      setMovies(data.results)
    } catch (err) {
      setError('Failed to fetch movies')
    } finally {
      setLoading(false)
    }
  }

  async function searchMovies(q) {
    setLoading(true)
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${q}&language=en-US&page=1`
      )
      const data = await res.json()
      setMovies(data.results)
    } catch (err) {
      setError('Failed to search movies')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <h1 className="home-title">🎬 Movie Search</h1>
      <p className="home-subtitle">The Grand Cinema</p>
<div className="divider"></div>
      <SearchBar query={query} onSearch={setQuery} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Home