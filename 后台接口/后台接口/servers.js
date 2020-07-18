// 需要的模块
//express  搭建服务器
//body-parser  //处理表单通过post提交的文本数据   req.body
//cookie-parser //设置cookie
//cookie-session //设置登录用户不造作界面多长时间自动退出
//mysql //连接mysql数据库

let express = require("express");
let bodyparser = require("body-parser");
let cookieparser = require("cookie-parser");
let cookiesession = require("cookie-session");
let mysql = require("mysql")

const app = new express();

//使用bodyParser
app.use(bodyparser.urlencoded({
    extended: false
}));


//后台允许前端跨域请求数据开始
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
        /make the require of options turn back quickly/
    } else {
        next();
    }
});
//后台允许前端跨域请求数据结束



//注意事项：匿名函数自执行，注意上面必须加上分号
//匿名函数自执行
(() => {
    //使用cookie-parser
    app.use(cookieparser())
    let sessionArr = [];
    for (let i = 0; i < 10000; i++) {
        sessionArr[i] = "hello-everyone" + Math.random() * 100 + i
    }
    app.use(cookiesession({
        name: "jiami",
        keys: sessionArr,  //加密数组，数组越复杂，越不容易破解
        maxAge: 30 * 60 * 1000 //设置过期时间
    }))
})();


//引入自定义模块index.js
let fn = require("./route/route.js")

app.use("/api", fn())


app.listen(3003, () => {
    console.log("3003服务器已经启动")
})

