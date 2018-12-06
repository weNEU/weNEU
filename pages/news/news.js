//news.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
// require('template/template.js') 


//news.js
//获取应用实例
var app = getApp();
Page({
  data: {
    page: 0,
    list: [
      { id: 0, 'type': 'neu', name: '东大新闻网', storage: [], url: '06-01getNEUnews/06-01grabNEU_list.php', subType: ["东大要闻", "媒体东大", "通知公告", "新闻纵横", "学术科研", "招生就业","考研出国"]},
      { id: 1, 'type': 'jw', name: '教务公告', storage: [], url: '06-02getAAOnews/06-02grabAAO_list.php', subType: ["新闻纵横", "通知", "公告", "研究生通知", "教学管理与研究", "素质教育"] },
      { id: 2, 'type': 'new', name: '软件学院', storage: [], url: "06-03getCollegenews/06-03-01grabSE_list.php", subType: ["通知公告", "学院新闻", "本科生通知", "学生工作", "人才培养", "学生园地"]  }
      // ,
      // { id: 3, 'type': 'hy', name: '会议通知', storage: [], url: 'news/hy_list.php' },
      // { id: 4, 'type': 'jz', name: '学术讲座', storage: [], url: 'news/jz_list.php'},
      // { id: 5, 'type': 'new', name: '综合新闻', storage: [], url: 'news/new_list.php' },
    ],
    active: {
      id: 0,
      'type': '',
      data: [],
      showMore: true,
      remind: '下滑加载更多'
    },
    loading: false,


    //swiper
    currentTab:1, //二级目录
    currentPage:0,//当前页数，（下拉刷新）
    currentHeight:30 //每个的高度
  },
  onLoad: function () {
    this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '下滑加载更多',
      'page': 0
    });
    this.getNewsList();
  },
  //swiper的change
  swiper_bindchange: function(e){  //二级目录的滑动切换
    var _this = this;
    wx.showLoading({
      title: '正在加载...',
    })
    this.setData({
      currentTab: e.detail.current+1,   //currentTab 从1 开始计数
      currentPage: 0
    })
    this.loadData();
  },

  loadData: function(){
    var _this = this;
    var data = this.data.list[this.data.page].storage[this.data.currentTab];
    if(data){
      _this.setData({
        'page': _this.data.page,
        'active.data': data,
        'active.showMore': true,
        'active.remind': '正在加载中...',
        'active.type': _this.data.list[_this.data.page].type,
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.setData({
        loading: false
      });
      wx.hideLoading();

    }
    else {
      this.getNewsList();
    }
  },

  swichNav: function(e){ //点击更换二级目录
  console.log(e)
  var currentTab = e.target.dataset.current
  this.setData({
    currentTab: currentTab,
    currentPage: '0'
  })
  var _this = this;
  _this.setData({
    'loading': true,
    'active.data': '',
    'active.showMore': true,
    'active.remind': '正在加载中....'
  });
 this.loadData();

  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;
    _this.setData({
      'loading': true,
      'active.data': '',
      'active.showMore': true,
      'active.remind': '下滑加载更多'
    });
    _this.getNewsList();
  },
  //上滑加载更多
  onReachBottom: function () {
    var _this = this;
    if (_this.data.active.showMore) {
      wx.request({
        url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/' + _this.data.list[_this.data.page].url + "?class=" + _this.data.currentTab + "&page=" + (_this.data.currentPage+1),
        success: function (res) {
          console.log(res)
          if (res.data) {
            var modifyData = res.data;
           
              var string;
              for (var i in modifyData) {
                string = modifyData[i].href + "";
                modifyData[i].herf = string.replace('\\?', 'wenhao');
              }
              var result = [];
              var begin = [];
              var data = _this.data.active.data;
              for (var i in modifyData) {
                result.push(modifyData[i])
              }
              for (var i in data) {
                begin.push(data[i])
              }
              
              var addData = begin.concat(result);
              console.log(addData)
              var type = _this.data.list[_this.data.page].type
              _this.setData({
                'active.data': addData,
                'active.showMore':true,
                'active.remind':'下滑加载更多',
                'active.type':type,
              });
              _this.setData({
                currentPage: _this.data.currentPage + 1
              })
            
          }
        },

        fail: function (res) {
          app.showErrorModal(res.errMsg);
          _this.setData({
            'active.remind': '网络错误'
          });
        },
        complete: function () {
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
          _this.setData({
            loading: false
          });
          wx.hideLoading();
        }
      })
    }
    
    else{
      _this.setData({
        'active.remind': "没有更多了"
      })
    }
  },
  
  //获取新闻列表
  getNewsList: function () {
    var _this = this;
       wx.stopPullDownRefresh();
    _this.setData({
      'active.remind': '正在加载中'
    });
    wx.showNavigationBarLoading();
    wx.request({
      url:'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/' + _this.data.list[_this.data.page].url+"?class="+_this.data.currentTab+"&page="+_this.data.currentPage,
      success: function (res) {
        console.log(res)
        if (res.data ) {
           var modifyData = res.data;
           if(_this.data.page==1){
             console.log("进入page1")
             var string;
             for (var i in modifyData) {
               string = modifyData[i].href + "";
               string = string.replace('\\?', 'wenhao');
               string = string.replace('=', 'dengyu');
               modifyData[i].href_real = string;
             }
           }
                var data = {
                  'page': _this.data.page,
                  'active.data': modifyData,
                  'active.showMore': true,
                  'active.remind': '下滑加载更多',
                  'active.type':_this.data.list[_this.data.page].type,
                };
                _this.setData(data);
                var list = _this.data.list;
                list[_this.data.page].storage[_this.data.currentTab] = modifyData ;
                _this.setData({
                  list: list
                });
            
          }
        },
   
      fail: function (res) {
        app.showErrorModal(res.errMsg);
        _this.setData({
          'active.remind': '网络错误'
        });
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        _this.setData({
          loading: false
        });
        wx.hideLoading();
      }
  })

  },






  //获取焦点
  changeFilter: function (e) {
    console.log("changFilter")
    console.log(e);
    if(e.target.dataset.id>=3){


    }
    else{
      var page = e.target.dataset.id;
      var _this = this;
      this.setData({
        page: page,
        currentPage: 0,
        currentTab: 1,
        'active': {
          'id': page,
          'type': "",
          data: [],
          showMore: true,
          remind: '下滑加载更多'
        },
      });
      var _this = this;
      if (page == 0) {
        _this.setData({
          currentHeight: 31
        })
      }
      else if (page == 1 || page == 2) {
        _this.setData({
          currentHeight: 11
        })
      }
      this.getNewsList();

    }
  
  }

});
