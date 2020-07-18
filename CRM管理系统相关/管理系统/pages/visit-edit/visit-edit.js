// pages/Add-information/Add-information.js
var app=getApp()
Page({
  data: {
    schoolId: null,
    id:null,
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
    time: '00:01', //时间
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
    //console.log(datTime)
    let obj={
      customer: this.data.name,//姓名
      yuanxi: this.data.yuanxi,//院系
      zhiwu: this.data.type,//职务
      project: this.data.objective,//目的
      type: Number(this.data.index)+1,//类型
      visitContent: this.data.visitContent,//进度
      problem: this.data.problem,//问题
      plan: this.data.plan,//计划
      visitTime: datTime,//时间
      schoolId: this.data.schoolId,
      id: this.data.id
    }
    // console.log(obj)
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
    // console.log(obj)
    wx.request({
      url: app.url+'school/visit/edit',
      method:"POST",
      header:app.cookies(),
      data:obj,
      success:(res)=>{
        // console.log(res)
        if(res.data.code==200){
          wx.showModal({
            title: '提示',
            content: '修改成功',
            showCancel:false,
            success:(res)=>{
              if(res.confirm){
                wx.navigateBack({
                  url: '../visit-list/visit-list',
                })
              }
            }
          })
          
        }
      }
    })
  },
  getvisitFn(id){ //获取单条拜访信息
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.url+`school/visit/get/${id}`,
      header:app.cookies(),
      success:(res)=>{
        // console.log(res)
        if(res.data.code==200){
          let data=res.data.data
          let mounth=data.visitTime.split(" ")
          let times=data.visitTime.split(" ")[1].slice(0,5)
          // console.log(times)
          // console.log(mounth)
          this.setData({
            name:data.customer, //姓名
            yuanxi:data.yuanxi,//院系
            type:data.zhiwu, //职务
            visitContent:data.visitContent,//进度
            objective:data.project,//目的
            index:data.type-1,//等级
            problem:data.problem,//遇到的问题
            plan:data.plan,//下一步计划
            date: mounth[0], //日期
            time: times, //时间
            schoolId: data.schoolId,
            id:data.id
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
  onLoad: function (options) {
    //console.log(options)
    this.getvisitFn(options.id)
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