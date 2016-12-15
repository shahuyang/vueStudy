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
    var app = new Vue({
        el:"#app",
        data:{
            message:'hello vue'
        }
    })

    var app2 = new Vue({
        el: '#app-2',
        data: {
            message: 'You loaded this page on ' + new Date()
        }
    })



});





