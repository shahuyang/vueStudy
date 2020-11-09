// vue 核心源码 ， 只是 vue 的一个声明

import {initMixin } from './init'
import {renderMixin} from './render'
import {lifecycleMixin} from './lifecycle'

function Vue(options){
  // 进行 vue 的初始化
  this._init(options)
}

// 通过引入文件的方式 给 vue 原型上添加方法
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)

export default Vue