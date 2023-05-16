// app.js
import {
  initPage,
  onPageLoad
} from './utils/page'
import request from './utils/request'
import util from './utils/util'
App({
  onLaunch() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
        console.log(res, 'res');
        // 导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          // 胶囊按钮与右侧的距离=windowWidth-right+胶囊宽度
          navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;//导航栏总体高度
        this.globalData.navTop = navTop;//胶囊距离顶部距离
        this.globalData.navObj = menuButtonObject.height;//胶囊高度
        this.globalData.navObjWid = navObjWid;//胶囊宽度（包括右边距离)
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.statusBarHeight = res.statusBarHeight;
      }
    })
    // 重构Page对象
    initPage(this)
  },
   // 挂载全局request，使用app.request 替代wx.request
   ...request,
   // 挂载全局工具类
   ...util,
   setCode(code) {
    wx.setStorageSync('code', code)
  },
  getCode() {
    return wx.getStorageSync('code')
  },
  // 是否开启logger
  loggerEnable: true,
  openid: null,
  globalData: {
    statusBarHeight: 0,
  }
})
// api需要等待app初始化完成
getApp().api = require('./api/api').default