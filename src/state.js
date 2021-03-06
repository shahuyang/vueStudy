import {observe} from './observe/index'

export function initState(vm){
  const opts = vm.$options
  // console.log(opts)
  // vue 的数据来源 属性 方法 数据 计算属性 watch
  if(opts.props){
    initProps(vm) 
  }
  if(opts.methods){
    initMethod(vm)
  }
  if(opts.data){
    initData(vm)
  }
  if(opts.computed){
    initComputed(vm)
  }
  if(opts.watch){
    initWatch(vm)
  }
}

function initProps(){}
function initMethod(){}
function initData(vm){
  // console.log(vm.$options.data)
  let data = vm.$options.data
  data = typeof data == 'function' ? data.call(vm) : data
  vm._data = data
  // 对象劫持 用户改变了对象，我希望可以得到通知 刷新页面
  // MVVM 数据变化驱动视图变化
  observe(data) // 

}
function initComputed(){}
function initWatch(){}




