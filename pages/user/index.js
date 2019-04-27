// pages/user/index.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:"",
        company:"",
        headUrl:"http://page-bucket.oiaqye7985.com/wechat/mini-syb/user1_03.png"
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
        url: globalData.webRequsetUrl + '/muc/gmuipx',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        success(res) {
            var headUrl ='';
            if (res.data.headUrl == '' || res.data.headUrl == null) {
                headUrl= 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/user1_03.png'
            }else{
                headUrl = res.data.headUrl;
            }
          _this.setData({
            "name": res.data.name,
            "company": res.data.clientInfo.customerName,
            "headUrl": headUrl,
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