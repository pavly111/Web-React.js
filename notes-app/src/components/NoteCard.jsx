import { useState } from 'react'

function NoteCard({ note, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  function handleSave() {
    onEdit(note.id, { title, content })
    setEditing(false)
  }

  return (
    <div className="note-card">
      <div className="note-header">
        <span className="note-category">{note.category}</span>
        <div className="note-actions">
          <button className="edit-btn" onClick={() => setEditing(!editing)}>
            {editing ? '✕' : '✏️'}
          </button>
          <button className="delete-btn" onClick={() => onDelete(note.id)}>✕</button>
        </div>
      </div>
      {editing ? (
        <>
          <input
            className="edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="edit-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <button className="save-btn" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-content">{note.content}</p>
        </>
      )}
      <p className="note-date">{note.date}</p>
    </div>
  )
}

export default NoteCard