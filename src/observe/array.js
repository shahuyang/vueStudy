// 我要重写 数组的方法 push 、shift、 unshift、 pop、 reverse、sort 、splice


let oldArrayMethods = Array.prototype
// 原型链查找  先查找重写的 arrayMethods ，重写的没有，会继续向上查找
// value.__proto__ = arrayMethods
// arrayMethods.__proto__ = oldArrayMethods
export let arrayMethods = Object.create(oldArrayMethods)

const methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'sort',
  'splice',
  'reverse'
]

methods.forEach(method => {
  arrayMethods[method] = function(...args){

    console.log('用户调用了 push')
    const result = oldArrayMethods[method].apply(this, args) // 调用了原生的方法

    // push 添加的元素 可能还是一个对象
    let inserted;
    let ob = this.__ob__;
    switch(method){
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2)

      default:
        break
    }

    if(inserted) ob.observeArray(inserted) // 将新增属性 继续观测

    return result
  }
})






