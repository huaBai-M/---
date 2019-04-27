// pages/login/login.js
var app = getApp()
var globalData = app.globalData;
Page({
    data: {
        //  active: 1
    },
    onLoad: function () {
        console.log(app.globalData.code)
        console.log(app.globalData.userInfo.openId)
    },
    onChange(event) {
        // wx.showToast({
        //     title: `切换到标签 ${event.detail.index + 1}`,
        //     icon: 'none'
        // });
    }
})
