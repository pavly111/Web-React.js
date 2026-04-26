import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function getBackground(condition) {
  if (!condition) return 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
  const c = condition.toLowerCase()
  if (c.includes('clear')) return 'linear-gradient(135deg, #f7971e, #ffd200, #f7971e)'
  if (c.includes('cloud')) return 'linear-gradient(135deg, #4b6cb7, #182848)'
  if (c.includes('rain') || c.includes('drizzle')) return 'linear-gradient(135deg, #1e3c72, #2a5298, #1e3c72)'
  if (c.includes('snow')) return 'linear-gradient(135deg, #e0eafc, #cfdef3)'
  if (c.includes('thunder')) return 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
  if (c.includes('mist') || c.includes('fog')) return 'linear-gradient(135deg, #606c88, #3f4c6b)'
  return 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
}

function getEmoji(condition) {
  if (!condition) return '🌡️'
  const c = condition.toLowerCase()
  if (c.includes('clear')) return '☀️'
  if (c.includes('cloud')) return '☁️'
  if (c.includes('rain') || c.includes('drizzle')) return '🌧️'
  if (c.includes('snow')) return '❄️'
  if (c.includes('thunder')) return '⛈️'
  if (c.includes('mist') || c.includes('fog')) return '🌫️'
  return '🌡️'
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [background, setBackground] = useState(getBackground(null))

  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([])
      return
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
        )
        const data = await res.json()
        setSuggestions(data)
      } catch {
        setSuggestions([])
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [city])

  async function fetchWeather(cityName) {
    if (!cityName) return
    setLoading(true)
    setError(null)
    setWeather(null)
    setSuggestions([])
    setCity(cityName)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      if (!res.ok) throw new Error('City not found')
      const data = await res.json()
      setWeather(data)
      setBackground(getBackground(data.weather[0].description))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') fetchWeather(city)
  }

  return (
    <div className="container" style={{ background }}>
      <div className="inner">
        <h1>Weather</h1>
        <div className="search-wrapper">
          <div className="search-row">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city name..."
            />
            <button onClick={() => fetchWeather(city)}>Search</button>
          </div>
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onClick={() => fetchWeather(s.name)}
                >
                  {s.name}, {s.state ? s.state + ', ' : ''}{s.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <div className="emoji">{getEmoji(weather.weather[0].description)}</div>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p className="condition">{weather.weather[0].description}</p>
            <div className="details">
              <div className="detail">
                <span>Feels Like</span>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail">
                <span>Humidity</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="detail">
                <span>Wind</span>
                <span>{weather.wind.speed} m/s</span>
              </div>
              <div className="detail">
                <span>Pressure</span>
                <span>{weather.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App