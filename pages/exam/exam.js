var app = getApp();
Page({
  data: {
    userid: '',
    passwd: '',
    ksInfo: [],
    isNull: 'default'
  },
  onLoad: function() {
    var _this = this;
    _this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass')
    });
    //判断并读取缓存
    wx.showLoading({
      title: '正在加载....',
    })
    wx.showNavigationBarLoading();
    wx.request({
      url: "https://neuvwo.com/mini/api/getExam",
      method: 'POST',
      dataType: 'json',
      data: ({
        stuID: _this.data.userid,
        stuPass: _this.data.passwd
      }),
      success: function(res) {
        wx.hideToast();
        _this.setData({
          ksInfo: res.data.data,
        });
        if (res.data.data == null) {
          _this.setData({
            isNull: false,
          });
          console.log(1)

        } else {
          _this.setData({
            isNull: true,
          });
        }
        console.log(res.data.data);
        wx: wx.removeStorage({
          key: 'ksInfo',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        wx.setStorageSync('ksInfo', res.data.data)
      },
      fail: function(res) {
        if (_this.data.remind == '加载中') {
          _this.setData({
            remind: '网络错误'
          });
        }
        _this.setData({
          ksInfo: wx.getStorageSync('ksInfo'),
        });
        console.warn('网络错误');
      },
      complete: function() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();

      }
    });
  }
});