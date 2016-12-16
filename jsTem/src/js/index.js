require.config({
    baseUrl: "./../src/js",
    paths: {
        //libs
        "zepto": "./modules/zepto.v1.1.6",
        "vue": "./modules/vue",
        "handlebars":"./modules/handlebars-v4.0.5",
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
        handlebars:{
            deps: ['zepto'],
            exports:"Handlebars"
        },
        index: {
            deps: ['zepto','vue','handlebars']
        }
    }
});


requirejs(['zepto','vue','handlebars'],function($,Vue,Handlebars){

console.log(Handlebars)


});





