// pages/server/index.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: [], //数据
        page: 0,
        status: true,
        state: false
    },

    onLoad: function() {
        var that = this;
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
        that.hotData();
        console.log(app.globalData.code)
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this;
        // 显示加载图标
        wx.showLoading({
            title: '玩命加载中',
        })
        if (that.data.status) {
            that.hotData(); 
        }else{
            wx.hideLoading();
        }

    },
    hotData: function(e) {
        var that = this;
        that.data.page = that.data.page + 1;
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobiledataAnalysisController/selcecAccessDetails',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                currentPage: that.data.page,
                limit: 30,
                bian: 'A'
            },
            success: function(res) {
                console.log(res)
                // 回调函数
                var moment_list = that.data.listData;
                if (res.data.length < 30){
                    that.setData({
                        status:false,
                        state: true
                    })
                }
                for (var i = 0; i < res.data.length; i++) {
                    moment_list.push(res.data[i]);
                }
                // 设置数据
                that.setData({
                    listData: moment_list
                })
                // 隐藏加载框
                wx.hideLoading();

            },
            fail: function (res){
                console.log(res)
            }
        })
    },

})