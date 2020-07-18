const express = require("express");
const mysql = require("mysql");
const md5 = require("md5-node");
const db = mysql.createPool({
    host: "localhost",  //数据库连接地址  域名或者ip地址
    user: "root",  //mysql的用户名  默认root
    port: "3306", //配置数据库的端口号，默认是3306,如果是3306可以不写
    password: "", //mysql密码，如果为空不用填写
    database: "shops" //连接数据库名称
})


module.exports = () => {
    let route = express.Router(); //express模块中的路由

    //查询产品列表
    // route.get("/product", (req, res) => {
    //     let str = `SELECT * FROM product`
    //     db.query(str, (err, data) => {
    //         if (err) {
    //             console.log("查询失败")
    //         }
    //         res.send(data)
    //     })
    // })

    // //查询分类列表
    // route.get("/category", (req, res) => {
    //     let str = `SELECT * FROM category`
    //     db.query(str, (err, data) => {
    //         if (!err) {
    //             res.send(data)
    //         }
    //     })
    // })


    //封装以上两种方法
    function gataDateFn(strSql, res) {
        db.query(strSql, (err, data) => {
            if (err) {
                res.status(500).send("请求失败").end()
            } else {
                res.send(data)
            }
        })
    }

    let productSql = `SELECT * FROM product`
    route.get("/product", (req, res) => {
        gataDateFn(productSql, res)
    })

    let categorySql = `SELECT * FROM category`
    route.get("/category", (req, res) => {
        gataDateFn(categorySql, res)
    })

    //某个类下面产品接口
    route.get("/categorygoods/:id", (req, res) => {
        let id = req.params.id
        let categorygoodsSql = `SELECT * FROM product WHERE category_id=${id}`
        gataDateFn(categorygoodsSql, res)
    })


    //产品详情
    route.get("/goodsdateil/:id", (req, res) => {
        let id = req.params.id
        let imgDataeil = `SELECT image_url,image_id FROM product_image WHERE product_id=${id}`
        let productSql = `SELECT * FROM product WHERE product_id=${id}`
        let arr = []
        db.query(productSql, (err, data) => {
            if (err) {
                res.status(500).send("请求失败").end()
            } else {
                arr.push(data);
                db.query(imgDataeil, (err, data) => {
                    if (!err) {
                        arr.push(data);
                        res.send(arr)
                    }
                })
            }
        })
    })

    //模糊查询
    route.get("/search", (req, res) => {
        //产品价格
        //产品名称
        //localhost:3000/api/search?keywords=电&price=5999
        //http://localhost:3000/api/search?keywords=&price=3999
        console.log(req.query) //{ keywords: '电', price: '5999' }
        let keywords = req.query.keywords
        let price = req.query.price
        let kwSql = `SELECT * FROM product WHERE product_name LIKE "%${keywords}%"`
        let priceSql = `SELECT * FROM product WHERE product_price LIKE "%${price}%"`
        if (keywords != "") {
            getSearchFn(kwSql, res)
        } else if (price != "") {
            getSearchFn(priceSql, res)
        }
    })
    function getSearchFn(sqlStr, res) {
        db.query(sqlStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("database err").end()
            } else {
                if (data.length == 0) {
                    res.send("没有查询到相关数据").end()
                } else {
                    res.send(data).end()
                }
            }
        })
    }



    //注册
    route.post("/register", (req, res) => {
        console.log(req.body)
        let obj = {}
        // for (let objattr in req.body) {
        //     console.log(objattr)
        //     obj = JSON.parse(objattr)
        // }
        // console.log(obj)
        // let user_name = obj.user_name
        // let login_password = md5(obj.login_password)
        // let regSql = `INSERT INTO user (user_name,login_password) VALUES ('${user_name}','${login_password}')`
        // db.query(regSql, (err) => {
        //     if (!err) {
        //         console.log("注册成功")
        //         res.send({ "status": "success", "msg": "注册成功" }).end()
        //     }
        // })
    })


    //登陆
    route.post("/login", (req, res) => {
        console.log(req.body)
        let obj = {}
        for (let objattr in req.body) {
            console.log(objattr)
            obj = JSON.parse(objattr)
        }
        let user_name = obj.user_name
        let login_password = md5(obj.login_password)
        let loginSql = `SELECT * FROM user WHERE user_name='${user_name}'`
        db.query(loginSql, (err, data) => {
            if (!err) {
                if (data.length == 0) {
                    res.send({ "status": "-1", "msg": "该用户不存在" }).end()
                } else {
                    if (data[0].login_password === login_password) {
                        //设置一条cookie判断登陆成功
                        req.session["user_id"] = data[0].user_id
                        res.send({ "status": "1", "msg": "登录成功" }).end()
                    } else {
                        res.send({ "status": "-1", "msg": "密码不正确" }).end()
                    }
                }
            }
        })
    })


    //用户信息接口
    route.get("/userinfo/:id", (req, res) => {
        // 根据cookie查看是否登陆成功
        console.log(req.session["user_id"])
        let uid = req.params.id
        let userinfoSql = `SELECT user_name,user_phone,user_photo FROM user WHERE user_id=${uid}`
        db.query(userinfoSql, (err, data) => {
            if (err) {
                console.log(err)
                res.send({ "status": 0, "msg": "服务器出错了" }).end()
            } else {
                if (data.length == 0) {
                    res.status(500).send("没有数据").end()
                } else {
                    res.send({ "status": "success", "msg": data[0] }).end()
                }
            }
        })
    })
    return route
}