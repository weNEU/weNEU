//detail.js (common)
var app = getApp();
Page({
  data: {
    type: '',
    typeid: '',
    remind: "加载中",
    id: '',
    title: "",    // 新闻标题
    date: "",     // 发布日期
    content: "",  // 新闻内容
    imgs: "",
    urls: ["06-01getNEUnews/06-01grabNEU_content.php",
      "06-02getAAOnews/06-02grabAAO_content.php",
      "06-03getCollegenews/06-03-01grabSE_content.php"]
  }
  ,
  //分享
  onShareAppMessage: function () {
    var _this = this;
    return {
      title: _this.data.title,
      desc: 'NEUer 咨询详情',
      path: 'pages/news/detail/detail?type=' + _this.data.type + '&id=' + _this.data.id
    }
  },



  onLoad: function (options) {
    //初始化
    this.setData({
      type: '',
      typeid: '',
      remind: "加载中",
      id: '',
      title: "",    // 新闻标题
      date: "",     // 发布日期
      content: "",  // 新闻内容
      imgs: "",
    });

    console.log(options)
    var _this = this;
    var modifyID = options.id+"";
    var type = options.type;
    if(type=='jw'){
      modifyID = modifyID.replace('wenhao', '\\?')
      modifyID = modifyID.replace('dengyu', '=')
    }
   
    _this.setData({
      type: options.type,
      id: modifyID,
      title: options.title,
      date: options.date
    });
    if (_this.data.type == 'neu') {
      _this.setData({ typeid: '0' })
    }
    else if (_this.data.type == 'jw') {
      _this.setData({ typeid: '1' })

    }
    else if (_this.data.type == 'rj') {
      _this.setData({ typeid: '2' })
    }
    console.log(_this.data.typeid)

    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/' + _this.data.urls[_this.data.typeid] + "?link=" + _this.data.id,
      success: function (res) {
        console.log(res)
        if (res.data) {
          if(res.data.title){
            _this.setData({
              title:res.data.title
            })
          }
          _this.setData({
            content: res.data.content,  // 新闻内容
            imgs: res.data.img,
            remind: ''
          });

          if(res.data.img=="http://neunews.neu.edu.cn"){
            _this.setData({
              imgs: ""
            })
          }
        }
      },
      fail: function () {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
      }
    })
  }
})