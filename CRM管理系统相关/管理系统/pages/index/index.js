//index.js
var app=getApp()
Page({
  data: {
    inputValue:"", //搜索输入框的值
    batchActive:false,//批量删除显示选择框
    deleteActive:false, //显示确定删除和取消按钮
    dataList:[],
    height:null //首页底部滚动内容的高度
  },
  inputValueFn(e){ //输入框处理函数，获取输入的值
    this.setData({
      inputValue:e.detail.value
    })
    if(e.detail.value==""){
      this.getData()
    }
  },
  searchFn(){ //搜索函数
    //有内容时搜索
    this.getData(this.data.inputValue)
  },
  adduserFn(){ //添加用户信息页面
    wx.navigateTo({
      url: '../Add-information/Add-information',
    })
  },
  cancelFn(){ //取消按钮
    this.setData({
      batchActive:false,
      deleteActive:false
    })
  },
  batchFn(){ //点击批量删除
    this.setData({
      batchActive:true,
      deleteActive:true
    })
  },
  determineFn(){ //确定删除
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          let datas=this.data.dataList
          let idArr=[]
          for(let key in datas){
            if(datas[key].icon){
              idArr.push(datas[key].id)
            }
          }
          //console.log(idArr)
          if(idArr.length>0){ //当长度大于0时代表已选择要删除的信息
            wx.request({
              url: app.url+'school/msg/batchdel',
              method:"POST",
              header:app.cookies(),
              data:{
                ids:idArr
              },
              success:(res)=>{
                if(res.data.code==200){
                  this.getData() //删除成功后重新获取数据
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
  iconActiveFn(e){ //点击icon选中或取消
    let index=e.currentTarget.dataset.index
    let data=this.data.dataList
    data[index].icon=!data[index].icon
    this.setData({
      dataList:data
    })
  },
  activeFn(e){ //点击展开或折叠
    let index=e.currentTarget.dataset.indexs
    let data=this.data.dataList
    data[index].fold=!data[index].fold
    this.setData({
      dataList:data
    })
  },
  toeditFn(e){ //编辑按钮，跳转到编辑页面
    let gid=e.currentTarget.dataset.gid
    wx.navigateTo({
      url: `../edit/edit?gid=${gid}`,
    })
  },
  deleteFn(e){ //点击信息下删除按钮
    let gid=e.currentTarget.dataset.gid
    wx.showModal({
      title: '提示',
      content: '您确定要删除此信息吗',
      success:(res)=> {
        if (res.confirm) {
          //console.log(gid)
          wx.request({
            url: app.url+`school/msg/del/${gid}`,
            method:"POST",
            header:app.cookies(),
            success:(res)=>{
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              this.getData()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  mainListFn(e){ //点击通讯录按钮
    let gid=e.currentTarget.dataset.gid
    let name=e.currentTarget.dataset.name
    //console.log(e)
    wx.navigateTo({
      url: `../mail-list/mail-list?gid=${gid}&schoolname=${name}`,
    })
  },
  visitFn(e){ //点击拜访信息按钮
    let gid=e.currentTarget.dataset.gid
    wx.navigateTo({
      url: `../visit/visit?gid=${gid}`,
    })
  },
  getData(sname){ //获取数据信息接口
    if(wx.getStorageSync('cookieKey')){
      wx.showLoading({
        title: '数据加载中',
      })
      wx.request({
        url: app.url+'school/msg/list/data?size=9999&name='+sname,
        header: app.cookies(),
        success:(res)=>{
        console.log(res)
         wx.hideLoading()
          if(res.data.code==200||res.data.code==400){
            let dataList=res.data.data
            for(let key in dataList){
              dataList[key].fold=false
              dataList[key].icon=false
              if(dataList[key].schoolType==1){ //判断院校类型
                dataList[key].schoolType="本科院校"
              }else if(dataList[key].schoolType==2){
                dataList[key].schoolType="专科院校"
              }else if(dataList[key].schoolType==3){
                dataList[key].schoolType="中专院校"
              }
              if(dataList[key].schoolNature==1){ //判断院校性质
                dataList[key].schoolNature="公办"
              }else if(dataList[key].schoolNature==2){
                dataList[key].schoolNature="民办"
              }
            }
            //console.log(dataList)
            this.setData({
              dataList:dataList
            })
          }else{
            console.log("登陆失败")
            wx.removeStorageSync("cookieKey")
            wx.showModal({
              title: '提示',
              content: '请重新登陆',
              showCancel:false,
              success (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../login/login',
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
    }
    
  },
  tonewsFn(){ //点击消息图标按钮跳转到消息页面
    wx.navigateTo({
      url: '../news/news',
    })
  },
  onLoad(){
    this.getData()
    var query = wx.createSelectorQuery(); //屏幕高度减去获取其他元素高度得到底部滚动高度
    var that = this;
    query.select('.banner').boundingClientRect();
    query.select('.search').boundingClientRect();
    query.select('.title').boundingClientRect()
    query.exec(function(res){
      // console.log(res)
      that.setData({
        height:app.winH()-(res[0].height+res[1].height+res[2].height)
      })
    })
  },
  onShow(){
    if(wx.getStorageSync('cookieKey')){
      console.log("登陆成功")
    }else{
      console.log("未登录")
      wx.showModal({
        title: '提示',
        content: '当前未登录，请先登陆',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login',
            })
          }
        }
      })
    }
  }
})
