// pages/search/components/scroll_x/scroll_x.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchScrollList: {
      type: Array,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseSearch() {
      let that = this
      that.popup.showDialog()
    }
  },
  lifetimes: {
    created() {
      let that = this
      that.popup = that.selectComponent(".popup");
    },
  }
})