// pages/visit/visit.js
var app=getApp()
Page({
  data: {
    winH:app.winH()-20,//窗口高度
    msg:false,
    id:null,
    name:null,
    dataList:[],//通讯录数据
  },
  addvisitFn(){ //跳转到添加信息页面
    console.log(123)
    wx.navigateTo({
      url: `../mail-add/mail-add?gid=${this.data.id}&name=${this.data.name}`,
    })
  },
  visiteditFn(e){ //跳转到拜访编译信息页面
    wx.navigateTo({
      url: `../mail-edit/mail-edit?gid=${e.currentTarget.dataset.gid}`,
    })
  },
  deleteFn(e){ //删除按钮 已取消保留功能
    let gid=e.currentTarget.dataset.gid //获取对应的Id传到后台
    console.log(gid)
    wx.showModal({
      title: '提示',
      content: '您确定要删除此信息吗',
      success:(res)=> {
        if (res.confirm) {
          wx.request({
            url: app.url+`school/adressList/del/${gid}`,
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
                      this.getListFn(this.data.id) //重新获取数据
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
    data[index].fold=!data[index].fold
    this.setData({
      dataList:data
    })
  },
  batahFn(){ //批量删除 已取消保留功能
    let data=this.data.dataList
    let idArr=[]
    for(let key in data){
      if(data[key].fold){
        idArr.push(data[key].id)
      }
    }
    console.log(idArr)
    wx.showModal({
      title: '提示',
      content: '您确定要删除多个信息吗',
      success:(res)=> {
        if (res.confirm) {
          console.log("确定")
          if(idArr.length>0){ //当长度大于0时代表已选择要删除的信息
            wx.request({
              url: app.url+'school/adressList/batchdel',
              method:"POST",
              header:app.cookies(),
              data:{
                ids:idArr
              },
              success:(res)=>{
                console.log(res)
                if(res.data.code==200){
                  this.getListFn(this.data.id) //删除成功后重新获取数据
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
  getListFn(id){ //获取通讯录列表
    wx.showLoading({
      title: '努力加载中',
    })
    wx.request({
      url: app.url+`school/adressList/list/data?sid=${id}&isDelete=1`,
      header:app.cookies(),
      success:(res)=>{
        //console.log(res)
        wx.hideLoading()
        if(res.data.code==200){
          let datas=res.data.data
          for(let key in datas){
            datas[key].fold=false
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
      id:options.gid,
      name:options.schoolname
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
    this.getListFn(this.data.id)
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