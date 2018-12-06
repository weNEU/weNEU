Page({

  data: {
    userid: '',
    passwd: '',
    Rlist: '',
    weekday: '',
    week: '',
    index: [0, 0],
    NH: [{
      name: "大成教学馆",
      value: "0000"
    }, {
      name: "逸夫楼",
      value: "0001"
    }, {
      name: "何世礼教学馆",
      value: "0002"
    }, {
      name: "机电馆",
      value: "0003"
    }, {
      name: "冶金馆",
      value: "0011"
    }, {
      name: "采矿馆",
      value: "0007"
    }, {
      name: "综合科技大楼",
      value: "0008"
    }, {
      name: "信息楼",
      value: "0009"
    }, {
      name: "管理楼",
      value: "0010"
    }, {
      name: "建筑馆",
      value: "0012"
    }, {
      name: "成教楼",
      value: "0017"
    }, {
      name: "计算中心",
      value: "0018"
    }, {
      name: "化学馆",
      value: "0020"
    }, {
      name: "科学馆",
      value: "0040"
    }],
    HN: [{
      name: "文管学馆",
      value: "0101"
    }, {
      name: "建筑学馆",
      value: "0102"
    }, {
      name: "生命学馆",
      value: "0103"
    }, {
      name: "信息学馆",
      value: "0104"
    }, {
      name: "1号楼",
      value: "0105"
    }],
    part: [{
      name: "A座",
      value: "1"
    }, {
      name: "B座",
      value: "2"
    }],
    building: {
      addr: "浑南",
      name: "建筑学馆",
      value: "0102"
    },
    buildings: [
      [{
        name: "浑南",
        value: "HN"
      }, {
        name: "南湖",
        value: "NH"
      }],
      [{
        name: "文管学馆",
        value: "0101"
      }, {
        name: "建筑学馆",
        value: "0102"
      }, {
        name: "生命学馆",
        value: "0103"
      }, {
        name: "信息学馆",
        value: "0104"
      }, {
        name: "1号楼",
        value: "0105"
      }]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuID')
    });
    var util = require('../../utils/Data.js');
    var formatTime = new Date(util.formatDateByH(new Date())).getDay();
    var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();

    var formatTimeS = new Date('2018-09-03').getTime();
    var formatTimeS1 = new Date('2018-09-04').getTime();
    var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
    var week = days / 7;
    if (formatTime == 0) {
      formatTime = 7
    }
    this.setData({
      week: parseInt(week),
      weekday: formatTime
    });
  },
  detail: function(e) {
    console.log(e)
    wx.showModal({
      title: e.currentTarget.dataset.no.roomName,
      content: '类型：' + e.currentTarget.dataset.no.roomType + '\n' + '座位数：' + e.currentTarget.dataset.no.seatNum,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  columnchange: function(e) {
    if (e.detail.column !== 0) {
      return;
    }
    if (e.detail.value == '1') {
      this.setData({
        buildings: [
          [{
            name: "浑南",
            value: "HN"
          }, {
            name: "南湖",
            value: "NH"
          }], this.data.NH
        ]
      })
    } else {
      this.setData({
        buildings: [
          [{
            name: "浑南",
            value: "HN"
          }, {
            name: "南湖",
            value: "NH"
          }], this.data.HN
        ]
      })
    }
    console.log(this.data.buildings[1]);
  },
  changeBuilding: function(e) {
    console.log(e.detail.value);
    this.setData({
      index: e.detail.value
    })
    this.setData({
      building: {
        addr: this.data.buildings[0][this.data.index[0]].name,
        name: this.data.buildings[1][this.data.index[1]].name,
        value: this.data.buildings[1][this.data.index[1]].value,
      }
    })
    this.show();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  show: function() {
    var $this = this;
    wx.showLoading({
      title: '正在加载....',
    })
    wx.request({
      url: 'https://neuvwo.com/mini/api/getRoom',
      data: {
        'stuID': $this.data.userid,
        'stuPass': $this.data.passwd,
        'week': $this.data.week,
        'day': $this.data.weekday,
        'storyno': $this.data.building.value
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        $this.setData({
          'Rlist': res.data.data,
        })
      },
      complete: function(res) {
        wx.hideLoading();
      }
    })
  }
})