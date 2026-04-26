import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(10)

  return (
    <div className="container">
      <h1>{count}</h1>
      
      <div className="button-group">
        <button className="btn-inc" onClick={() => setCount(count + 1)}>Increment</button>
        <button className="btn-dec" onClick={() => setCount(count - 1)}>Decrement</button>
        <button className="btn-reset" onClick={() => setCount(0)}>Reset</button>
        <button className="btn-double" onClick={() => setCount(count * 2)}>Double</button>
      </div>
    </div>
  )
}

export default App