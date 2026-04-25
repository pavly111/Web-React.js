import { Link } from 'react-router-dom'
import { Calculator, Hash, Film, StickyNote, HelpCircle, CheckSquare, Cloud } from 'lucide-react'

const projects = [
  {
    name: 'calculator-app',
    displayName: 'Calculator',
    description: 'A sleek, AMG-inspired calculator with basic operations.',
    icon: <Calculator size={28} />,
    color: '#c8845a',
  },
  {
    name: 'counter-app',
    displayName: 'Counter',
    description: 'Interactive counter with increment, decrement, reset, and double.',
    icon: <Hash size={28} />,
    color: '#6366f1',
  },
  {
    name: 'movie-app',
    displayName: 'Movie App',
    description: 'Browse and discover movies with detailed information.',
    icon: <Film size={28} />,
    color: '#ec4899',
  },
  {
    name: 'notes-app',
    displayName: 'Notes',
    description: 'Create, organize, and search notes with categories.',
    icon: <StickyNote size={28} />,
    color: '#f59e0b',
  },
  {
    name: 'quiz-app',
    displayName: 'Quiz',
    description: 'Test your knowledge with customizable quizzes.',
    icon: <HelpCircle size={28} />,
    color: '#10b981',
  },
  {
    name: 'todo-app',
    displayName: 'Todo List',
    description: 'Simple and effective task manager with local storage.',
    icon: <CheckSquare size={28} />,
    color: '#3b82f6',
  },
  {
    name: 'weather-app',
    displayName: 'Weather',
    description: 'Real-time weather forecasts with beautiful gradients.',
    icon: <Cloud size={28} />,
    color: '#06b6d4',
  },
]

function Home() {
  return (
    <div>
      <div className="header">
        <h1>Web React</h1>
        <p>My collection of React projects — all in one place</p>
      </div>

      <div className="container">
        <div className="projects-grid">
          {projects.map((project) => (
            <Link
              key={project.name}
              to={`/project/${project.name}`}
              className="project-card"
            >
              <div
                className="project-icon"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
                }}
              >
                {project.icon}
              </div>
              <h3>{project.displayName}</h3>
              <p>{project.description}</p>
              <span className="tech-tag">React + Vite</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="footer">
        <p>Built with React & Vite &mdash; Deployed on GitHub Pages</p>
      </div>
    </div>
  )
}

export default Home

