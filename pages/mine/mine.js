// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diseaseList: [{
        diseaseCode: "S90.8",
        diseaseName: "踝和足的其他浅表损伤",
        checked: false
      },
      {
        diseaseCode: "R05",
        diseaseName: "咳嗽",
        checked: false
      },
      {
        diseaseCode: "P29.3",
        diseaseName: "胎儿循环存留",
        checked: false
      },
      {
        diseaseCode: "J39.9",
        diseaseName: "上呼吸道疾病，未特指",
        checked: false
      },
      {
        diseaseCode: "J31.0",
        diseaseName: "慢性鼻炎",
        checked: false
      },
      {
        diseaseCode: "A37.1",
        diseaseName: "由于副百日咳博德特杆菌引起的百日咳",
        checked: false
      },
      {
        diseaseCode: "N32.1",
        diseaseName: "膀胱肠瘘",
        checked: false
      },
      {
        diseaseCode: "C17.3",
        diseaseName: "麦克尔憩室",
        checked: false
      },
      {
        diseaseCode: "A16.9",
        diseaseName: "未特指的呼吸道结核病，未提及细菌学或组织学的证实",
        checked: false
      },
      {
        diseaseCode: "A16.1",
        diseaseName: "肺结核病，未做细菌学和组织学检查",
        checked: false
      }
    ]
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

  },
  diseaseSwitch: function (options) {
    let that = this;
    // 按钮索引
    var index = options.currentTarget.dataset.index;
    // 索引对应内容
    var item = that.data.diseaseList[index];
    // 选中，未选中状态切换
    item.checked = !item.checked;
    // 更新
    that.setData({
      diseaseList: that.data.diseaseList
    });
  },
})