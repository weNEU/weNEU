//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,
    isGra: 0
  },
  onReady: function(){
    var _this = this;
    wx.setStorage({
      key: 'isGra',
      data: 0,
    }) 
    if (app.Login == true) {
      wx.switchTab({
        url: '../index/index',
        success: function (e) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null)
            return;
          page.onReady();
        } 
      })
    }
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onLoad: function () {
  },
  switch2Change: function (e) {
    var _this =this
    if (e.detail.value){
    _this.setData({
      isGra: 1
    });
    wx.setStorage({
      key: 'isGra',
      data: 1,
    })  
    }else{
      _this.setData({
        isGra: 0
      });
      wx.setStorage({
        key: 'isGra',
        data: 0,
      })  
    }
    },
  bind: function() {
    var _this = this;
    if(!_this.data.userid || !_this.data.passwd){
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }
    var url = "";
    if (_this.data.isGra == 0) {
      url = 'https://neuvwo.com/mini/api/loginAAO';
    }else{
      url = 'https://neuvwo.com/mini/postgraduate/api/bind';
    }
    app.showLoadToast('绑定中');
    wx.request({
      method: 'POST',
      url: url,
      data: ({
        stuID: _this.data.userid,
        stuPass: _this.data.passwd
      }),
      success: function(res){
        console.log(res.data);
        if(res.data.data  === 'success'){
          wx.showToast({
            title: '请稍候',
          })
          //清除缓存
          // wx.removeStorageSync('stuID');
          // wx.removeStorageSync('stuPass');
          wx.setStorage({
             key: 'stuID',
             data: _this.data.userid
         }),
          wx.setStorage({
              key: 'stuPass',
              data: _this.data.passwd
          })
          wx.switchTab({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) 
              return;
              page.onReady();
            } 
          })
        }else{
          wx.hideToast();
          app.showErrorModal("请核对学号/密码后重试", '绑定失败');
        }
       
      },
      fail: function(res){
        wx.hideToast();
        app.showErrorModal("服务器繁忙，请稍后再试", '绑定失败');
      }
      });
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    var num = 8;
    if (this.data.isGra == 1) 
      num = 7;
    if(e.detail.value.length >= num){
       wx.hideKeyboard();
    }
    
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': true
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': false
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function(e){
    if(e.target.id == 'help'){
      this.hideHelp();
    }
  },
  showHelp: function(e){
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e){
    this.setData({
      'help_status': false
    });
  }
});