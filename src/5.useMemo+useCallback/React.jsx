// 用来实现memo 
import PureComponent from './PureComponent.jsx'


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



//* 1. useState 实现
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


//* 2. useReducer 实现
export function useReducer(reducer, initialState) {
  const [ state, setState ] = useState(initialState)

  function dispatch(action) {
    const newState = reducer(state, action)
    setState(newState)
  }

  return [
    state,
    dispatch
  ]
}


//* 3. useEffect 实现
const effectDepArr = []
let effectIndex = 0

export function useEffect(cb, depArr) {
  if(typeof cb !== 'function'){
    throw new TypeError('Callback mast be a function')
  }

  if(depArr !== undefined && !Array.isArray(depArr)){
    throw new TypeError('Dependencies must be an array')
  }

  // 这里的 else分支表示初次渲染
  // if 分支判断更新后的 dep依赖值是否发生变化
  const isChanged = effectDepArr[effectIndex]
                    ? depArr.some((dep, index) => dep !== effectDepArr[effectIndex][index])
                    : true

  if(isChanged || depArr === undefined){
    cb()
  }
  effectDepArr[effectIndex] = depArr
  effectIndex++
}


//* 4. memo 实现 
export function memo(FC) {
  return class extends PureComponent {
    render(){
      return FC(this.props)
    }
  }
}


//* 5. useMemo + useCallback
const memoArr = []
const callbackArr = []
let callbackIndex = 0
let memoIndex = 0

export function useMemo(cb, depArr) {
  if(memoArr[memoIndex]){
    const [_memo, _depArr] = memoArr[memoIndex]
    const isFullySame = depArr.every((dep, index) => dep === _depArr[index])
    if(isFullySame){
      memoIndex++
      return _memo
    } else {
      return setNewMemo(cb, depArr)
    }
  } else { //初始化
    return setNewMemo(cb, depArr)
  }

  function setNewMemo(cb, depArr) {
    const memo = cb()
    memoArr[memoIndex] = [memo, depArr]
    memoIndex++
    return memo
  }
}


export function useCallback(cb, depArr) {
  if(callbackArr[callbackIndex]) {
    const [_cb, _depArr] = callbackArr[callbackIndex]
    const isFullySame = depArr.every((dep, index) => dep === _depArr[index])

    if(isFullySame){
      callbackIndex++
      return _cb
    } else {
      return setNewCallback(cb, depArr)
    }
  } else {
    return setNewCallback(cb, depArr)
  }


  function setNewCallback(cb, depArr) {
    callbackArr[callbackIndex] = [cb, depArr]
    callbackIndex++
    return cb
  }
}

//------------------------------------
//每一次更新后需要重新执行render函数
async function render() {
  const App = (await import('./App')).default
  stateIndex = 0
  effectIndex = 0
  callbackIndex = 0
  memoIndex = 0
  //为什么这里index归零？
  //index用来记录每一次渲染中的每一个函数组件内的多个hook，这时每个hook有自己的标号，所以下面的useState函数中会++
  //但是重新渲染后，从上往下执行，因为用了闭包，之前的渲染hook已经存下来了，那么这次直接从index=0开始找
  root.render(<App />)
}