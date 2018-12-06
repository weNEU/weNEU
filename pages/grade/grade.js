var app = getApp();
import {
  $wuxSelect
} from '../../dist/index'
import {
  $wuxDialog
} from '../../dist/index'

Page({
  data: {
    value1: '',
    title: ['2018-2019学年秋季学期', '2017-2018学年第二学期', '2017-2018学年第一学期', '2016-2017学年第二学期', '2016-2017学年第一学期', '2015-2016学年第二学期', '2015-2016学年第一学期'],
    term: ['15','14','13','12','11','10','9'],
    userid: '',
    passwd: '',
    cjInfo: '',
    GPA: '',
    isGra: 0,
    show: false,
    index: 0,
    actions: [{
        name: '选项'
      },
      {
        name: '分享',
        subname: '描述信息',
        openType: 'share'
      },
      {
        loading: true
      },
      {
        name: '禁用选项',
        disabled: true
      }
    ]
  },
  toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
    console.log(this.data.show)
  },
  toggleActionSheet() {
    console.log("**");
    this.toggle('show');
  },

  open() {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.getInfo()
  },

  onPullDownRefresh() {
    this.getInfo()
  },

  show: function(e) {
    wx.showModal({
      title: e.currentTarget.dataset.name,
      content: '平时成绩：' + e.currentTarget.dataset.common + '\n' + '期中成绩：' + e.currentTarget.dataset.medium + '\n' + '期末成绩：' + e.currentTarget.dataset.final,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
    })
  },

  onLoad: function() {
    var _this = this;
    _this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass'),
      isGra: wx.getStorageSync('isGra')
    });
    //判断并读取缓存
    this.getInfo()
  },

  /* 获取绩点 */
  showGPA: function() {
    var _this = this;
    wx.request({
      url: 'https://neuvwo.com/mini/api/getGPA',
      data: {
        'stuID': _this.data.userid,
        'stuPass': _this.data.passwd,
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        wx.hideToast();
        _this.setData({
          GPA: res.data.data,
        });
        wx.setStorageSync('GPA', res.data.data)
      },
      fail: function(res) {
        if (_this.data.remind == '加载中') {
          _this.setData({
            remind: '网络错误'
          });
        }
        _this.setData({
          cjInfo: wx.getStorageSync('cInfo'),
          GPA: wx.getStorageSync('GPA'),
        });
      },
      complete: function() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    })
  },

  /* 获取成绩 */
  getInfo: function() {
    var _this = this;
    var url;
    wx.showLoading({
      title: '正在加载....',
    })
    wx.showNavigationBarLoading();
    if (wx.getStorageSync('isGra') == 0) {
      url = 'https://neuvwo.com/mini/api/getScore';
      this.showGPA();
    } else {
      url = 'https://neuvwo.com/mini/postgraduate/api/getScore';
    }
    wx.request({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: ({
        'stuID': _this.data.userid,
        'stuPass': _this.data.passwd,
        'term': _this.data.term[_this.data.index]
      }),
      success: function(res) {
        wx.hideToast();
        _this.setData({
          cjInfo: res.data.data,
        });
        console.log(res.data.data);
        wx.setStorageSync('cInfo', res.data.data)
      },
      fail: function(res) {
        if (_this.data.remind == '加载中') {
          _this.setData({
            remind: '网络错误'
          });
        }
        _this.setData({
          cjInfo: wx.getStorageSync('cInfo'),
          GPA: wx.getStorageSync('GPA'),
        });
      },
      complete: function() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    });
  }
});