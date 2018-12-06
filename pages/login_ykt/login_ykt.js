//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '请先绑定教务处',
    passwd: '',
    angle: 0
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onLoad: function () {
    var _this = this;
    var value = wx.getStorageSync('stuID');
    _this.setData({
      userid: value
    });
    console.log(value)
  },

  bind: function () {
    var _this = this;
    if (!_this.data.userid || !_this.data.passwd) {
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }

    app.showLoadToast('绑定中');
    wx.request({
      method: 'POST',
      url: 'https://neuvwo.com/mini/api/loginCard',
      data: ({
        stuID: _this.data.userid,
        cardPass: _this.data.passwd
      }),
      success: function (res) {
        console.log(res.data);
        if (res.data.data === 'success') {
          wx.showToast({
            title: '请稍候',
          })
          //清除缓存
          wx.removeStorageSync('stuPass_ykt');
          wx.setStorage({
            key: 'stuPass_ykt',
            data: _this.data.passwd,
          })
          wx.switchTab({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null)
                return;
              page.onReady();
            } 
          })
        } else {
          wx.hideToast();
          app.showErrorModal("请核对密码后重试", '绑定失败');
        }

      },
      fail: function (res) {
        wx.hideToast();
        app.showErrorModal("服务器繁忙，请稍后再试", '绑定失败');
      }
    });
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 8) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
});