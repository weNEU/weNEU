// pages/Help/help.js
Page({

  data : {
    items: [
      {
        title: "借阅信息有误",
        created_at: "2018-9-13",
        content: "请在 “我-系统设置” 界面内重置图书馆密码",
        active: false,
        height: 0
      },
      {
        title: "“我”界面个人信息无法显示",
        created_at: "2018-9-13",
        content: "请下拉刷新重试",
        active: false,
        height: 0
      },
      {
        title: "信息有误或不显示信息",
        created_at: "2018-9-12",
        content: "请下拉刷新重试",
        active: false,
        height: 0
      },
      {
        title: "账号无法绑定",
        created_at: "2018-9-12",
        content: "请检查密码是否匹配。教务处默认密码与学号相同，图书馆默认密码是学号后六位，一卡通默认密码是身份证号后六位",
        active: false,
        height: 0
      },
      {
        title: "我是研究生",
        created_at: "2018-9-12",
        content: "研究生已经适配完毕，您可以使用小程序的全部功能！",
        active: false,
        height: 0
      },
      {
        title: "电视墙看不了？",
        created_at: "2018-9-12",
        content: "请在校园网环境下打开，电视墙是免流量的呦！",
        active: false,
        height: 0
      },	  
    ]
  },
  
  onLoad: function (options) {

  },

  active: function(e) {
    console.log(e);


    let i = e.currentTarget.id;
    console.log(i);
    let _this = this;
    wx.showModal({
      title: _this.data.items[i].title, //提示的标题,
      content: _this.data.items[i].content, //提示的内容,
      showCancel: false, //是否显示取消按钮,
      confirmText: '已阅读', //确定按钮的文字，默认为取消，最多 4 个字符,
      confirmColor: '#3CC51F', //确定按钮的文字颜色,
      success: res => { }
    });
  },
  
  to: function() {
    wx.showModal({
      title: "提示", //提示的标题,
      content: "请加入QQ群 721423324 提出您的宝贵建议哟", //提示的内容,
      showCancel: false, //是否显示取消按钮,
      confirmText: '已阅读', //确定按钮的文字，默认为取消，最多 4 个字符,
      confirmColor: '#3CC51F', //确定按钮的文字颜色,
      success: res => { }
    });
    // wx.navigateTo({ url: "/pages/my/feedback" });
  },
})