// pages/Library/Library.js
Page({

  data: {
      name:'',
      Blist:[]
  },

  showCourse: function (e) {
    console.log(e.currentTarget.dataset.bookstate);
    wx.showModal({
      title: '索书号：' + e.currentTarget.dataset.searchno,
      content: e.currentTarget.dataset.location,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
    })
  },

  bindSearchInput: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  Search: function () {
    var $this = this;
    wx.showLoading({
      title: '正在加载....',
    })
    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/04-01getBook/04-01grab.php',
      data: {
        'bookname': $this.data.name,
        'page':'1'
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.hideToast();
        $this.setData({
          Blist: res.data,
        });
        console.log(res.data);
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  }
})