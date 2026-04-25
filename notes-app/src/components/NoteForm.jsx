import { useState } from 'react'

function NoteForm({ onAdd, categories }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(categories[0])

  function handleSubmit() {
    if (!title || !content) return
    onAdd({
      title,
      content,
      category,
      date: new Date().toLocaleDateString()
    })
    setTitle('')
    setContent('')
    setCategory(categories[0])
  }

  return (
    <div className="note-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
        className="form-input"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="form-textarea"
        rows={4}
      />
      <div className="form-bottom">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button className="submit-btn" onClick={handleSubmit}>
          Add Note
        </button>
      </div>
    </div>
  )
}

export default NoteForm