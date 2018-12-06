Page({

  data: {
    active: 0,
    campus_list: [],
    weneu_list: []
  },

  onLoad: function (options) {
    var $this = this;
    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/static/notice.json',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.hideToast();
        $this.setData({
          campus_list: res.data[0],
          weneu_list: res.data[1]
        });
      }
    });
  },

  to: function () {
    wx.showModal({
      title: "提示", //提示的标题,
      content: "请加入QQ群 721423324 提出您的宝贵建议哟~等你哦", //提示的内容,
      showCancel: false, //是否显示取消按钮,
      confirmText: '已阅读', //确定按钮的文字，默认为取消，最多 4 个字符,
      confirmColor: '#3CC51F', //确定按钮的文字颜色,
      success: res => { }
    });
    // wx.navigateTo({ url: "/pages/my/feedback" });
  },
})