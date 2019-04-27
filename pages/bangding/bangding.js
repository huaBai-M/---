// pages/bangding/bangding.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteTitle: null,
    tel: '',
    send: false,
    currentTime: 60,
    disabled: true,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.autoLogin();
  },
  onShow: function (options) {

  },
  //自动登录
  autoLogin: function (e) {
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
                app.globalData.ifBind = resData.data.data.ifBind;
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
  //验证码倒计时函数
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    var interval = setInterval(function () {
      that.setData({
        send: true,
        currentTime: (currentTime - 1)
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          send: false,
          currentTime: 60
        })
      }
    }, 1000)
  },
  //验证码倒计时结束
  formName: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  formCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码
  clickPost: function (e) {
    var that = this;
    var mobile = that.data.tel;
    if (!(/^1[34578]\d{9}$/.test(mobile)) || mobile.length > 11) {
      Toast('请输入正确的手机号')
    } else {
      that.getCode();
      wx.request({
        url: globalData.webRequsetUrl + '/bindController/code',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          mobile: mobile
        },
        success(res) {
          console.log(res)
          Toast(res.data.message);
          that.setData({
            send: true
          })
        }
      })
    }
  },
  // 点击绑定
  clickBang: function (e) {
    var that = this;
    var phone = that.data.tel;
    var code = that.data.code;
    var openid = globalData.userInfo.openId;
    if (phone == '' || code == '') {
      Toast('请输入完整的手机号和验证码');
    } else {
      wx.request({
        url: globalData.webRequsetUrl + '/bindController/doBindX',
        method: 'GET',
        data: {
          phone: phone,
          code: code,
          openId: openid
        },
        success(res) {
          console.log(res.data)
          var message = res.data.message;
            
          if (res.data.code == 'fail') {
            Toast(message);
            return false;
          }
          if (res.data.code == 'success') {
            Toast(message);
              app.globalData.phone = phone;
              app.globalData.type = res.data.type;
              app.globalData.cId = res.data.cId;
              app.globalData.ifBind = true;
            wx.navigateTo({
                url: '../bangMsg/bangMsg'
            })
          }
            console.log(app.globalData.phone + app.globalData.cId + app.globalData.type)
        }
      })
    }
  },
})
