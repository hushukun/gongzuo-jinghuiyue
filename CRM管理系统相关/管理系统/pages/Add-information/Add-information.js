// pages/Add-information/Add-information.js
var app=getApp()
Page({
  data: {
    name:"", //学校姓名
    company:"",//主管单位
    address:"",//详细地址
    area:"",//面积
    number:"",//人数
    schoolCode:0,//学校代码
    schoolType: ['本科', '专科', '中专'],//学校类型
    typeIndex: 0,
    schoolNature:['公办', '民办'],//学校性质
    natureIndex:0,
    region: ['河南省', '郑州市', '中原区'],//地址
    regionCode: ["410000", "410100", "410102"] //地址id
  },
  nameFn(e){ //获取学校姓名输入框的值
    this.setData({
      name:e.detail.value
    })
  },
  bindPickerType(e) { //获取学校类型输入框的值
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindPickerNature(e) { //获取学校性质输入框的值bindPickerNature
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      natureIndex: e.detail.value
    })
  },
  companyFn(e){ //获取学校主管单位输入框的值
    this.setData({
      company:e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.code)
    this.setData({
      region: e.detail.value,
      regionCode:e.detail.code
    })
  },
  addressFn(e){ //详细地址
    this.setData({
      address:e.detail.value
    })
  },
  codeFn(e){ //学校代码
    this.setData({
      schoolCode:e.detail.value
    })
  },
  areaFn(e){ //获取学校占地面积输入框的值
    this.setData({
      area:e.detail.value
    })
  },
  numberFn(e){ //获取学校在校人数输入框的值
    this.setData({
      number:e.detail.value
    })
  },
  addFn(){ //点击保存按钮
    let obj={
      name:this.data.name, //学校姓名
      schoolType:this.data.typeIndex+1, //学校类型
      schoolNature:this.data.natureIndex+1,//学校性质
      schoolZhuguandanwei:this.data.company,//主管单位
      provinceId:this.data.regionCode[0], //省级id
      cityId:this.data.regionCode[1], //市级id
      areaId:this.data.regionCode[2], //县区级id
      schoolProportion:this.data.area,//面积
      studentNum:this.data.number,//人数
      schoolCode:this.data.schoolCode, //院校代码
      address:this.data.address //详细地址
    }
    console.log(this.data.natureIndex+1)
    //console.log(obj)
    for(let key in obj){
      if(key!="schoolProportion"&&key!="studentNum"){
        //console.log(key)
        if(obj[key]==""){
          wx.showModal({
            title: '提示',
            content: '请将信息输入完整,学校面积和人数为选填,其他必填',
            showCancel:false
          })
          return
        }
      }
    }
    wx.request({
      url: app.url+'school/msg/add',
      method:"POST",
      header:app.cookies(),
      data:obj,
      success:(res)=>{
        //console.log(res)
        if(res.data.code==200){
          wx.showModal({
            title: '提示',
            content: '添加成功',
            showCancel:false,
            success:(res)=> {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            }
          })
        }else if(res.data.code==400){
          wx.showModal({
            title: '提示',
            content: '院校代码重复',
            showCancel:false
          })
        }
      }
    })
    console.log(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
  }
})