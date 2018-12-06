Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    data: [{},
      {id: "1", title: "Sample", date: "2018-10-01", content: "" }]
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
  },
})