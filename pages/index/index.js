import Toast from '../../dist/toast/toast';
var map = require("../../utils/lists.js");
var app = getApp()
var globalData = app.globalData;
var nameP = [{
        name: "百度",
        num: "200"
    },
    {
        name: "搜狗",
        num: "120"
    },
    {
        name: "360",
        num: "100"
    },
    {
        name: "百度移动",
        num: "130"
    },
    {
        name: "搜狗移动",
        num: "10"
    },
    {
        name: "神马搜索",
        num: "10"
    }
];
var bgColor = ['#f55c59', '#f38017', '#48c38d', '#038eef', '#69aae8', '#9a9ea7']
Page({
    data: {
        ec: {},
        progress: nameP, //排行数据
        bgcolor: [],
        width: [],
        flow:[],//热力数据
        mesgs:[],//关键词数据
        keywors: [],//关键词数量
        nameNum:[],//关键词分开数据
        flowS:[],
        business:[],//商机信息总
        business1: [],//商机信息30
        business2: [],//商机信息90
        nums:0,
        status: false
    },
    onLoad: function(options) {
        var that = this;
        if (app.globalData.ifBind !=true){
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
        that.flowHot();//精准热力图数据
        that.flowIndex();//搜索关键词
        that.businessHot();//商机信息
        that.flowSurper();//超级流量宝
        
    },
    onReady() {},
    echartInit: function(e) {
        var that = this;
        map.initChart(e.detail.canvas, e.detail.width, e.detail.height, that.data.mesgs);
    },
    //画关键词分布
    shadow: function() {
        var that = this;
        var withNew = [];
        for (var j = 0; j < nameP.length; j++) {
            withNew[j] = nameP[j].num / 300 * 100 + '%'
        }
        that.setData({
            bgcolor: bgColor,
            width: withNew
        })
        // console.log(nameP)
    },
    moreHot: function(e) {
        wx.navigateTo({
            url: '/pages/indexHot/indexHot'
        })
    },
    //精准流量热力图
    flowHot: function (e) {
        var that = this;
        // var sessionId = app.globalData.sessionId
        // console.log(sessionId)
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobiledataAnalysisController/percentageData',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {

            },
            success(res) {
                var flow = res.data;
                // console.log(res)
                that.setData({
                    flow:flow  
                })
                // console.log(that.data.flow)
            }
        })
    },
    //商机信息
    businessHot: function (e) {
        var that = this;
        // var sessionId = app.globalData.sessionId
        // console.log(sessionId)
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobiledataAnalysisController/dataAnalysisweuchat',
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {

            },
            success(res) {
                var cardstatus = res.data.cardstatus;
                if(cardstatus==1){
                    that.setData({
                        status:true
                    })
                }else{
                    that.setData({
                        status: false
                    })
                }
                var business = res.data.dayandhistory.strsumBuyingOppo != null ? res.data.dayandhistory.strsumBuyingOppo:0;
                var business1 = res.data.dayandhistory1.strsumBuyingOppo != null ? res.data.dayandhistory1.strsumBuyingOppo : 0;
                var business2 = res.data.dayandhistory2.strsumBuyingOppo != null ? res.data.dayandhistory2.strsumBuyingOppo : 0;
                that.setData({
                    business: business,
                    business1: business1,
                    business2: business2
                })
                // console.log(that.data.business)
            }
        })
    },
    //超级流量宝
    flowSurper: function(e) {
        var that = this;
        // var sessionId = app.globalData.sessionId
        // console.log(sessionId)
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobileFlowCardController/FlowCardDisplay',
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {

            },
            success(res) {
                // console.log(res)
                var flowS = res.data;
                that.setData({
                    flowS: flowS
                })
                // console.log(that.data.flows)
            }
        })
    },
    //首页
    flowIndex: function (e) {
        var that = this;
        // var sessionId = app.globalData.sessionId
        // console.log(sessionId)
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobiledataAnalysisController/getCharts',
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {

            },
            success(res) {
                var mesgs = res.data;
                var nums = 0;
                var nameNum = [res.data.rankBaiduNum != null ? res.data.rankBaiduNum : 0, 
                res.data.rankSougouNum != null ? res.data.rankSougouNum:0,
                    res.data.rank360Num != null ? res.data.rank360Num:0, 
                    res.data.numMbaiduRank != null ? res.data.numMbaiduRank:0, 
                    res.data.numMsougouRank != null ? res.data.numMsougouRank:0,
                    res.data.numMsmRank != null ? res.data.numMsmRank:0];
                var keywors = res.data.keywordNum != null ? res.data.keywordNum:0;
                that.setData({
                    mesgs: mesgs,
                    nameNum: nameNum,
                    keywors: keywors
                })
                app.globalData.mesgs = mesgs;
                for (var i = 0; i < that.data.nameNum.length; i++) {
                    nameP[i].num = that.data.nameNum[i]
                    nums += nameP[i].num;
                }
                that.setData({
                    progress:nameP,
                    nums:nums
                })
                // console.log(mesgs)
                that.shadow();//关键词排名
            }
        })
    },
    Linkquery:function(e){
        wx.navigateTo({
            url: '/pages/flow/flow',
        })
    },
    LinkRange: function (e) {
        wx.navigateTo({
            url: '/pages/recharge/recharge',
        })
    },
    clickBuss:function(e) {
        wx.switchTab({
            url: '/pages/business/business',
        })
    },

});