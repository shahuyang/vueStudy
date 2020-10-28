// 把 data 中数据 都是用 object.defineProperty 不能兼容 IE8 以下 Vue2 
import { isObject } from '../util/index'

class Observe{
  constructor(value){
    // vue 如果数据层次过多，需要递归的去解析 对象的属性 依次增加 set 和 get 方法
    // vue3 使用了 proxy 提高了性能
    this.walk(value)
  }

  walk(data){
    let keys = Object.keys(data);
    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

function defineReactive(data, key, value){
  observe(value) // 递归实现深度检测
   Object.defineProperty(data, key, {
     get(){
      return value
     },
     set(newValue){
        if(newValue === value) return 
        observe(newValue) //用户设置的也可能是对象
        console.log("值发生变化了")
        value = newValue
     }
   })
}


export function observe(data){
  let isObj = isObject(data)
  if(!isObj){
    return ;
  }

  return new Observe(data)

}