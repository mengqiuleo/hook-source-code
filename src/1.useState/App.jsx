import { root, useState } from './React'
// const {
//   useState,
//   useReducer,
//   useEffect
// } = React;



function App() {

  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => setCount(count+1)}>+</button>
      <button onClick={() => setCount(count-1)}>-</button>
    </div>  
  )
}

root.render(<App />)

export default App;