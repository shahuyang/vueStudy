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

    Vue.component('ceshi',{
        template:'#myComponent'
    });
    new Vue({
        el:'#app'
    })


});





