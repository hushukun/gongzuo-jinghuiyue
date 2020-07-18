//app.js
App({ 
  winH:function(){//获取窗口高度
    let windowHeight=0
    wx.getSystemInfo({
      success: (res) => {
        windowHeight=res.windowHeight
      },
    })
    return windowHeight
  },
  cookies:()=>{  //用户登陆过后的sessonId
      return { 'content-type': 'application/x-www-form-urlencoded','Cookie': "JSESSIONID="+wx.getStorageSync('cookieKey') }
  },//http://192.168.0.135:8080/
  url:"https://crm.jinghuiyue.cn/",
  globalData: {
    userInfo: null
  }
})