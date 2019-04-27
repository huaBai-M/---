// pages/buy/buy.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: [
            { "code": "国内英文", "text": "2018/07/26", "date": "2018/07/26", "date2": "注册成功" },
            { "code": "国内英文", "text": "2018/07/26", "date": "2018/07/26", "date2": "注册成功" },
            { "code": "国内英文", "text": "2018/07/26", "date": "2018/07/26", "date2": "注册成功" },
            { "code": "国内英文", "text": "2018/07/26", "date": "2018/07/26", "date2": "注册成功" }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var _this = this
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
      wx.request({
        url: globalData.webRequsetUrl + '/muc/mpx',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        success(res) {
          console.log(res);
            console.log(typeof(res.data))
          if(typeof(res.data)=='string'){
              _this.setData({
                  "listData": []
              })
          }
          _this.setData({
            "listData": res.data
          })
        }
      });
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

    },
})