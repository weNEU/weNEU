// pages/Perinfo/Perinfo.js
var app = getApp();
Page({
  data: {
    userid: '', //学号
    passwd: '', //密码
    passwd_ykt: '', //一卡通密码
    state: '',
    TermClist: [],
    Clist: [], //
    loan: [], //借阅
    banners: [{
      businessId: 1,
      picture: "https://ws4.sinaimg.cn/large/006tNbRwly1fxr5ws4s6sj30p00andh7.jpg"
    }],
    weekday: '', //星期数
    week: '', //周数
    index: 0,
    iflogin: 0,
    iflogin_lib: 0,
    iflogin_ykt: 0,
    balance: '',
    selectedDay: '今',
    selectedImg: '/images/icon/exchange.svg',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500
  },

  onLoad: function(options) {
    // 从本地存储获取学号及密码
    var value = wx.getStorageSync('stuID')
    var value_lib = wx.getStorageSync('stuPass_lib')
    var value_ykt = wx.getStorageSync('stuPass_ykt')

    // 判断登录状态
    if (value) {
      this.showMe()
      this.setData({
        iflogin: 1
      });
      if (value_lib) {
        this.setData({
          iflogin_lib: 1
        });
      };
      if (value_ykt) {
        this.setData({
          iflogin_ykt: 1
        });
      }
    }
  },

  showMe: function() {
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
      success: function(res) {
        wx.hideToast();
        console.log(res.data);
        if (res.data.data.name != null) {
          wx.setStorageSync('cjInfo', res.data.data);
        } else {
          //_this.showToptips();
        }
        wx.hideNavigationBarLoading();
      },
      fail: function(res) {
        console.warn('网络错误');
      },
      complete: function() {
        wx.hideNavigationBarLoading();
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var $this = this;

    // 从本地存储获取学号及密码
    this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass'),
      passwd_ykt: wx.getStorageSync('stuPass_ykt'),
    });

    this.showMe();

    var util = require('../../utils/Data.js');
    var formatTime = new Date(util.formatDateByH(new Date())).getDay();
    console.log(new Date(util.formatDateByH(new Date())).getDay());
    var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();
    var formatTimeS = new Date('2018-09-03').getTime();
    var formatTimeS1 = new Date('2018-09-04').getTime();
    var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
    var week = (days / 7) + 1;
    if (formatTime == 0) {
      formatTime = 7
      this.setData({
        week: parseInt(week) + 1,
        weekday: formatTime
      });
    } else {
      this.setData({
        week: parseInt(week),
        weekday: formatTime
      });
    }
    var value = wx.getStorageSync('stuID')
    var value1 = wx.getStorageSync('TermClist')
    if (value) {
      this.showCard()
      this.showLib()

      if (wx.getStorageSync('TermClist')) {
        var i = 0
        var n = 0
        console.log(this.data.weekday)
        for (; i < 6; i++) {
          if (value1[this.data.week - 1][this.data.weekday - 1][i][0] == null) {
            n = n + 1;
          }
        }
        if (n == 6) {
          $this.setData({
            'index': 0,
          });
        } else {
          $this.setData({
            'index': 1,
          });
        }
        $this.setData({
          'Clist': value1[this.data.week - 1][this.data.weekday - 1]
        });
        console.log(this.data.Clist)
      } else {
        console.log("settimeout")

        this.showTermCourse();
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  tapBanner: function(e) {
    wx.switchTab({
      url: '/pages/wish/wish',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  showLib: function() {
    var $this = this;
    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/04-02getBorrowInfo/04-02grab.php',
      data: {
        'libID': $this.data.userid,
        'libPass': $this.data.userid.substring(2, 8),
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        $this.setData({
          'loan': res.data
        });
      }
    })
  },

  showCard: function() {
    var $this = this;
    wx.request({
      url: 'https://neuvwo.com/mini/api/getCardInfo',
      data: {
        'stuID': $this.data.userid,
        'cardPass': $this.data.passwd_ykt,
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        $this.setData({
          balance: res.data.data.balance
        });
      }
    })
  },

  showTermCourse: function() {
    var $this = this;
    var url

    /* 判断本科生 or 研究生 */
    if (wx.getStorageSync('isGra') == 0) {
      url = 'https://neuvwo.com/mini/api/getNewTermCourse';
    } else {
      url = 'https://neuvwo.com/mini/postgraduate/api/getNewTermCourse';
    }

    /* 请求课表数据 */
    wx.request({
      url: url,

      data: {
        'stuID': $this.data.userid,
        'stuPass': $this.data.passwd,
        'term': 15,
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        $this.setData({
          TermClist: res
        });
        wx.setStorageSync('TermClist', res.data.data);
        var i = 0
        var n = 0
        for (; i < 6; i++) {
          if (res.data.data[$this.data.week - 1][$this.data.weekday - 1][i][0] == null) {
            n = n + 1;
          }
        }
        if (n == 6) {
          $this.setData({
            'index': 0,
          });
        } else {
          $this.setData({
            'index': 1,
          });
        }
        $this.setData({
          'Clist': res.data.data[$this.data.week - 1][$this.data.weekday - 1]
        });
      }
    })
  },

  /* 切换明日课表 */
  tomorrow: function() {
    var $this = this;
    var value1 = wx.getStorageSync('TermClist')
    var isSat = 0;
    var offset = 0;
    var isSun = 0;
    var offset_week = 0;
    if (($this.data.weekday - 1) == 5){
      offset = 1;
    }
    /* 注意周日 */
    if ($this.data.selectedDay == "今") {
      $this.setData({
        selectedDay: "明",
        Clist: value1[this.data.week - 1 + offset][this.data.weekday - 1 + 1]
      })
    } else {
      $this.setData({
        selectedDay: "今",
        Clist: value1[this.data.week - 1][this.data.weekday - 1]
      })
    }

    console.log($this.data.Clist);
    // 改变index值
    var i = 0
    var n = 0
    for (; i < 6; i++) {
      if ($this.data.Clist[i][0] == null) {
        n = n + 1;
      }
    }
    if (n == 6) {
      $this.setData({
        'index': 0,
      });
    } else {
      $this.setData({
        'index': 1,
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    this.getNewTermCourse()
  },

  clearStorage: function() {
    wx.clearStorage()
  }
})