
import {Watcher} from './observe/watch'

export function lifecycleMixin(Vue){
  Vue.prototype._update = function(vnode){

  }
}

export function mountComponent(vm, el){
  const options = vm.$options
  vm.$el = el // 真实的 dom 元素


  // watcher 就是用来渲染的 
  // vm._render 通过解析的 render 方法 渲染出虚拟 dom
  // vm._update 就是通过虚拟 dom 创建真实的 dom

 
  // 渲染页面
  // 无论是渲染 还是 更新都会调用
  let updateComponent = () => {
    // 
    vm._updage(vm._render()  /**虚拟 dom  */)
  }
  // 渲染 watcher 每一个组件都有一个 watcher
  new Watcher(vm, updateComponent, () => {}, true)  // true 标识它是一个 渲染 watcher

}