var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var config = {
    //入口文件
    entry: {
        index: './js/index.js'
    },
    extensions: ['', '.js', '.json', '.css', '.less'],
    output: {
        path: buildPath,  //编译后的文件路径
        filename: 'app.js'
    },
    module: {
        //Loaders
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            //.js 文件使用 babel 来编译处理
            { test: /\.js$/, loader: 'babel' },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]

    },
};

module.exports = config;