var app = getApp(); //获取应用实例

Page({
  data: {
    version: '',
    showLog: false
  },

  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  onLoad: function () {
    this.setData({
      version: 1.2,
      year: new Date().getFullYear()
    });
  },
  
  toggleLog: function () {
    this.setData({
      showLog: !this.data.showLog
    });
  }
});