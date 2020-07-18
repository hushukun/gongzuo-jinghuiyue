// pages/login/login.js
var app=getApp()
Page({
  data: {
    account:"", //输入的帐户信息
    password:"",//密码
  },
  accountFn(e){ //帐户信息
    // console.log(e)
    this.setData({
      account:e.detail.value
    })
  },
  passwordFn(e){ //密码
    this.setData({
      password:e.detail.value
    })
  }, 
  landFn(){ //登录按钮
    let obj={
      username:this.data.account, //输入的帐户信息
      password:this.data.password,//密码
      mini:true
    }
    console.log(obj)
    if(obj.username==""){ //判断是否输入，如果为空结束函数
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel:false
      })
      return
    }else if(obj.password==""){
      wx.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel:false
      })
      return
    }
    wx.request({ //发起登陆请求
      url: app.url+`login`,
      method:"POST",
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      data:obj,
      success:(res)=>{
        console.log(res)
        if(res.data.code==200){
          let sesson;
          if(res.header["Set-Cookie"]){
            sesson= res.header["Set-Cookie"].split(",")[3].split("=")[1].split(";")[0]
          }else if(res.header["set-cookie"]){
            sesson= res.header["set-cookie"].split(",")[3].split("=")[1].split(";")[0]
          }
          
          wx.setStorageSync("cookieKey", sesson); //设置登陆状态
          wx.reLaunch({ //跳转到首页
            url: '../index/index',
          })
        }else if(res.data.code==400){
          wx.showModal({
            title: '提示',
            content: '账号或密码错误',
            showCancel:false,
            success:(res)=> {
              this.setData({
                account:"",
                password:""
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '登陆失败，请稍后重试',
            showCancel:false
          })
        }
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  }
})