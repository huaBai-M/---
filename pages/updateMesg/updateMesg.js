// pages/updateMesg/updateMesg.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msgs:{
            phone: '18536961234',
            name: '毛先生',
            company: '云南旭日环保设备有限公司',
            serPhone: '13832652223',
            web: 'https://orx3zc.axshare.com',
            email: '13832652223@163.com',
            address: '云南省保山市',
            range: '塑料制品加工'
        },
        index: 0,
      industry: [
        '工业|制造|能源|化工', 
        '机械|专用设备',
        '配件|五金工具',
        '包装|印刷|办公用品',
        '服装|纺织|配饰',
        '日用百货|家用电器',
        '会计|金融|银行|保险',
        '房地产|建筑|装潢',
        '媒体|广告,媒体|广告',
        '批发|零售|代理商',
        '餐饮|旅游|休闲|娱乐|体育',
        '计算机|网络|通信|电子',
        '服务|教育|培训',
        '贸易|物流',
        '农林牧渔',
        '非营利性组织'
        ],
        industryVal:"",
        range: ['环保设备', '农业', '教育', '环保'],
        region: ['广东省', '广州市','香洲区'],
        customItem: '全部',
        disabled:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var _this = this
        if (app.globalData.ifBind != true) {
            wx.navigateTo({
                url: '/pages/bangding/bangding',
            })
        }
      wx.request({
        url: globalData.webRequsetUrl + '/muc/gmuipx',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        success(res) {
          console.log(res);
          _this.setData({
            "msgs.phone": res.data.phone,
            "msgs.name": res.data.name,
            "msgs.company": res.data.clientInfo.customerName,
            "msgs.serPhone": res.data.clientInfo.phone,
            "msgs.web": res.data.clientInfo.customerWeb,
            "msgs.email": res.data.clientInfo.email,
            "msgs.address": res.data.clientInfo.address,
            "msgs.range": res.data.clientInfo.manageScope,
            "industryVal": res.data.clientInfo.industry,
          })
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
    submit:function(e){
      var _this=this
      let submitVal={
        customerName: this.data.msgs.company,
        phone: this.data.msgs.phone,
        customerWeb: this.data.msgs.web,
        email: this.data.msgs.email,//邮箱
        address: this.data.msgs.address,//地址
        industry: this.data.industryVal,
        manageScope: this.data.msgs.range,
      }
      _this.setData({
        "disabled": true
      })
      wx.request({
        url: globalData.webRequsetUrl + '/muc/emui',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        data: {
          params: JSON.stringify(submitVal)
        },
        success(res) {
          console.log(res)
          _this.setData({
            "disabled": false
          })
          if (res.data.result == "success") {
            wx.navigateTo({
              url: '../baseMesg/baseMesg'
            })
          }else {
            console.log("保存失败")
          }
          
        }
      });
    },
    bindPickerChange: function (e) {
        var _this=this;
        console.log(this.data.industry[e.detail.value])
        this.setData({
          industryVal: _this.data.industry[e.detail.value],
          index: e.detail.value
        })
    },
    //公司地址
    companyval: function (e){
        console.log(e.detail.value);
        var _this = this;
        this.setData({
          "msgs.company": e.detail.value,
        })
      },
    serPhoneval: function (e){
        console.log(e.detail.value);
        var _this = this;
        _this.setData({
          "msgs.serPhone": e.detail.value,
        })
      },
    webval3: function (e){
        console.log(e.detail.value);
        var _this = this;
        _this.setData({
          "msgs.web": e.detail.value,
        })
      },
    emailval: function (e) {
        console.log(e.detail.value);
        var _this = this;
        _this.setData({
          "msgs.email": e.detail.value,
        })
      },
    addressVal: function(e) {
      console.log(e.detail.value);
      var _this = this;
      _this.setData({
        "msgs.address": e.detail.value,
      })
    },
    rangeVal: function (e) {
      console.log(e.detail.value);
      var _this = this;
      _this.setData({
        "msgs.range": e.detail.value,
      })
    },

})