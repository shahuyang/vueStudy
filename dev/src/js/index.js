require.config({
    baseUrl: "./../src/js",
    paths: {
        //libs
        "zepto": "./modules/zepto.v1.1.6",
        "vue": "./modules/vue",
        // controller
        "index":"./index"
    },
    shim:{
        zepto: {
            exports: 'Zepto'
        },
        vue: {
            exports:'Vue'
        },
        index: {
            deps: ['zepto','vue']
        }
    }
});


requirejs(['zepto','vue'],function($,Vue){
    var Child = Vue.extend({
        template:'<p>沙岵杨真帅</p>'
    }); //   创建一个子构造器
    var Parent = Vue.extend({
        // 在Parent 组件中内使用 <child-component>
        template:'<p>小卫好美啊</p><child-component></child-component>',
        components:{
            //  局部注册 子组件,该组件只能在 Parent 组件中使用
            'child-component':Child
        }
    });
    Vue.component('parent-component',Parent);
    new Vue({
        el:'#app'
    })
});





