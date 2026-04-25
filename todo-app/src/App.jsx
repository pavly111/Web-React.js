import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState("")

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (!input) return
    setTasks([...tasks, input])
    setInput("")
  }

  function deleteTask(index) {
    const newTasks = tasks.filter((task, i) => i !== index)
    setTasks(newTasks)
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { addTask() }
          }}
          placeholder="Enter a task"
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App