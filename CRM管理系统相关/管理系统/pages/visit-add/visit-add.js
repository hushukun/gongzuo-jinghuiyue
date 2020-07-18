// pages/Add-information/Add-information.js
var app=getApp()
Page({
  data: {
    sid:null,
    name:"", //姓名
    yuanxi:"",//院系
    type:"", //职务
    objective:"",//目的
    visitContent:"",//进度
    array: ['A', 'B1', 'B2', 'C'],
    index: 0,//等级
    problem:"",//遇到的问题
    plan:"",//下一步计划
    date: '2020-06-01', //日期
    time: '12:01', //时间
  },
  nameFn(e){ //获取姓名输入框的值
    this.setData({
      name:e.detail.value
    })
  },
  yuanxiFn(e){ //获取院系输入框的值
    this.setData({
      yuanxi:e.detail.value
    })
  },
  bindDateChange: function(e) { //日期
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) { //时间
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  typeFn(e){ //获取职务输入框的值
    this.setData({
      type:e.detail.value
    })
  },
  objectiveFn(e){ //获取目的输入框的值
    this.setData({
      objective:e.detail.value
    })
  },
  gradeFn(e){ //获取等级输入框的值
    this.setData({
      grade:e.detail.value
    })
  },
  bindPickerChange: function(e) { //获取等级输入框的值
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  problemFn(e){ //获取遇到问题输入框的值
    this.setData({
      problem:e.detail.value
    })
  },
  planFn(e){ //获取下一步计划输入框的值
    this.setData({
      plan:e.detail.value
    })
  },
  visitContentFn(e){ //获取进度输入框的值
    this.setData({
      visitContent:e.detail.value
    })
  },
  addFn(){ //点击保存按钮
    let datTime=this.data.date+" "+this.data.time+":00"
    let obj={
      customer:this.data.name, //姓名
      yuanxi:this.data.yuanxi,//院系
      zhiwu:this.data.type, //职务
      project:this.data.objective,//目的
      type:Number(this.data.index)+1,//类型
      problem:this.data.problem,//问题
      visitContent:this.data.visitContent,//进度
      plan:this.data.plan,//计划
      visitTime:datTime,//时间
      schoolId:Number(this.data.sid)//学校Id
    }
    //console.log(obj)
    for(let key in obj){
      if(obj[key]==""){
        wx.showModal({
          title: '提示',
          content: '请将信息输入完整',
          showCancel:false
        })
        return
      }
    }
    wx.request({
      url: app.url+'school/visit/add',
      method:"POST",
      header:app.cookies(),
      data:obj,
      success:(res)=>{
        console.log(res)
        if(res.data.code==200){
          wx.showModal({
            title: '提示',
            content: '添加成功',
            showCancel:false,
            success:(res)=>{
              console.log(res)
              if(res.confirm){
                wx.navigateBack({
                  url: '../visit/visit',
                })
              }
            },
            fail:(res)=>{
              console.log(res)
            }
          })
        }
      }
    })
    //console.log(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.setData({
      sid:options.sid
    })
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