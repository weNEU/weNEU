import { $wuxDialog } from '../../dist/index'

Page({

  data: {

  },

  confirm() {
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '重置教务处账号',
      content: '你确定要重置教务处账号吗？(重置后请在手机后台关掉小程序并重新进入)',
      onConfirm(e) {
        console.log('确定！')
        wx.clearStorage()
        wx.switchTab({
          //传递参数方式向get请求拼接参数一样
          url: '/pages/login/login',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null)
              return;
            page.onReady();
          } 
        })
      },
      onCancel(e) {
        console.log('取消')
      },
    })
  },
  confirm1() {
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '重置图书馆账号',
      content: '你确定要重置图书馆账号吗？',
      onConfirm(e) {
        wx.removeStorage({
          key: 'stuPass_lib',
          success: function(res) {},
        })
        console.log('确定！')
        wx.redirectTo({
          //传递参数方式向get请求拼接参数一样
          url: '/pages/login_lib/login_lib'
        })
      },
      onCancel(e) {
        console.log('取消')
      },
    })
  },
  confirm2() {
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '重置一卡通账号',
      content: '你确定要重置一卡通账号吗？',
      onConfirm(e) {
        wx.removeStorage({
          key: 'stuPass_ykt',
          success: function (res) { 
          },
        })
        console.log('确定！')
        wx.redirectTo({
          //传递参数方式向get请求拼接参数一样
          url: '/pages/login_ykt/login_ykt'
        })
      },
      onCancel(e) {
        console.log('取消')
      },
    })
  },
  confirm3() {
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '清空缓存',
      content: '你确定要清空缓存吗？',
      onConfirm(e) {
        wx.clearStorage(),
        console.log('确定！'),
        wx.switchTab({
          url: '../index/index',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onshow();
          }
        }) 

      },
      onCancel(e) {
        console.log('取消')
      },
    })
  }
})