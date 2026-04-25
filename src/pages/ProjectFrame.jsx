import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function ProjectFrame() {
  const { projectName } = useParams()
  const navigate = useNavigate()

  // The iframe loads the built sub-project from the relative path
  const frameSrc = `./${projectName}/index.html`

  return (
    <div className="project-frame-container">
      <div className="frame-header">
        <h2>{projectName}</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back to Portal
        </button>
      </div>
      <div className="frame-content">
        <iframe
          src={frameSrc}
          title={projectName}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

export default ProjectFrame

