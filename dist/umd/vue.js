(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isObject(data) {
    return _typeof(data) === 'object' && data !== 'null';
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  // 我要重写 数组的方法 push 、shift、 unshift、 pop、 reverse、sort 、splice
  var oldArrayMethods = Array.prototype; // 原型链查找  先查找重写的 arrayMethods ，重写的没有，会继续向上查找
  // value.__proto__ = arrayMethods
  // arrayMethods.__proto__ = oldArrayMethods

  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      console.log('用户调用了 push');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); // 调用了原生的方法
      // push 添加的元素 可能还是一个对象

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
      }

      if (inserted) ob.observeArray(inserted); // 将新增属性 继续观测

      return result;
    };
  });

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      // vue 如果数据层次过多，需要递归的去解析 对象的属性 依次增加 set 和 get 方法
      // vue3 使用了 proxy 提高了性能
      def(value, '__ob__', this);

      if (Array.isArray(value)) {
        // 如果是数组的话，不需要对 索引进行观察  因为有性能问题
        // 前端开发一般通过 push 、 shift、unshift 操作数组  
        value.__proto__ = arrayMethods; // 如果数组中是对象 ，我再监控

        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observe, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i += 1) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observe;
  }();

  function defineReactive(data, key, value) {
    observe(value); // 递归实现深度检测

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        console.log("更新数据");
        if (newValue === value) return;
        observe(newValue); //用户设置的也可能是对象

        console.log("值发生变化了");
        value = newValue;
      }
    });
  }

  function observe(data) {
    var isObj = isObject(data);

    if (!isObj) {
      return;
    }

    return new Observe(data);
  }

  function initState(vm) {
    var opts = vm.$options; // console.log(opts)
    // vue 的数据来源 属性 方法 数据 计算属性 watch

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    // console.log(vm.$options.data)
    var data = vm.$options.data;
    data = typeof data == 'function' ? data.call(vm) : data;
    vm._data = data; // 对象劫持 用户改变了对象，我希望可以得到通知 刷新页面
    // MVVM 数据变化驱动视图变化

    observe(data); // 
  }

  // ast 语法树 使用 对象 来描述语法    虚拟dom 使用 对象 描述 dom 节点
  function compileToFunction(template) {
    console.log(template);
    return function render() {};
  }
  // let root = {
  //     tag: 'div',
  //     attrs: [{
  //         name: 'id',
  //         value: 'app'
  //     }],
  //     parent: null,
  //     type: 1,
  //     children: {
  //         tag: 'p',
  //         attrs: [],
  //         parent: root,
  //         type: 1,
  //         children: [{
  //             text: 'hello',
  //             type: 3
  //         }]
  //     }
  // }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // console.log(options)
      // 数据劫持
      var vm = this;
      vm.$options = options;
      initState(vm); // 分割代码
      // 如果传入了 el 属性，需要将页面渲染出来， 就要实现挂载流程

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$mount;
      el = document.querySelector(el); // 默认 先会查找 有没有 render 没有 render 会用  template ， 没有 template 就用 el 中的内容

      if (!options.render) {
        // 对模板进行编译
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML; // 我们需要将 template 转化成  render 方法， vue 2.0 虚拟 dom
        }

        var render = compileToFunction(template);
        options.render = render;
      }
    };
  }

  // vue 核心源码 ， 只是 vue 的一个声明

  function Vue(options) {
    // 进行 vue 的初始化
    this._init(options);
  } // 通过引入文件的方式 给 vue 原型上添加方法


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
