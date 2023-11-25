import { root, useState, useReducer } from './React'
const {
  // useState,
  // useReducer,
  useEffect
} = React;



function App() {

  function countReducer(count, { type, payload }) {
    switch(type) {
      case 'PLUS':
        return count + payload;
      case 'MINUS':
        return count - payload;
      case 'MUL':
        return count * payload;
      case 'DIV':
        return count / payload;
      default:
        return count;
    }
  }
  const [count, dispatch] = useReducer(countReducer, 0)

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => dispatch({ type: 'PLUS', payload: 2 })}>+2</button>
      <button onClick={() => dispatch({ type: 'MINUS', payload: 3 })}>-3</button>
    </div>  
  )
}

root.render(<App />)

export default App;