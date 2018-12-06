var app = getApp(); //获取应用实例

Page({
  
  data: {
    version: '',
    showLog: false
  },

  onLoad: function () {
    this.setData({
      version: 0.9,
      year: new Date().getFullYear()
    });
  },

  toggleLog: function () {
    this.setData({
      showLog: !this.data.showLog
    });
  }
});