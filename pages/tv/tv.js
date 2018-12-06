Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    TVlist:[],
    center_list:[],
    province_list:[],
    movie_list:[],
    sport_list:[],
    liaoning_list:[],
    other_list:[]
  },

  onChange(event) {

  },
  
  onLoad: function (options) {
    var $this = this;
        wx.request({
          url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/static/tv.php',
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            wx.hideToast();
            $this.setData({
              TVlist: res.data,
              center_list: res.data[0],
              province_list: res.data[1],
              movie_list: res.data[2],
              sport_list: res.data[3],
              liaoning_list: res.data[4],
              other_list: res.data[5]
            });
            console.log(res.data);
          }
        });
  },
  navi:function(){
      wx.navigateTo({
        url: '',
      })
  }
})
