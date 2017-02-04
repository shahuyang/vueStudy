var webpack = require('webpack');
// 自定义公共模块提取
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'common', /* filename= */'common.js'); // 分析以下模块的共用代码, 单独打一个包到common.js
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 单独打包CSS
var HtmlWebpackPlugin = require('html-webpack-plugin'); // Html文件处理
var webpack = require('webpack');


module.exports = {
    entry: './dev/src/js/entry.js',
    output: {
        path: __dirname,
        filename: './dev/src/js/bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('./dev/src/css/[name].css', {allChunks: true}),
        // commonsPlugin,
        new HtmlWebpackPlugin({filename: './dev/templates/vue.html', template: './dev/templates/index.html', hash: true}),
    ],
    module: {
        loaders: [
            { test: require.resolve("./dev/src/js/modules/zepto.v1.1.6.js"),  loader: "exports?$"},
            // { test: require.resolve("./dev/src/js/modules/vue.js"),  loader: "exports?Vue"},
            // css 打包进html 中
            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            // css 文件单独打包
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
}







