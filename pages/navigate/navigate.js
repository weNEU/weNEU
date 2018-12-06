Page({

  data: {
    active: 0,
    top_list: [],
    college_list: [],
    apartment_list: [],
    source_list: []
  },

  onLoad: function (options) {
    var $this = this;
    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/static/navigate.json',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.hideToast();
        $this.setData({
          top_list: res.data.top
        });
        console.log(res.data);
      }
    });
  }
})