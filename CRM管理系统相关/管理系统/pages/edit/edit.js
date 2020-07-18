// pages/Add-information/Add-information.js
var app=getApp()
Page({
  data: {
    id:null,
    name:"", //学校姓名
    company:"",//主管单位
    area:"",//面积
    number:"",//人数
    address:0,//院校详细地址
    code:0,//院校代码
    schoolType: ['本科', '专科', '中专'],//学校类型
    typeIndex: 0,
    schoolNature:['公办', '民办'],//学校性质
    natureIndex:0,
    region: ['河南省', '郑州市', '中原区'],
    customItem:"全部",
    regionCode: ["410000", "410100", "410102"] //地址id
  },
  nameFn(e){ //获取学校姓名输入框的值
    this.setData({
      name:e.detail.value
    })
  },
  bindPickerType(e) { //获取学校类型输入框的值
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindPickerNature(e) { //获取学校性质输入框的值bindPickerNature
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      natureIndex: Number(e.detail.value)
    })
  },
  companyFn(e){ //获取学校主管单位输入框的值
    this.setData({
      company: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.code)
    this.setData({
      regionCode: e.detail.code,
      region: e.detail.value
    })
  },
  codeFn(e){ //获取学校代码输入框的值
    this.setData({
      code:e.detail.value
    })
  },
  addressFn(e){ //获取学校详细地址输入框的值
    this.setData({
      address:e.detail.value
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
      id:this.data.id,//id
      name:this.data.name, //学校姓名
      schoolType:Number(this.data.typeIndex)+1, //学校类型
      schoolNature:Number(this.data.natureIndex)+1,//学校性质
      schoolZhuguandanwei:this.data.company,//主管单位
      provinceId:this.data.regionCode[0], //省级id
      cityId:this.data.regionCode[1], //市级id
      areaId:this.data.regionCode[2], //县区级id
      address:this.data.address,//详细地址
      schoolProportion:this.data.area,//面积
      studentNum:this.data.number,//人数
      schoolCode:this.data.code //院校代码
    }
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
    //console.log(obj)
    wx.request({ //修改后的信息提交到后台
      url: app.url+'school/msg/edit',
      method:"POST",
      header:app.cookies(),
      data:obj,
      success:(res)=>{
        //console.log(res)
        if(res.data.code==200){
          wx.showModal({
            title: '提示',
            content: '修改成功',
            showCancel:false,
            success:(res)=> {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            }
          })
        }
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  informationFn(id){// 点击编辑跳转过来后，根据id获取到相应的信息
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.url+`school/msg/get/${id}`,
      header:app.cookies(),
      success:(res)=>{
        //console.log(res.data.data)
        let datas=res.data.data
        //console.log(datas)
        this.setData({
          name:datas.name, //学校姓名
          company:datas.schoolZhuguandanwei,//主管单位
          area:datas.schoolProportion,//面积
          number:datas.studentNum,//人数
          address:datas.address,//院校详细地址
          code:datas.schoolCode,//院校代码
          typeIndex: datas.schoolType-1,//学校类型
          natureIndex:datas.schoolNature-1,//学校性质
          region:datas.location.split(",").slice(1),
          regionCode: [datas.provinceId, datas.cityId, datas.areaId]
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.gid
    })
    this.informationFn(options.gid)
  }
})