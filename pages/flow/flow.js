// pages/flow/flow.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    data: {
        listData: [],
        listDataDay:[],
        listDataAll:[],
        index:0,
        page: 1,
        page1: 1,
        page2: 1,
        status: true,
        state: false
    },
    onLoad:function(){
        var that = this;
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
        that.flowQuery();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function (e) {
        var that = this;
        
        // 显示加载图标
        wx.showLoading({
            title: '玩命加载中',
        })
        if(that.data.index==0){
            that.data.page = that.data.page + 1;
            if (that.data.status) {
                that.flowQuery();
            } else {
                wx.hideLoading();
                that.setData({
                    state: true
                })
            }
        }
        if (that.data.index == 1) {
            that.data.page1 = that.data.page1 + 1;
            if (that.data.status) {
                that.flowQueryDay();
            } else {
                wx.hideLoading();
                that.setData({
                    state: true
                })
            }
        }
        if (that.data.index == 2) {
            that.data.page2 = that.data.page2 + 1;
            if (that.data.status) {
                that.flowQueryAll();
            } else {
                wx.hideLoading();
                that.setData({
                    state: true
                })
            }
        }

    },
    flowQuery:function(e){
        var that = this;
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobileflowCardController/findRecharge',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                size: 12,
                page: that.data.page
            },
            success: function (res) {
                // 回调函数
                var moment_list = that.data.listData;
                console.log(res.data.crs)
                if (res.data.crs.length < 12) {
                    that.setData({
                        status: false
                    })
                }
                for (var i = 0; i < res.data.crs.length; i++) {
                    moment_list.push(res.data.crs[i]);
                }
                // 设置数据
                that.setData({
                    listData: moment_list
                })
                // 隐藏加载框
                wx.hideLoading();

            }
        })
    },
    flowQueryDay: function (e) {
        var that = this;
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobileFlowCardController/selectvisit',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                currentPage: that.data.page1,
                bian: 'A',
                limit: 20
            },
            success: function (res) {
                // 回调函数
                var moment_list = that.data.listDataDay;
                console.log(res.data)
                if (res.data.length < 20) {
                    that.setData({
                        status: false
                    })
                }
                for (var i = 0; i < res.data.length; i++) {
                    moment_list.push(res.data[i]);
                }
                // 设置数据
                that.setData({
                    listDataDay: moment_list
                })
                // 隐藏加载框
                wx.hideLoading();

            }
        })
    },
    flowQueryAll: function (e) {
        var that = this;
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobileFlowCardController/selectvisit',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                currentPage: that.data.page2,
                bian: 'B',
                limit: 20
            },
            success: function (res) {
                // 回调函数
                var moment_list = that.data.listDataAll;
                console.log(res.data)
                if (res.data.length < 20) {
                    that.setData({
                        status: false
                    })
                }
                for (var i = 0; i < res.data.length; i++) {
                    moment_list.push(res.data[i]);
                }
                // 设置数据
                that.setData({
                    listDataAll: moment_list
                })
                console.log(that.data.page2)
                // 隐藏加载框
                wx.hideLoading();

            }
        })
    },
    onChange(e) {
        var that = this;
        that.setData({
            index: e.detail.index
        })
        if (e.detail.index == 0) {
            that.setData({
                status: true,
                state: false,
                page: 1,
                listData: []
            })
            that.flowQuery();
        }
        if (e.detail.index == 1) {
            that.setData({
                status: true,
                state: false,
                page1: 1,
                listDataDay: [],
            })
            that.flowQueryDay();
        }
        if (e.detail.index == 2) {
            that.setData({
                status: true,
                state: false,
                page2: 1,
                listDataAll: [],
            })
            that.flowQueryAll();
        }
    },
})