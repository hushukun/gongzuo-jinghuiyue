// pages/news/news.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:app.winH(), //scroll-view的高度
    list:[1,2,3,4,5,6]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.winH())
  }
})