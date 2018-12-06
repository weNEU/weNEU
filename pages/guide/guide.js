Page({

  data: {
    active: 0,
    active1: 0,
    imgalist: ['http://www.neualumni.org.cn/leader/logo4.gif', 'http://www.neualumni.org.cn/leader/logo1.gif', 'http://www.neualumni.org.cn/leader/logo2.gif', 'http://www.neualumni.org.cn/leader/logo3.gif', 'http://www.neu.edu.cn/assets/photo/photo_name.jpg', 'http://www.neualumni.org.cn/leader/q1.gif', 'http://www.neualumni.org.cn/leader/q2.gif', 'http://www.neualumni.org.cn/leader/VI1.gif', 'http://www.neualumni.org.cn/leader/VI2.gif', 'http://www.neualumni.org.cn/leader/VI3.gif', 'http://www.neualumni.org.cn/leader/VI4.gif']
  },

  previewImage: function(currenturl) {
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表   
    })
  },
})