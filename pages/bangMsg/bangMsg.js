// pages/bangMsg/bangMsg.js
import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mobile:'',
        typeSuccess:'',
        cId:''
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
            mobile: app.globalData.phone,
            cId: app.globalData.cId,
            typeSuccess: app.globalData.type
        })
        console.log(app.globalData.phone+ app.globalData.cId+app.globalData.type)
    },

    clickIndex:function(e){
        var that = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    // 发起网络请求
                    wx.request({
                        url: app.globalData.webRequsetUrl + '/bindController/automaticLogonX',
                        method: 'GET',
                        data: {
                            codeX: res.code
                        },
                        success(resData) {
                            console.log(resData)
                            app.globalData.sessionId = resData.data.sessionId;
                            app.globalData.phone = resData.data.data.phone;
                            app.globalData.cId = resData.data.data.cId;
                            app.globalData.type = resData.data.data.type;
                            if (resData.data.data.ifBind == true) {
                                wx.switchTab({
                                    url: '/pages/index/index'
                                })
                            } else {
                                Toast('请先绑定手机号~')
                                return false;
                            }
                        }
                    })
                }
            }
        });
    },
    jiechBund:function(e){
        var that = this;
        var openid = globalData.userInfo.openId;
        var cId = app.globalData.cId;
        var typeSuccess = app.globalData.type;
        Dialog.confirm({
            title: '解除绑定',
            message: '确定要解除绑定么？'
        }).then(() => {
            wx.request({
                url: globalData.webRequsetUrl + '/bindController/noticeBindX',
                method: 'GET',
                data: {
                    openId: openid,
                    cId: cId,
                    type: typeSuccess
                },
                success(res) {
                    console.log(res)
                    if(res.data.status=='error'){
                        Toast(res.data.mes)
                        return false;
                    }else{
                        Toast(res.data.mes)
                        wx.navigateTo({
                            url: '/pages/bangding/bangding',
                        })
                    }
                }
            })
        }).catch(() => {
            // on cancel
        });
    },
})