 require("./modules/zepto.v1.1.6.js");
 var Vue = require("./modules/vue.js");


 var myComponent = Vue.extend({
  template: '<div>This is my first component!</div>'
 })

 // 2.注册组件，并指定组件的标签，组件的HTML标签为<my-component>
 Vue.component('my-component', myComponent)

 new Vue({
  el: '#app'
 });




