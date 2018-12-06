Page({

  data: {

  },

  onLoad: function (options) {
    if (options.url) {
      this.setData({
        url: options.url
      })
    }
  },
})