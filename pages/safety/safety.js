// pages/safety/safety.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        passwaordlast: "",
        newpasword: "",
        testpasword: "",
        seen: true,
        seen1: true,
        seen2: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
    },
    changeColor: function(e) {
        var that = this;
        var seen = that.data.seen;
        if (seen) {
            that.setData({
                seen: false
            })
        } else {
            that.setData({
                seen: true
            })
        }
    },
    changeColor2: function(e) {
        var that = this;
        var seen = that.data.seen1;
        if (seen) {
            that.setData({
                seen1: false
            })
        } else {
            that.setData({
                seen1: true
            })
        }
    },
    changeColor3: function(e) {
        var that = this;
        var seen = that.data.seen2;
        if (seen) {
            that.setData({
                seen2: false
            })
        } else {
            that.setData({
                seen2: true
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    submit: function() {
        console.log(this.data.passwaordlast)
        console.log(this.data.newpasword)
        console.log(this.data.testpasword)
        if (this.data.passwaordlast == '' || this.data.newpasword == '' || this.data.testpasword == '') {
            Toast.fail('密码不能为空');
            return false
        };
        if (this.data.newpasword != this.data.testpasword) {
            Toast.fail('新旧密码不一致');
            return false
        }
        var _this = this
        wx.request({
            url: globalData.webRequsetUrl + '/loginController/updataPassWord',
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": "SESSION=" + app.globalData.sessionId
            },
            data: {
                "historyPassWord": _this.data.passwaordlast,
                "newPassWord": _this.data.newpasword
            },
            success(res) {
                console.log(res);
                if (res.data.status == 'success') {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    })
                } else {
                    Toast.fail('原始密码输入错误');
                }
            }
        });
    },
    input1: function(e) {
        this.setData({
            "passwaordlast": e.detail.value
        })
    },
    input2: function(e) {
        this.setData({
            "newpasword": e.detail.value
        })
    },
    input3: function(e) {
        this.setData({
            "testpasword": e.detail.value
        })
    },

})