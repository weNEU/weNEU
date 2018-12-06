Page({

  data: {
    userid: '',
    passwd: '',
    loan:[]
  },

  onLoad: function (options) {
    var $this=this;
    $this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuID').substring(2, 8)
    });
    wx.showLoading({
      title: '正在加载....',
    })
    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/04-02getBorrowInfo/04-02grab.php',
      data: {
        'libID': $this.data.userid,
        'libPass': $this.data.passwd,
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        $this.setData({
            'loan':res.data
        });
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  }
})