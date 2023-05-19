// components/loginPopup/loginPopup/loginPopup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showLoginPopup: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏弹窗
    hidePopup() {
      this.setData({
        showLoginPopup: false
      })
    },
    //显示弹窗
    showPopup() {
      this.setData({
        showLoginPopup: true
      })
    },
    // 关闭弹窗
    bindLoginCancel() {
      this.setData({
        showLoginPopup: false
      })
    }
  }
})