// pages/recharge/recharge.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        srcImage: '',
        imageHide: true,
        cardId: '',
        password: '',
        code: ''
    },
    onLoad: function() {
        // Toast('我是提示文案，建议不超过十五字~');
        var that = this;
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
        that.setData({
            srcImage: app.globalData.webRequsetUrl + '/mobileflowCardController/makingVC?aa=' + new Date().getTime() + '&loginPhone=' + app.globalData.phone + '',
        })
        console.log(that.data.srcImage)
    },
    // 点击立即充值
    recharge: function(e) {
        var that = this;
        var cardId = that.data.cardId;
        var password = that.data.password;
        var code = that.data.code;
        if (cardId == '' || password == '' || code == '') {
            Toast('请输入完整充值信息')
        } else {
            wx.request({
                url: app.globalData.webRequsetUrl + '/mobileflowCardController/recharge',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "Cookie": "SESSION=" + app.globalData.sessionId
                },
                data: {
                    cardCode: cardId,
                    vc: code,
                    pwd: password,
                    source: 3,
                    ids: "kayan,pass,security_z"
                },
                success(res) {
                    var mesg = res.data.info;
                    console.log(res)
                    if (res.data.code = "fail") {
                        Toast(mesg)
                    } else {
                        Toast(mesg)
                    }
                }
            })
        }
    },
    //卡号移除焦点
    cardBlur: function(e) {
        var that = this;
        var cardId = that.data.cardId;
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobileflowCardController/checkCardCode',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                cardCode: cardId,
                id: "kayan"
            },
            success(res) {
                var mesg = res.data.info;
                if (res.data.code = "fail") {
                    Toast(mesg)
                }
            }
        })

    },
    //密码移除焦点
    passwordBlur: function(e) {
        var that = this;
        var password = that.data.password;
        var cardId = that.data.cardId;
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobileflowCardController/checkCardPwd',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                cardCode: cardId,
                pwd: password,
                id: "kayan,pass"
            },
            success(res) {
                var mesg = res.data.info;
                if (res.data.code = "fail") {
                    Toast(mesg)
                }
            }
        })

    },
    //验证码移除焦点
    codeBlur: function(e) {
        var that = this;
        var code = that.data.code;
        wx.request({
            url: app.globalData.webRequsetUrl + '/mobileflowCardController/checkVC',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                vc: code,
                id: "security_z",
                loginPhone: app.globalData.phone
            },
            success(res) {
                var mesg = res.data.info;
                if (res.data.code = "fail") {
                    Toast(mesg)
                }
            }
        })
    },
    lickChange: function(e) {
        var that = this;
            that.setData({
                srcImage: app.globalData.webRequsetUrl + '/mobileflowCardController/makingVC?aa=' + new Date().getTime() + '&loginPhone=' + app.globalData.phone,
            })
        console.log(that.data.srcImage)
    },
    //获取输入的input中的值
    formCard: function(e) {
        this.setData({
            cardId: e.detail.value
        })
    },
    formPassword: function(e) {
        this.setData({
            password: e.detail.value
        })
    },
    formCode: function(e) {
        this.setData({
            code: e.detail.value
        })
    },

})