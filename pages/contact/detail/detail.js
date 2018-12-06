var app = getApp();

Page({
  data: {
    placename: "",
    data: []
  },
  //分享
  onShareAppMessage: function() {
    var _this = this;
    return {
      title: _this.data.title,
      desc: 'NEUer 校园通讯录 ' + _this.data.placename,
      path: 'pages/Contacts/detail/detail?place = this.data.placename'
    }
  },



  onLoad: function(options) {
    console.log(options)
    var _this = this;
    _this.setData({
      placename: options.place
    });
    let placename = options.place;
    console.log(_this.data.placename)
    if (placename == "教务处") {
      console.log("进入教务处")
      _this.setData({
        data: [{
            department: "教务处处长",
            tele: "024-83683683"
          },
          {
            department: "教务处副处长",
            tele: "024-83687365"
          },
          {
            department: "教务处副处长",
            tele: "024-23891001"
          },
          {
            department: "教务处副处长",
            tele: "024-83673895"
          },
          {
            department: "教学管理科",
            tele: "024-83681251"
          },
          {
            department: "考试考务管理科",
            tele: "024-83689990"
          },
          {
            department: "学籍学位管理科",
            tele: "024-83680898"
          },
          {
            department: "教学研究科",
            tele: "024-83687368"
          },
          {
            department: "浑南综合办",
            tele: "024-83656066"
          },
          {
            department: "工程训练中心",
            tele: "024-83676810"
          },
          {
            department: "教学督导办",
            tele: "024-83680260"
          }
        ]
      })
    } else if (placename == '招生办') {
      _this.setData({
        data: [{
            department: "艺术学院",
            tele: "024-83687134"
          },
          {
            department: "资土学院",
            tele: "024-83687121"
          },
          {
            department: "冶金学院",
            tele: "024-83687735"
          },
          {
            department: "机械与自动化学院",
            tele: "024-83687615"
          },
          {
            department: "信息学院",
            tele: "024-83681695"
          },
          {
            department: "材料学院",
            tele: "024-83691991"
          },
          {
            department: "理学院",
            tele: "024-83687650"
          },
          {
            department: "外国语学院",
            tele: "024-83687781"
          },
          {
            department: "体育部",
            tele: "024-83689889"
          },
          {
            department: "机器人学院",
            tele: "024-83696512"
          },
          {
            department: "计算机学院",
            tele: "024-83682129"
          },
          {
            department: "中荷学院",
            tele: "024-83684651"
          },
          {
            department: "软件学院",
            tele: "024-83681956"
          },
          {
            department: "工商管理学院",
            tele: "024-83672651"
          },
          {
            department: "文法学院",
            tele: "024-83688313"
          },
          {
            department: "生科学院",
            tele: "024-83656120"
          },
          {
            department: "江河建筑学院",
            tele: "024-83691508"
          },
          {
            department: "马克思主义学院",
            tele: "024-83656133"
          },
          {
            department: "计算中心",
            tele: "024-83687603"
          },
          {
            department: "国防教育学院",
            tele: "024-83681885"
          },
          {
            department: "国际交流学院",
            tele: "024-83687293"
          },
        ]
      })
    } else if (placename == '财务处') {
      _this.setData({
        data: [{
            department: "处领导",
            tele: "024-83687501"
          },
          {
            department: "计划管理科",
            tele: "024-83687504"
          },
          {
            department: "会计核算中心",
            tele: "024-83689552"
          },
          {
            department: "科研经费服务中心",
            tele: "024-83687502"
          },
          {
            department: "财务管理科",
            tele: "024-83687503"
          },
          {
            department: "人员经费管理科",
            tele: "024-83687506"
          },
          {
            department: "经费监管中心",
            tele: "024-83673688"
          },
          {
            department: "后勤资金管理科",
            tele: "024-83690512"
          },
          {
            department: "浑南校区财务综合办公室",
            tele: "024-83656063"
          }
        ]
      })
    } else if (placename == '审计处') {
      _this.setData({
        data: [{
          department: "东北大学审计处",
          tele: "024-83687439"
        }]
      })
    } else if (placename == '公安处(南湖)') {
      _this.setData({
        data: [{
            department: "保卫科",
            tele: "024-83671407"
          },
          {
            department: "北门",
            tele: "024-83678351"
          },
          {
            department: "东门",
            tele: "024-83678354"
          },
          {
            department: "户籍管理",
            tele: "024-83678262"
          },
          {
            department: "交警科",
            tele: "024-83671409"
          },
          {
            department: "南门",
            tele: "024-83678353"
          },
          {
            department: "校卫队",
            tele: "024-83678385"
          },
          {
            department: "值班室",
            tele: "024-83687777"
          },
          {
            department: "治安科",
            tele: "024-83671408"
          },
          {
            department: "综合科",
            tele: "024-83681689"
          },
        ]
      })
    } else if (placename == '宣传部') {
      _this.setData({
        data: []
      })
    } else if (placename == '学生工作处') {
      _this.setData({
        data: []
      })
    } else if (placename == '党委办公室') {

    } else if (placename == '保密办') {
      _this.setData({
        data: []
      })
    } else if (placename == '国际处') {
      _this.setData({
        data: []
      })
    } else if (placename == '后勤管理处') {
      _this.setData({
        data: []
      })
    } else {
      console.log("place name is an error!");
    }


    console.log(this.data.data)
  },

  bind: function(e) {
    console.log(e);
    let _this = this;
    let count = e.target.id;
    wx.makePhoneCall({
      phoneNumber: _this.data.data[count].tele,
      success: function(res) {
        console.log("success")
      },
      fail: function(res) {},
      complete: function(res) {
        console.log("complete")
      }
    })
  }
})