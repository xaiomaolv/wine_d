// pages/search/searchDetail/searchDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceRange: [0, 20000],
    switchChecked: false,
    sortValue: '',
    // 排序选择list
    sortArray: ["综合排序", "高分优先", "高价优先", "低分优先"],
    sortndex: '0',
    showSort: false,
    // 搜索详情
    showSeach: false,
    height: 0,
    maxHeight: '400',
    content: '这是一段非常长的文本，可能会超出弹窗最大高度。',
    searchScrollList: [{
        id: 88,
        name: '类型',
        icon: '/img/search/style.png',
        iconActive: '/img/search/style.png',
      },
      {
        id: 1,
        name: '场地',
        icon: '/img/search/origin.png',
        iconActive: '/img/search/origin-a.png',
      },
      {
        id: 2,
        name: '葡萄',
        icon: '/img/search/grape.png',
        iconActive: '/img/search/grape.png',
      },
      {
        id: 3,
        name: '风格',
        icon: '/img/search/style.png',
        iconActive: '/img/search/style.png',
      },
      {
        id: 4,
        name: '口味',
        icon: '/img/search/flavour.png',
        iconActive: '/img/search/flavour.png',
      },
      {
        id: 5,
        name: '年份',
        icon: '/img/search/vintage.png',
        iconActive: '/img/search/vintage.png',
      },
      {
        id: 5,
        name: '评分',
        icon: '/img/search/zj.png',
        iconActive: '/img/search/zj.png',
      },
      {
        id: 6,
        name: '特色',
        icon: '/img/search/zj.png',
        iconActive: '/img/search/zj.png',
      },
      {
        id: 7,
        name: '搭配',
        icon: '/img/search/zj.png',
        iconActive: '/img/search/zj.png',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this
    that.popup = that.selectComponent(".popup");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // nav-bar左侧返回
  onClickLeft() {
    wx.reLaunch({
      url: '/pages/search/search',
    })
    console.log('返回');
  },
  // nav-bar右侧按钮
  onClickRight() {
    console.log('信息');
  },

  // 双滑块左移动
  changeStart(e) {
    // console.log(e);
  },
  // 双滑块右移动
  changeEnd(e) {
    // console.log(e);
  },
  // 双滑块-slider - change
  onChanged(e) {
    console.log(e, 'ddddd');
    this.setData({
      priceRange: e.detail
    })
  },
  // 仅看可购买switch
  switchChange(e) {
    console.log(e, 'switch');
  },

  // 排序弹窗 
  changeSortPopup(e) {
    console.log(e, 'eee');
    this.setData({
      showSort: true
    })
  },
  // 确认
  bindSortChange(e) {},
  radioSortChange(e) {
    console.log(e, 'radio');
    this.setData({
      sortValue: e.detail.value,
      showSort: false
    })
  },
  // 关闭
  bindSortCancel(e) {
    this.setData({
      showSort: false
    })
  },

  // 搜素弹窗
  chooseSearch() {
    let that = this
    // this.setData({
    //   showSeach: true
    // })
    // setTimeout(function () {
    //   let query = wx.createSelectorQuery();
    //   query.select('.popup-content').boundingClientRect(rect => {
    //     console.log(rect);
    //     const height = rect.height + 40; // 加上 padding 的高度
    //     that.setData({
    //       height: Math.min(height, that.data.maxHeight)
    //     });
    //   }).exec();
    // }, 100)
    that.popup.showDialog()
  },
  bindSearchCancel() {
    this.setData({
      showSeach: false,
      height: 0
    })
  },
  
})