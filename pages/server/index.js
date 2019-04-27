// pages/server/index.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        builds: [
            {
                id: 1,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_web_180.png',
                name: '营销官网'
            },
            {
                id: 2,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_m_o_web_180.png',
                name: '手机官网'
            },
            {
                id: 3,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_WeChat_public_number_180.png',
                name: '微信公众号'
            },
            {
                id: 4,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_Applets_180.png',
                name: '微信小程序'
            },
            {
                id: 5,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_online_service_180.png',
                name: '在线客服'
            }
        ],
        marketing: [
            {
                id: 1,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_sem_180.png',
                name: '搜索引擎推广'
            },
            {
                id: 2,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_seo_180.png',
                name: '搜索引擎优化'
            },
            {
                id: 3,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_Circle_of_friends_180.png',
                name: '朋友圈推广'
            },
            {
                id: 4,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_people_180.png',
                name: '精准人群推广'
            },
            {
                id: 5,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_message_180.png',
                name: '短信推广'
            },
            {
                id: 6,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_Flowtreasure_180.png',
                name: '超级流量宝'
            }
        ],
        brand: [
            {
                id: 1,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_b2b_180.png',
                name: '中国产品推广联盟'
            },
            {
                id: 2,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_Soft_text_180.png',
                name: '软文推广'
            },
            {
                id: 3,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_cctv_180.png',
                name: '央视广告推广'
            },
            {
                id: 4,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_AAA_180.png',
                name: '企业信用等级认证'
            }
        ],
        increment: [
            {
                id: 1,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_Trademark_180.png',
                name: '商标注册'
            },
            {
                id: 2,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_Identification_180.png',
                name: '高新技术企业认定'
            },
            {
                id: 3,
                src: 'http://page-bucket.oiaqye7985.com/wechat/mini-syb/icon_accounting_180.png',
                name: '代理记账'
            }
        ],
        webopenstatus: [],
        mobilecard: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var _this = this;
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
        wx.request({
            url: globalData.webRequsetUrl + '/mobileServiceController/queryMessageweichat',
            method: 'GET',
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            success(res) {
                _this.data.webopenstatus = res.data.webopenstatus
                _this.setData({
                    mobilecard: res.data.mobilecard
                })
                console.log(_this.data.webopenstatus)
                console.log(_this.data.mobilecard)
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