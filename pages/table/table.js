Page({

  data: {
    array1: ['1 (9.2-9.8)', '2 (9.9-9.15)', '3 (9.16-9.22)', '4 (9.23-9.29)', '5 (9.30-10.6)', '6 (10.7-10.13)', '7 (10.14-10.20)', '8 (10.21-10.27)', '9 (10.28-11.3)', '10 (11.4-11.10)', '11 (11.11-11.17)', '12 (11.18-11.24)', '13 (11.25-12.1)', '14 (12.2-12.8)', '15 (12.9-12.15)','16 (12.16-12.22)', '17 (12.23-12.29)', '18 (12.30-1.5)', '19 (1.6-1.12)', '20 (1.13-1.19)','21 (1.20-1.26)','22 (1.27-2.2)','23 (2.3-2.9)','24 (2.10-2.16)','25 (2.17-2.23)', '26 (2.24-3.2)'],
    array2: ['2018-2019学年秋季学期(本学期)', '2017-2018学年第二学期', '2017-2018学年第一学期', '2016-2017学年第二学期', '2016-2017学年第一学期' ],
    listData:[],
    array: ["1 / 2", "3  /  4", "5  /  6", "7  /  8", "9  /  10", "11  /  12"],
    colorList: ["#507f8d", "#507f8d", "#507f8d", "#507f8d", "#507f8d", "#507f8d", "#507f8d"],
    userid:'',
    passwd:'',
    week:'',
    index: 0,
  },
 
  onShow: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var util = require('../../utils/Data.js');
    var formatTime = new Date(util.formatDateByH(new Date())).getDay();
    var formatTimeS = new Date('2018-09-02').getTime();
    var formatTimeS1 = new Date('2018-09-03').getTime();
    var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();
    var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
    var week = (days / 7)+1;
    var someday = "colorList[" + formatTime + "]";
    console.log(someday);
    this.setData({
      week: parseInt(week),
      index: parseInt(week)-1,
      [someday]: "#EE4000"
    });
    this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass')
    });
    this.showCourse();
    console.log(formatTime);
    console.log(week);
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    var _this=this
    var number = parseInt(e.detail.value)+parseInt(1);
    _this.setData({
      week: number
    });
    wx.removeStorageSync('listData')
    this.showCourse();

  }, 
  last:function(){
    var _this = this
    var number = this.data.week -1;
    if(number >=1){
    _this.setData({
      week: number,
      index:number
    });
    wx.removeStorageSync('listData')
    this.showCourse();
    }
  },
  next:function(){
    var _this = this
    var number = this.data.week + 1;
    if(number <= 25){
    _this.setData({
      week: number,
      index: number
    });
    wx.removeStorageSync('listData')
    this.showCourse();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.removeStorageSync('listData')
    this.showTermCourse();  
    wx.stopPullDownRefresh();
    this.showCourse();  
  },
  showTermCourse: function () {
    var $this = this;
    var url
    if (wx.getStorageSync('isGra') == 0) {
      url = 'https://neuvwo.com/mini/api/getNewTermCourse';
    } else {
      url = 'https://neuvwo.com/mini/postgraduate/api/getNewTermCourse';
    }
    wx.showLoading({
      title: '正在加载....',
    })
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      data: {
        'stuID': $this.data.userid,
        'stuPass': $this.data.passwd,
        'term': 15,
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        wx.setStorageSync('TermClist', res.data.data);

      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    })
  },

  showCourse: function () {
    var $this = this;
    var value = wx.getStorageSync('TermClist')
    $this.setData({
      listData: value[this.data.week - 1],
    });
    console.log(value[this.data.week - 1])
  }
})