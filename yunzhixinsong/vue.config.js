//vue项目配置文件vue.config.js
module.exports = {
    devServer: {
        host: "localhost",   //配置启动的域名，如果设置为0.0.0.0，所有的地址都可以访问
        port: "8082",        //配置端口号，默认是8080
        open: true           //配置浏览器自动启动页面
    }
}
