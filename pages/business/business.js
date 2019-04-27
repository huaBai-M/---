// pages/business/business.js
import Toast from '../../dist/toast/toast';
var app = getApp()
var globalData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showHide: '展开',
        allnumber:1,
        businessMsg: [],
        radios: [{
          name: '初步联系，有意向',
          value: '初步联系，有意向',
          checked: 'true'
        },
        {
          name: '初步联系，意向不确定',
          value: '初步联系，意向不确定'
        },
        {
          name: '有初步成交意向',
          value: '有初步成交意向'
        },
        {
          name: '已经成交',
          value: '已经成交'
        }],
      radiosVal:"初步联系，有意向" ,
      inputText:"",
      iconText:"加载中.....",
      iconShow:false,
      size:5,
      page:1,
      canClick:false,
      img:""
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
        that.messageapi();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      //  console.log(0)
      
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
     //this.messageapi()
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
      this.data.page = 1;
      this.messageapi()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this;
        console.log("我上拉了.......")
        that.setData({
          iconShow:false
        })
      this.data.page+=1;
      console.log(this.data.page)
      this.messageapi()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    // 点击单选框事件变化
    radioChange: function(e) {
        //console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.data.radiosVal = e.detail.value;
    },
    bindTextAreaBlur(e){
      this.data.inputText = e.detail.value
    },
    // 点击新增跟进内容展示隐藏的单选框与文本框
    addContent: function(e) {
      var index = e.currentTarget.dataset.ind;
      var that = this;
      var str1 = 'businessMsg[' + index + '].ifcount';
      that.setData({
        [str1]: !that.data.businessMsg[index].ifcount
      })
    },
    //提交新增访问
    addsjf:function(e){
      if (this.data.inputText=='' || this.data.radiosVal==''){
        wx.showToast({
          title: '请输入内容',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
          return false
      }
      var that = this;
      var messageId = e.currentTarget.dataset.messageid;
      var index = e.currentTarget.dataset.index;
      var str = 'businessMsg[' + index + '].businessMsgitems';
      this.setData({
        canClick: true
      });
      wx.request({
        url: globalData.webRequsetUrl + '/mmc/addSjF',
        method: 'POST',
        header: {
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        data:{
          createContent: this.data.inputText ,
          createFlag: this.data.radiosVal ,
          messageId: messageId
        },
        success(res) {
          that.data.businessMsg[index].businessMsgitems.push(res.data)
          that.setData({
            [str]: that.data.businessMsg[index].businessMsgitems,
            canClick: false
          });
          that.setData({
            radiosVal: "初步联系，有意向",
            inputText: ""
          });
        }
      });
    },



    //展开，收起按钮
    ShowClick: function(e) {
      var that = this;
      var msgid = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var str = 'businessMsg[' + index + '].ifshow';
      var strAll = 'businessMsg[' + index + '].businessMsgitems';
      this.setData({
        [str]:! that.data.businessMsg[index].ifshow
      })
      if (that.data.businessMsg[index].ifshow){
        this.setData({
          page: that.data.page + 1
        })
        console.log("-------------------------------------")
          return false
      }
      //展开更多
      wx.request({
        url: globalData.webRequsetUrl + '/mmc/fsfl',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        data:{
          msgid: msgid
        },
        success(res) {
            if (typeof (res.data.list)=="string"){
                that.setData({
                    [strAll]: [],
                })
            }
          that.setData({
            [strAll]: res.data.list,
          })
        }
      });

    },
    messageapi(){
      var _this=this;
      if (_this.data.businessMsg.length == _this.data.allnumber) {
        this.setData({
          page: _this.data.page - 1,
          iconText: "没有更多啦"
        })
        console.log("没有更多啦")
        return false
      }
      //获取商机总数
      wx.request({
        url: globalData.webRequsetUrl + '/mmc/fsc',
        method: 'POST',
        header: {
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        success(res) {
          _this.setData({
            allnumber: res.data
          })
        }
      });
      //获取商机信息
      wx.request({
        url: globalData.webRequsetUrl + '/mmc/fsl',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "SESSION=" + app.globalData.sessionId
        },
        data: {
          "size": _this.data.size,
          "page": _this.data.page,
        },
        success(res) {
          for (let i in res.data.list) {
            _this.data.businessMsg.push(res.data.list[i])
          }
          _this.setData({
            businessMsg: _this.data.businessMsg,
            iconShow: true
          })

        }
      });
    },

})