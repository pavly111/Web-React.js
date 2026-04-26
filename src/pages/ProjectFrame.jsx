import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const projectLabels = {
  'calculator-app': 'Calculator',
  'counter-app': 'Counter',
  'movie-app': 'Movie App',
  'notes-app': 'Notes',
  'quiz-app': 'Quiz',
  'todo-app': 'Todo List',
  'weather-app': 'Weather',
}

function ProjectFrame() {
  const { projectName } = useParams()
  const navigate = useNavigate()

  const frameSrc = `https://pavly111.github.io/Web-React.js/${projectName}/index.html`
  const label = projectLabels[projectName] || projectName

  return (
    <div className="project-frame-container">
      <div className="frame-header">
        <h2>{label}</h2>
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={18} />
          Back to Portal
        </button>
      </div>
      <div className="frame-content">
        <iframe
          src={frameSrc}
          title={label}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

export default ProjectFrame