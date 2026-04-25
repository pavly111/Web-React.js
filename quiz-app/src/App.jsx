import { useState } from 'react'
import './App.css'

const defaultQuestions = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Paris", "Berlin", "Madrid"],
    correct: "Paris"
  },
  {
    question: "What is the largest planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Jupiter"
  },
  {
    question: "Who wrote To Kill a Mockingbird?",
    answers: ["Harper Lee", "Mark Twain", "Hemingway", "Fitzgerald"],
    correct: "Harper Lee"
  },
  {
    question: "Which planet is closest to the sun?",
    answers: ["Earth", "Venus", "Mercury", "Mars"],
    correct: "Mercury"
  },
  {
    question: "What is 10 x 5?",
    answers: ["40", "45", "50", "55"],
    correct: "50"
  },
  {
    question: "What language runs in the browser?",
    answers: ["Python", "Java", "C++", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "Who created React?",
    answers: ["Google", "Microsoft", "Facebook", "Apple"],
    correct: "Facebook"
  }
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)
  const [customQuestions, setCustomQuestions] = useState(null)

  const questions = customQuestions || defaultQuestions

  function handleAnswer(answer) {
    if (selected) return
    setSelected(answer)
    if (answer === questions[currentIndex].correct) {
      setScore(score + 1)
    }
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)
      setCustomQuestions(data)
      setCurrentIndex(0)
      setScore(0)
      setSelected(null)
      setFinished(false)
    }
    reader.readAsText(file)
  }

  function downloadTemplate() {
  const template = [
    {
      question: "Write your question here?",
      answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correct: "Option 1"
    }
  ]
  const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'questions-template.json'
  a.click()
}

if (finished) {
  const getMessage = () => {
    switch(true) {
      case score <= 2:
        return "Keep practicing! 💪"
      case score <= 5:
        return "Good job! 🙂"
      default:
        return "Perfect score! 🏆"
    }
  }
  return (
    <div className="container">
      <h1>Quiz Finished! 🎉</h1>
      <p className="score">Your score: {score} / {questions.length}</p>
      <p className="message">{getMessage()}</p>
      <button className="btn" onClick={() => {
        setCurrentIndex(0)
        setScore(0)
        setSelected(null)
        setFinished(false)
      }}>Play Again</button>
    </div>
  )
}

  const current = questions[currentIndex]

  return (
    <div className="container">
      <div className="upload-area" onClick={() => document.getElementById('fileInput').click()}>
        <input id="fileInput" type="file" accept=".json" onChange={handleUpload} />
        📂 Upload your own questions (JSON file)
      </div>
      <h2 className="question-count">Question {currentIndex + 1} / {questions.length}</h2>
      <div className="progress-bar">
  <div className="progress-fill" style={{ width: `${(currentIndex / questions.length) * 100}%` }}></div>
</div>
      <h1 className="question">{current.question}</h1>
      <div className="answers">
        {current.answers.map((answer, index) => (
          <button
            key={index}
            className={`answer-btn 
              ${selected === answer && answer === current.correct ? 'correct' : ''}
              ${selected === answer && answer !== current.correct ? 'wrong' : ''}
              ${selected && answer === current.correct ? 'correct' : ''}
            `}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      {selected && (
        <button className="btn" onClick={handleNext}>
          {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
      )}
      <button className="btn-outline" onClick={downloadTemplate}>
  📥 Download Template
</button>
    </div>
  )
}

export default App