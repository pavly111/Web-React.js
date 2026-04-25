import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProjectFrame from './pages/ProjectFrame'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectName/*" element={<ProjectFrame />} />
      </Routes>
    </HashRouter>
  )
}

export default App

