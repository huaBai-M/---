//app.js
App({
    globalData: {
        webRequsetUrl: 'https://www.jzl123.cn',
        userInfo: {
            unionId: null,
            openId: null,
            sessionKey: null,
        },
        sessionId:'',
        phone:'',
        cId:'',
        type:'',
        code:'',
        ifBind:false,
        mesgs:[]
    },
    //注册全局变量
    doLogin: function () {
        var that = this;
        wx.login({
            success: function (res) {
                var app = getApp()
                if (res.code) {
                    // 发起网络请求
                    wx.request({
                        url: app.globalData.webRequsetUrl + '/bindController/goBindX',
                        method: 'GET',
                        data: {
                            codeX: res.code
                        },
                        success(e) {
                            var userInfo = e.data.data;
                            app.globalData.userInfo.openId = userInfo.openid;
                        }
                    })
                }
            }
        });
    },
    // 获取用户信息
    getuser:function(e){
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    onLaunch: function () {
        // 展示本地存储能力
        this.doLogin()
    },

})