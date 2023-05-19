Page({
  /**
   * 页面的初始数据
   */
  data: {
    showIndex:null,//打开弹窗的对应下标
    height:'',//屏幕高度
  },
  // 打开弹窗
  openPopup(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      showIndex:index
    })
  },
  //关闭弹窗
  closePopup(){
    this.setData({
      showIndex:null
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.windowHeight
        });
      },
    })
  },
})
