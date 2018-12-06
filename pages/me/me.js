// pages/userinfo/userinfo.js
import { $wuxToptips } from '../../dist/index'
var app = getApp();
var appColor = app.getBGColor();
console.log(appColor);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    isGra: 0,
    userid: '',
    passwd: '',
    name: '',
    id: '',
    gender: '',
    grade: '',
    myClass: '',
    college: '',
    major: '',
    state: '',
    img: '',
    week: '',
    weekday: '',
    cjInfo: '',
    term:'2018-2019学年秋季学期',
    show: false,
    pageBackgroundColor: appColor
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.showWeek();
    if (wx.getStorageSync('stuID')){
    _this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass'),
      isGra: wx.getStorageSync('isGra'),
      index: 1
    });
    //判断并读取缓存
    if (wx.getStorageSync('cjInfo')) {
      _this.setData({
        cjInfo: wx.getStorageSync('cjInfo'),
      });
      if (_this.data.cjInfo.gender == '男') {
        _this.setData({
          img: '../../images/more/boy.png'
        });
      } else {
        _this.setData({
          img: '../../images/more/girl.png'
        });
      };
    }
    else {
      _this.showMe()
    }
    }
  },
  
  showMe:function(){
    var _this = this;
    var url;
    if (wx.getStorageSync('isGra') == 0) {
      url = 'https://neuvwo.com/mini/api/getInfo';
    } else {
      url = 'https://neuvwo.com/mini/postgraduate/api/getInfo';
    }
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: ({
        'stuID': _this.data.userid,
        'stuPass': _this.data.passwd
      }),
      success: function (res) {
        wx.hideToast();
        _this.setData({
          cjInfo: res.data.data,
        });
        if (res.data.data.gender == '男') {
          _this.setData({
            img: '../../images/more/boy.png'
          });
        } else {
          _this.setData({
            img: '../../images/more/girl.png'
          });
        }
        console.log(res.data);
        _this.showWeek();
        if (res.data.data.name!=null){
          wx.setStorageSync('cjInfo', res.data.data);
        }
        else{
          _this.showToptips();
        }

        wx.hideNavigationBarLoading();

      },
      fail: function (res) {
        if (_this.data.remind == '加载中') {
          _this.setData({
            remind: '网络错误'
          });
        }
        console.warn('网络错误');
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  },
  showWeek: function () {
    var _this = this;
    var util = require('../../utils/Data.js');
    var formatTime = new Date(util.formatDateByH(new Date())).getDay();
    var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();
    var formatTimeS = new Date('2018-09-03').getTime();
    var formatTimeS1 = new Date('2018-09-04').getTime();
    var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
    var weekday1 = ["日", "一", "二", "三", "四", "五", "六"];
    var week = (days / 7) + 1;
    _this.setData({
      week: parseInt(week),
      weekday: weekday1[formatTime]
    });
  },
  showToptips: function () {
    $wuxToptips().warn({
      hidden: false,
      text: '请下拉重试',
      duration: 3000,
      success() { },
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onOpen() {
    this.setData({ show: true });
  },
  changeColor(event) {
    console.log(this.pageBackgroundColor);
    console.log(event.currentTarget.id);
    var newColor = event.currentTarget.id;
    app.changeColor(newColor);
    appColor = app.getBGColor();
    this.setData({
      pageBackgroundColor: appColor
    })
    console.log(this.pageBackgroundColor);
  }
})