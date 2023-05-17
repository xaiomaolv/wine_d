// components/popup/popup.js
// 弹窗组件的 js 文件
Component({
  properties: {
    content: {
      type: String,
      value: ''
    },
    // maxHeight: {
    //   type: Number,
    //   value: 400 // 默认最大高度为 400px
    // }
  },
  data: {
    modalHeight: 0,
    showPopup: false,
    maxHeight:500
  },
  methods: {
    onModalTap() {
      // 防止点击弹窗内容时关闭弹窗
    },
    updateModalHeight() {
      let that = this
      // 使用 wx.createSelectorQuery() 获取内容高度
      const query = wx.createSelectorQuery().in(that)
      query.select('.row-info').boundingClientRect(rect => {
        if (rect) {
          console.log(rect,'re');
          // 根据内容高度设置弹窗高度
          const contentHeight = rect.height
          const modalHeight = Math.min(contentHeight, that.data.maxHeight)
          console.log(modalHeight,'modalHeight');
          that.setData({
            modalHeight: Math.min(contentHeight, that.data.maxHeight)
          })
        }
      }).exec()
    },
    // 隐藏授权弹窗
    hideDialog() {
      this.setData({
        showPopup: false
      })
    },
    //显示授权弹窗
    showDialog() {
      this.setData({
        showPopup: true
      }),
      this.updateModalHeight()
    },
  },
  lifetimes: {
    ready() {
      // 页面加载时更新弹窗高度
      this.updateModalHeight()
    }
  }
})