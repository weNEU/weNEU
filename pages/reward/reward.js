// pages/ds/ds.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgalist: ['https://ws3.sinaimg.cn/large/006tNbRwly1fxrpgmz0asj30tc0tcq64.jpg']
  },
  previewImage: function () {
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表   
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  }
})