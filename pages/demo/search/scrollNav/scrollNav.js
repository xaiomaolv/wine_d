// pages/search/scrollNav/scrollNav.js
Page({
  data: {
    height: 0,         //页面高度 rpx
    ratio: 0,          //rpx,px转化比
    xId: 1,           //x轴选中项
    yId: 1,           //y轴滚动位置
    heightArray: [],
    list: [{
        id: 1,
        title: "前端",
        photo: [
          '/img/icbc.png',
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg",
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg",
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg"        ],
      },
      {
        id: 2,
        title: "后端",
        photo: [
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg",
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg"
        ],
      },
      {
        id: 3,
        title: "小程序",
        photo: [
          "https://www.tpxhm.com/static/uploads/note/20190103/7c754f8e3362d0fa5a4f6be71818b35e.jpg",
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg"
        ],
      },
      {
        id: 4,
        title: "PHP",
        photo: [
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg",
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg",
        ],
      },
      {
        id: 5,
        title: "JAVA",
        photo: [
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg",
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg"
        ],
      },
      {
        id: 6,
        title: "GO",
        photo: [
          "https://www.tpxhm.com/static/uploads/note/20190103/7c754f8e3362d0fa5a4f6be71818b35e.jpg",
          "https://www.tpxhm.com/static/tpl/index/foundation/images/bgtx.jpg"
        ],
      },
    ]
  },
 
  onLoad: function (options) {
    console.log(222)
    let that = this
    wx.setNavigationBarTitle({
      title: '相册页'
    })
    //1. 获取页面高度
    wx.getSystemInfo({
      success: function (res) {
        let width = res.windowWidth
        let ratio = 750 / width
        let height = ratio * res.windowHeight
       
        that.setData({
          height: height, //单位rpx
          ratio: ratio
        })
      }
    })
  },
 
  onShow: function () {
    
    let that = this,
      heightArray = [];
    //1.获取滚动元素距离顶部位置-y
    setTimeout(function () {
      let query = wx.createSelectorQuery() //创建节点查询器
      query.selectAll('.column').boundingClientRect(function (rect) {
        rect.forEach(function (value) {
          heightArray.push((value.top - (170 / that.data.ratio)))
        })
        that.setData({
          heightArray
        })
      }).exec()
    }, 1000) //此处最好用延时，否则获取的结果有可能是null，也有可能值不准确。 
  },
//切换tab导航栏
  changeTab: function (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    that.setData({
      xId:id,
      yId:id,
    })
  },
 
  //监听滚动 切换tab
  scrollFloor: function (e) {
    var that = this
    var scrollTop = e.detail.scrollTop //滚动条距离顶部
    var heightArray = that.data.heightArray //滚动项距离顶部
    var id = null
    //计算比较得出下标
    for (let i = 0; i <= heightArray.length; i++) {
      if (scrollTop >= heightArray[i] - 90 && scrollTop < heightArray[i + 1]) {
        id = that.data.list[i].id
      }
    }
    that.setData({
      xId: id
    })
  },
})