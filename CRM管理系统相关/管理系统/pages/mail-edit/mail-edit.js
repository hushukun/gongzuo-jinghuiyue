// pages/Add-information/Add-information.js
var app=getApp()
Page({
  data: {
    id:null,//修该信息的id
    name:"", //姓名
    iphone:"", //手机
    department:"",//院系
    post:"",//职务
    telephone:"",//固话
    email:"",//邮箱
  },
  nameFn(e){ //获取姓名输入框的值
    this.setData({
      name:e.detail.value
    })
  },
  iphoneFn(e){ //获取手机输入框的值
    this.setData({
      iphone:e.detail.value
    })
  },
  departmentFn(e){ //获取院系输入框的值
    this.setData({
      department:e.detail.value
    })
  },
  postFn(e){ //获取职务输入框的值
    this.setData({
      post:e.detail.value
    })
  },
  telephoneFn(e){ //获取固话输入框的值
    this.setData({
      telephone:e.detail.value
    })
  },
  emailFn(e){ //获取下一步计划输入框的值
    this.setData({
      email:e.detail.value
    })
  },
  addFn(){ //点击保存按钮
    let obj={
      id:this.data.id,
      tname:this.data.name, //姓名
      tphone:this.data.iphone, //电话
      department:this.data.department,//院系
      position:this.data.post,//职务
      ttel:this.data.telephone,//固话
      temail:this.data.email,//邮箱
    }
    let regPhone=/^[1][3456789][0-9]{9}$/
    let regEmail=/(^[a-zA-Z0-9]+)@([0-9a-zA-Z\-]+)\.[a-zA-Z]{2,5}$/
    if(!regPhone.test(obj.tphone)){
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确，重新输入',
        showCancel:false
      })
      return
    }
    if(obj.temail!=""){
      if(!regEmail.test(obj.temail)){
        wx.showModal({
          title: '提示',
          content: '邮箱格式不正确，重新输入',
          showCancel:false
        })
        return
      }
    }
    for(let key in obj){
      //console.log(key)
      if(key!="ttel"&&key!="temail"){
        if(obj[key]==""){
          wx.showModal({
            title: '提示',
            content: '请将信息输入完整,邮箱,固话可选填,其他必填',
            showCancel:false
          })
          return
        }
      }
    }
    console.log(obj)
    wx.request({
      url: app.url+'school/adressList/edit',
      method:"POST",
      header:app.cookies(),
      data:obj,
      success:(res)=>{
        console.log(res)
        if(res.data.code==200){
          wx.showModal({
            title: '提示',
            content: '修改成功',
            showCancel:false,
            success:(res)=>{
              if(res.confirm){
                wx.navigateBack({
                  url: '../mail-list/mail-list',
                })
              }
            }
          })
          
        }
      }
    })
  },
  getmailFn(id){ //获取单条通讯录信息
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.url+`school/adressList/get/${id}`,
      header:app.cookies(),
      success:(res)=>{
        console.log(res)
        if(res.data.code==200){
          let data=res.data.data
          this.setData({
            name:data.tname, //姓名
            iphone:data.tphone, //手机
            department:data.department,//院系
            post:data.position,//职务
            telephone:data.ttel,//固话
            email:data.temail,//邮箱
          })
          wx.hideLoading()
        }
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.gid
    })
    this.getmailFn(options.gid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})