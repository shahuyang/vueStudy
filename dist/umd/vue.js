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

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      // vue 如果数据层次过多，需要递归的去解析 对象的属性 依次增加 set 和 get 方法
      // vue3 使用了 proxy 提高了性能
      this.walk(value);
    }

    _createClass(Observe, [{
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

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // console.log(options)
      // 数据劫持
      var vm = this;
      vm.$options = options;
      initState(vm); // 分割代码
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
