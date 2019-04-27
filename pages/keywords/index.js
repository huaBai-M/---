// pages/keywords/keywords.js
import Toast from '../../dist/toast/toast';
var bar = require("../../utils/lists.js");
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ec:{},
        mesgs: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
        that.setData({
            mesgs:app.globalData.mesgs
        })
        // that.flowIndex();
    },
    echartInitBar: function (e) {
        var that = this;
        bar.initChartBar(e.detail.canvas, e.detail.width, e.detail.height, app.globalData.mesgs);
    },
    // flowIndex: function (e) {
    //     var that = this;
    //     // var sessionId = app.globalData.sessionId
    //     // console.log(sessionId)
    //     wx.request({
    //         url: app.globalData.webRequsetUrl + '/mobiledataAnalysisController/getCharts',
    //         method: 'GET',
    //         header: {
    //             'content-type': 'application/x-www-form-urlencoded',
    //             "Cookie": "SESSION=" + app.globalData.sessionId
    //         },
    //         data: {

    //         },
    //         success(res) {
    //             var mesgs = res.data;
    //             if(typeof(res.data)=="string"){
    //                 that.setData({
    //                     mesgs: []
    //                 })
    //             }
    //             that.setData({
    //                 mesgs: mesgs
    //             })
    //             // console.log(that.data.mesgs)
    //         }
    //     })
    // },

})