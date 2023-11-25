// 该文件 用来实现memo 
const { Component } = React;

export default class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  }
}


function shallowEqual(o1, o2) {
  if(o1 === o2){
    return true
  }

  if(typeof o1 != 'object' || o1 === null || typeof o2 !== 'object' || o2 === null){
    return false
  }

  const k1 = Object.keys(o1)
  const k2 = Object.keys(o2)

  if(k1.length !== k2.length){
    return false
  }

  for(let k of k1){
    if(!o2.hasOwnProperty(k) || o1[k] !== o2[k]){
      return false
    }
  }

  return true
}