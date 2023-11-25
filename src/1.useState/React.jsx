const { createRoot } = ReactDOM;

export const root = createRoot(document.getElementById('app'));


const states = []
const stateSetters = []

let stateIndex = 0


function createState(initialState, stateIndex) {
  return states[stateIndex] ? states[stateIndex] : initialState
}

function createStateSetter(stateIndex) {
  return (newState) => {
    if(typeof newState === 'function'){
      states[stateIndex] = newState(states[stateIndex])
    } else {
      states[stateIndex] = newState
    }
    //每一次更新后需要重新执行render函数
    render()
  }
}

//每一次更新后需要重新执行render函数
async function render() {
  const App = (await import('./App')).default
  stateIndex = 0
  //为什么这里index归零？
  //index用来记录每一次渲染中的每一个函数组件内的多个hook，这时每个hook有自己的标号，所以下面的useState函数中会++
  //但是重新渲染后，从上往下执行，因为用了闭包，之前的渲染hook已经存下来了，那么这次直接从index=0开始找
  root.render(<App />)
}

//* useState 实现
export function useState(initialState){
  states[stateIndex] = createState(initialState, stateIndex)

  if(!stateSetters[stateIndex]){
    stateSetters.push(createStateSetter(stateIndex))
  }

  const _state = states[stateIndex]
  const _setState = stateSetters[stateIndex]

  stateIndex++

  return [
    _state,
    _setState
  ]
}