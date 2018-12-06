Page({

  data: {
    movie_url: "https://mp.weixin.qq.com/s/tT2-3ODHpRlotjGnZbljZg"
  },

  onLoad: function (options) {
    var $this = this;
    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/static/movie.json',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        $this.setData({
          movie_url: res.data.url
        });
        console.log(res.data);
      }
    });
  },
})