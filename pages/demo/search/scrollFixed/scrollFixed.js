// pages/search/scrollFixed/scrollFixed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNav1:[
      {
        "imageUrl":"/img/sy.jpg",
        "text":"社区供销",
      },{
        "imageUrl":"/img/sy.jpg",
        "text":"每日生鲜"
      },{
        "imageUrl":"/img/sy.jpg",
        "text":"县长带货"
      },
      {
        "imageUrl":"/img/sy.jpg",
        "text":"周边找店"
      },
      {
        "imageUrl":"/img/sy.jpg",
        "text":"小管家"
      } ]
  },
  onPageScroll(e){
    //console.log(e)
    //获取滚动距离
    let _this = this;
     let Top = e.scrollTop;
    //console.log(e.scrollTop);
    //console.log(Top);
    //将滚动距离（位移）动态添给滚动条的Top
    _this.setData({
      scrollTop:Top
   })
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

  }
})