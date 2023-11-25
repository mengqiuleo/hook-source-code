import { root, useState, useReducer, useEffect, memo } from './React'
const {
  // useState,
  // useReducer,
  // useEffect
  // useCallback,
  // useMemo,
  // memo
} = React;

const Child = memo((props) => {
  console.log('child 组件渲染')
  return (
    <div>
      <h1>count2: { props.count2 }</h1>
      {/* <h1>count2: { props.childData.count2 }</h1> */}
      {/* <button onClick={ props.setCount2 }>+</button> */}
    </div>  
  )
})

function App() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  /**
   * *  memo 核心是浅比较，基本值可以正常对比
   * childData 引用，每次App组件更新，childData引用变了
   */
  // const childData = {
  //   count2
  // }

  // const childData = useMemo(() => ({count2}), [count2]) //这里的 () => ({count2} 是指返回一个对象
  /**
   * useMemo 返回的一般定义成一个对象，如果我们返回一个值的话，直接 memo 包裹就好，memo 是可以正常判断值的
   * 用法二：相当于计算属性 ↓
   */
  // const doubleCount1 = useMemo(() => count1 * 2, [count1])


  // memo 封不住 方法，因为每次引用不同
  // const cbSetCount2 = useCallback(() => {
  //   setCount2(count2 + 1)
  // }, []) //可以指定依赖，一般不放

  return (
    <div>
      <h1>count1: { count1 }</h1>
      {/* <h2>doubleCount1: { doubleCount1 }</h2> */}
      <button onClick={() => setCount1(count1+1)}>+</button>


      <Child count2={count2}/>
      {/* <Child childData={childData} setCount2={cbSetCount2}/> */}
      <button onClick={() => setCount2(count2+1)}>+</button>
    </div>  
  )
}

root.render(<App />)

export default App;