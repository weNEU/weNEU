// pages/ipgw/ipgw.js
Page({

  data: {
    checked: true,
    status: "未连接",
    response: '',
    saveme: true,
    info_arr: [],
    info_str: '',
    time: '',
    usedtime: "",
    use: '',
    money: '',
    addressip: '',
    popupVisible: false,
    logout_state: false,
    username: '',
    password: '',
    action: 'login',
    ac_id: "1",
    user_mac: "",
    user_ip: "",
    nas_ip: "",
    url: ""
  },
  
  connect_wifi: function(){
    wx.startWifi({
      success(res) {
        console.log(res.errMsg);

        wx.connectWifi({
          SSID: 'NEU',
          BSSID: '',
          password: '',
          success(res) {
            console.log(res.errMsg)
          }
        });
      }
    });

    loginIn();
  },

  change_input: function (e) {
    this.setData({
      username: e.detail.value
    })
    console.log(this.username)
  },

  onReady: function () {
    let _this = this
    const ready_username = wx.getStorageSync("ipgw_username")
    if (ready_username) {
      let ipgw_username = wx.getStorageSync("ipgw_username")
      let ipgw_password = wx.getStorageSync("ipgw_password")
      _this.setData({
        username: ipgw_username,
        password: ipgw_password
      })
      console.log(_this.data.username);
      console.log(_this.data.password);
      _this.upload();
    }
  },

  useridInput: function (e) {
    this.setData({
      username: e.detail
    })
    console.log(this.data.username)
  },

  passwdInput: function (e) {
    this.setData({
      password: e.detail
    })
  },

  format_time: function (sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 3600 % 60;
    var out = "";
    if (h < 10) {
      out += "0" + h + " : ";
    }
    else {
      out += h + " : ";
    }

    if (m < 10) {
      out += "0" + m + " : ";
    }
    else {
      out += m + " : ";
    }

    if (s < 10) {
      out += "0" + s + "";
    }
    else {
      out += s + "";
    }
    return out;
  },

  format_flux: function (byte)//格式化流量
  {
    if (byte > (1024 * 1024 * 1024))
      return (this.format_number((byte / (1024 * 1024 * 1024)), 2) + "G");
    if (byte > (1024 * 1024))
      return (this.format_number((byte / (1024 * 1024)), 2) + "M");
    if (byte > 1024)
      return (this.format_number((byte / 1024), 2) + "K");
    return byte + "b";
  },

  format_number: function (num, count) {
    var n = Math.pow(10, count);
    var t = Math.round(num * n);
    return t / n;
  },
  
  loginIn: function () {
    let _this = this;
    let loading = false;
    console.log(_this.username)
    console.log(_this.data.password)
    let the_data = { "username": _this.data.username, "password": _this.data.password, "action": "login" }
    let headers = {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,   image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      "Pragma": "no-cache",
      "Upgrade-Insecure-Requests": "1",
    }
    wx.showLoading({
      title: '正在加载....',
    })
    wx.request({
      url: 'https://ipgw.neu.edu.cn/srun_portal_pc.php?ac_id=3&url=http://www.msftconnecttest.com/redirect',
      header: headers,
      method: 'POST',
      data: the_data,
      success: function (res) {
        if (res.data.indexOf("已经") >= 0) {
          wx.showToast({
            title: '你已经在线了',
            icon: 'success',
            duration: 2000
          })
        }
        else {
          let true_password = _this.data.password;
          let true_username = _this.data.username;
          wx.setStorageSync("ipgw_username", true_username)
          wx.setStorageSync("ipgw_password", true_password)
          console.log(wx.getStorageSync("ipgw_username"))
          setTimeout(function () {
            _this.upload()
          }, 1500)
        }

      },
      complete: function () {
        wx.hideLoading();
      }

    })
  },
  
  upload: function () {
    let _this = this;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    }
    wx.request({
      url: "https://ipgw.neu.edu.cn/include/auth_action.php",
      header: headers,
      data: {
        "action": "get_online_info",
      },
      method: "POST",
      success: function (res) {
        let ipgw_data = res.data;
        let ipgw_array = ipgw_data.split(",");
        let ipgw_use = "" + parseInt(ipgw_array[0].substring(0, 5)) + "." + ipgw_array[0].substring(5, 7) + "M"
        let ipgw_money = "￥" + ipgw_array[2]
        let ipgw_address = ipgw_array[5]
        let ipgw_usedtime = _this.format_time(parseInt(ipgw_array[1]))
        console.log(ipgw_address)
        console.log(ipgw_array[5])
        _this.use = ipgw_use;
        console.log(_this.use)
        _this.setData({
          'use': ipgw_use,
          'money': ipgw_money,
          'addressip': ipgw_address,
          'status': "已连接",
          "usedtime": ipgw_usedtime
        })

        console.log(ipgw_array[1])
        console.log(ipgw_data);
      },
    })
  },

  loginOut: function () {
    let _this = this;
    let logout_data = {
      "action": "logout",
      "username": _this.data.username,
      "password": _this.data.password,
      "ajax": "1"
    }
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    wx.request({
      url: 'https://ipgw.neu.edu.cn/include/auth_action.php',
      header: headers,
      data: logout_data,
      method: 'POST',
      success: function (res) {
        _this.setData({
          status: "未连接",
          use: "",
          money: "",
          addressip: "",
          usedtime: "",
        })
      },
      error: function () {
        MessageBox('提示', '您未曾连接到网络')
      }
    })
  }
})