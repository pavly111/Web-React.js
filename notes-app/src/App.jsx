import { useState, useEffect } from 'react'
import NoteCard from './components/NoteCard'
import NoteForm from './components/NoteForm'
import SearchBar from './components/SearchBar'
import './index.css'

const CATEGORIES = ['All', 'Work', 'Personal', 'Ideas', 'Study']

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : []
  })
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function addNote(note) {
    setNotes([{ ...note, id: Date.now() }, ...notes])
    setShowForm(false)
  }

  function deleteNote(id) {
    setNotes(notes.filter((n) => n.id !== id))
  }

  function editNote(id, updated) {
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...updated } : n)))
  }

  const filtered = notes.filter((note) => {
    const matchCategory = activeCategory === 'All' || note.category === activeCategory
    const matchQuery = note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    return matchCategory && matchQuery
  })

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">My Notes</h1>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Close' : '+ New Note'}
        </button>
      </div>

      {showForm && <NoteForm onAdd={addNote} categories={CATEGORIES.filter(c => c !== 'All')} />}

      <SearchBar query={query} onSearch={setQuery} />

      <div className="categories">
        {CATEGORIES.map((cat) => {
          const count = cat === 'All'
            ? notes.length
            : notes.filter(n => n.category === cat).length
          return (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="empty">No notes found.</p>
      )}

      <div className="notes-grid">
        {filtered.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </div>
    </div>
  )
}

export default App