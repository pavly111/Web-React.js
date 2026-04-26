import { useState } from 'react'
import './App.css'

function App() {
  const [current, setCurrent] = useState('0')
  const [previous, setPrevious] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForNext, setWaitingForNext] = useState(false)

  function handleNumber(num) {
    if (waitingForNext) {
      setCurrent(num)
      setWaitingForNext(false)
    } else {
      setCurrent(current === '0' ? num : current + num)
    }
  }

  function handleOperator(op) {
    if (previous !== null && !waitingForNext) {
      const res = calculate(parseFloat(previous), parseFloat(current), operator)
      setCurrent(String(res))
      setPrevious(String(res))
    } else {
      setPrevious(current)
    }
    setOperator(op)
    setWaitingForNext(true)
  }

function backspace() {
    if (waitingForNext) return
    setCurrent(current.length > 1 ? current.slice(0, -1) : '0')
  }

  function calculate(a, b, op) {
    switch(op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  function handleEquals() {
    if (!operator || previous === null) return
    const res = calculate(parseFloat(previous), parseFloat(current), operator)
    setCurrent(String(res))
    setPrevious(null)
    setOperator(null)
    setWaitingForNext(true)
  }

  function handleClear() {
    setCurrent('0')
    setPrevious(null)
    setOperator(null)
    setWaitingForNext(false)
  }

  function handleDecimal() {
    if (waitingForNext) {
      setCurrent('0.')
      setWaitingForNext(false)
      return
    }
    if (!current.includes('.')) {
      setCurrent(current + '.')
    }
  }

  function handleSign() {
    setCurrent(current.charAt(0) === '-' ? current.slice(1) : '-' + current)
  }

  return (
    <div className="container">
      <div className="header">
  <svg className="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="none" stroke="#c8845a" strokeWidth="2"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="#c8845a" strokeWidth="0.5"/>
    <line x1="50" y1="2" x2="50" y2="50" stroke="#c8845a" strokeWidth="2"/>
    <line x1="50" y1="50" x2="6" y2="74" stroke="#c8845a" strokeWidth="2"/>
    <line x1="50" y1="50" x2="94" y2="74" stroke="#c8845a" strokeWidth="2"/>
  </svg>
  <p className="brand">CALCULATOR</p>
  <p className="model">S-CLASS AMG</p>
</div>
      <div className="display">
        <span className="expression">
          {previous} {operator}
        </span>
        <span className="result">{current}</span>
      </div>
      <div className="buttons">
  <button className="btn-clear" onClick={handleClear}>C</button>
  <button className="btn-sign" onClick={handleSign}>+/-</button>
  <button className="btn-del" onClick={backspace}>⌫</button>
  <button className="btn-operator" onClick={() => handleOperator('÷')}>÷</button>
  <button onClick={() => handleNumber('7')}>7</button>
  <button onClick={() => handleNumber('8')}>8</button>
  <button onClick={() => handleNumber('9')}>9</button>
  <button className="btn-operator" onClick={() => handleOperator('×')}>×</button>
  <button onClick={() => handleNumber('4')}>4</button>
  <button onClick={() => handleNumber('5')}>5</button>
  <button onClick={() => handleNumber('6')}>6</button>
  <button className="btn-operator" onClick={() => handleOperator('-')}>−</button>
  <button onClick={() => handleNumber('1')}>1</button>
  <button onClick={() => handleNumber('2')}>2</button>
  <button onClick={() => handleNumber('3')}>3</button>
  <button className="btn-operator" onClick={() => handleOperator('+')}>+</button>
  <button className="btn-zero" onClick={() => handleNumber('0')}>0</button>
  <button onClick={handleDecimal}>.</button>
  <button className="btn-equals" onClick={handleEquals}>=</button>
</div>
    </div>

  )
}

export default App