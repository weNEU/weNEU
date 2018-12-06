Page({

  data: {
    balance: '',
    cardID: '',
    name: '',
    record: [],
    page: '',
    passwd: ''
  },

  onReady: function() {
    var $this = this;
    this.setData({
      cardID: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass_ykt')
    });

    wx.request({
        url: 'https://neuvwo.com/mini/api/getCardInfo',
        data: {
          'stuID': $this.data.cardID,
          'cardPass': $this.data.passwd,
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          $this.setData({
            balance: res.data.data.balance,
            name: res.data.data.name,
            cardID: res.data.data.stuID
          });
          console.log("balance: " + res.data.data.balance);
        }
      }),

      wx.request({
        url: 'https://neuvwo.com/mini/api/getRecord',
        data: {
          'stuID': $this.data.cardID,
          'cardPass': $this.data.passwd,
          'mode': '1'
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          $this.setData({
            record: res.data.data,
            page: res.data.data.length
          });
          // for (var i=0; i<$this.data.record.length; i++){
          //   $this.data.record[i].reverse();
          // };
          console.log(res);
        }
      })
  },
})