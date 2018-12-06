Page({

  data: {
    userid: '',
    passwd: '',
    name:'',
    Blist:[]
  },

  bindSearchInput: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  Search: function () {
    var $this = this;
    $this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass')
    });
    wx.showLoading({
      title: '正在加载....',
    })
    wx.request({
      url: 'https://neuvwo.com/mini/api/search',
      data: {
        stuID: $this.data.userid,
        stuPass: $this.data.passwd,
        search: $this.data.name
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        wx.hideToast();
        $this.setData({
          Blist: res.data.data,
        });
        console.log(res.data);
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },

  showCourse: function(type, code){
    wx.navigateTo({
      url: './detail?type='+type+'code='+code,
    })
  }
})