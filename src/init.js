import { initState } from './state'
import { compileToFunction } from './compiler/index.js' 

export function initMixin(Vue){
  // 初始化流程
  Vue.prototype._init = function (options) {
    // console.log(options)
    
    // 数据劫持
    const vm = this;
    vm.$options = options

    initState(vm) // 分割代码


    // 如果传入了 el 属性，需要将页面渲染出来， 就要实现挂载流程
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
  };

  Vue.prototype.$mount = function(el){
    const vm = this;
    const options = vm.$mount;
    el = document.querySelector(el)

    // 默认 先会查找 有没有 render 没有 render 会用  template ， 没有 template 就用 el 中的内容
    if(!options.render){
      // 对模板进行编译
      let template = options.template;
      if(!template && el){
        template = el.outerHTML
        // 我们需要将 template 转化成  render 方法， vue 2.0 虚拟 dom
      }
      const render = compileToFunction(template)
      options.render = render;

    }
  }
}

