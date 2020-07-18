// pages/visit/visit.js
var app=getApp()
Page({
  data: {
    winH:app.winH()-20,//窗口高度
    id:null,
    msg:false,
    dataList:[]
  },
  activeFn(e){ //点击三角符号折叠展开
    let index=e.currentTarget.dataset.index
    let datas=this.data.dataList
    datas[index].fold=!datas[index].fold
    this.setData({
      dataList:datas
    })
    //console.log(e.currentTarget.dataset.index)
    //console.log(this.data.dataList)
  },
  addvisitFn(){ //跳转到添加信息页面
    //console.log(123)
    wx.navigateTo({
      url: '../visit-add/visit-add?sid='+this.data.id,
    })
  },
  visiteditFn(e){ //跳转到拜访编译信息页面
    let id=e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../visit-edit/visit-edit?id='+id,
    })
  },
  deleteFn(e){ //删除按钮
    let gid=e.currentTarget.dataset.gid //获取对应的Id传到后台
    wx.showModal({
      title: '提示',
      content: '您确定要删除此信息吗',
      success:(res)=> {
        if (res.confirm) {
          console.log(gid)
          wx.request({
            url: app.url+`school/visit/del/${gid}`,
            method:"POST",
            header:app.cookies(),
            success:(res)=>{
              console.log(res)
              if(res.data.code==200){
                wx.showModal({
                  title: '提示',
                  content: '删除成功',
                  showCancel:false,
                  success:(res)=>{
                    if(res.confirm){
                      this.getvisitFn(this.data.id) //重新获取数据
                    }
                  }
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  iconactiveFn(e){ //点击icon图标判断选中
    let index=e.currentTarget.dataset.index
    let data=this.data.dataList
    data[index].icon=!data[index].icon
    this.setData({
      dataList:data
    })
    //console.log(this.data.dataList)
  },
  batahFn(){ //批量删除
    let data=this.data.dataList
    let idArr=[]
    for(let key in data){
      if(data[key].icon){
        idArr.push(data[key].id)
      }
    }
    //console.log(idArr)
    wx.showModal({
      title: '提示',
      content: '您确定要删除多个信息吗',
      success:(res)=> {
        if (res.confirm) {
          if(idArr.length>0){ //当长度大于0时代表已选择要删除的信息
            wx.request({
              url: app.url+'school/visit/batchdel',
              method:"POST",
              header:app.cookies(),
              data:{
                ids:idArr
              },
              success:(res)=>{
                //console.log(res)
                if(res.data.code==200){
                  this.getvisitFn(this.data.id) //删除成功后重新获取数据
                }
              },
              fail:(res)=>{
                console.log(res)
              }
            })
            this.setData({
              batchActive:false,
              deleteActive:false
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '请选择要删除的信息',
              showCancel:false
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getvisitFn(id){
    wx.showLoading({
      title: '努力加载中',
    })
    wx.request({
      url: app.url+`school/visit/list/data?schoolId=${id}&isDelete=1`,
      header:app.cookies(),
      success:(res)=>{
        //console.log(res)
        wx.hideLoading()
        if(res.data.code==200){
          let datas=res.data.data
          for(let key in datas){
            datas[key].fold=false
            datas[key].icon=false
            if(datas[key].type==1){ //判断院校类型
              datas[key].type="A"
            }else if(datas[key].type==2){
              datas[key].type="B1"
            }else if(datas[key].type==3){
              datas[key].type="B2"
            }else if(datas[key].type==4){
              datas[key].type="C"
            }
          }
          //console.log(datas)
          this.setData({
            dataList:datas
          })
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
    this.setData({
      id:options.gid
    })
    this.getvisitFn(options.gid)
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
    this.getvisitFn(this.data.id)
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