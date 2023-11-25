import { root, useState, useReducer, useEffect } from './React'
const {
  // useState,
  // useReducer,
  // useEffect
} = React;



function App() {
  let t;
  const [count, setCount] = useState(0)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    console.log('useEffect')

    t = setInterval(() => {
      setSecond(second => second + 1)
    }, 1000)

    return () => {
      clearInterval(t)
      t = null
    }
  }, [])

  useEffect(() => {
    setSecond(count)
  }, [count])

  return (
    <div>
      <h1>{ count }</h1>
      <h2>{ second }s</h2>
      <button onClick={() => setCount(count+1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>-</button>
    </div>  
  )
}

root.render(<App />)

export default App;