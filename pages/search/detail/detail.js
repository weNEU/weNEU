Page({

  data: {
    type: '',
    code: '',
    course_list: [],
    name: ''
  },

  onLoad: function(options) {
    var _this = this;
    _this.setData({
      type: options.type,
      code: options.code,
      name: options.name
    });
    _this.Search();
  },

  Search: function() {
    var $this = this;
    $this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass')
    });
    wx.showLoading({
      title: '正在加载....',
    })
    wx.request({
      url: 'https://neuvwo.com/mini/api/search/course',
      data: {
        stuID: $this.data.userid,
        stuPass: $this.data.passwd,
        type: $this.data.type,
        code: $this.data.code
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        wx.hideToast();
        console.log(res.data);
        $this.setData({
          course_list: res.data.data,
        });
      },
      complete: function(res) {
        wx.hideLoading();
      }
    })
  }
})