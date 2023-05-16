// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['所有葡萄酒', '我的葡萄酒'],
    currentTab: 0,
    isSearch: false, // 是否搜索
    hot_list: [{
        name: '西班牙'
      },
      {
        name: '西瓜'
      },
      {
        name: '西西'
      },
      {
        name: '赤霞珠'
      },
      {
        name: '意大利'
      },
      {
        name: '奔赴'
      },
      {
        name: '梅罗'
      },
      {
        name: '莫里斯'
      },
      {
        name: '香贝'
      },
      {
        name: '德国'
      },
      {
        name: '意大利'
      },
      {
        name: '土耳其'
      },
    ],
    list: [],
    filterList: [],
    search: null // 搜索输入内容
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
    if (wx.getStorageSync('search_history')) {
      this.setData({
        list: JSON.parse(wx.getStorageSync('search_history')).slice(0, 8)
      })
    }
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
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    // this.getList(this.data.currentTab)
  },
  getData(e) {
    this.setData({
      isSearch: true
    })
    let data = e.detail.value.replace(/(^\s*)|(\s*$)/g, ""); //去掉前后的空格
    if (data.trim() != '') {
      this.data.list.forEach((key, index) => {
        if (key == data) {
          this.data.list.splice(index, 1);
        }
      })
      this.data.list.unshift(data);
      this.setData({
        list: this.data.list.slice(0, 8)
      })
      wx.setStorageSync('search_history', JSON.stringify(this.data.list))
    }
  },
  clear_input() {
    this.setData({
      search: '',
      filterList: [],
      isSearch: false
    })
  },

  getSearch(e) {
    let {
      index
    } = e.currentTarget.dataset, {
      hot_list
    } = this.data;
    let va = hot_list[index]
    this.setData({
      search: va.name,
      isSearch: true
    })
    // 将标签存到历史搜索中
    this.data.list.forEach((item, index) => {
      if (item == va) {
        this.data.list.splice(index, 1);
      }
    })
    this.data.list.unshift(va);
    this.setData({
      list: this.data.list.slice(0, 8)
    })
    wx.setStorageSync('search_history', JSON.stringify(this.data.list))
  },
  //清空历史
  clearHistory() {
    this.setData({
      list: [],
    })
    wx.removeStorageSync('search_history')
  },
  getSearchOne(e) {
    console.log(e,'eeeeeee');
    let {
      index
    } = e.currentTarget.dataset, {
      list
    } = this.data;
    let va = list[index]
    this.setData({
      search: va.name,
      isSearch: true
    })
    this.data.list.forEach((item, index) => {
      if (item == va) {
        this.data.list.splice(index, 1);
      }
    })
    this.data.list.unshift(va);
    this.setData({
      list: this.data.list.slice(0, 8)
    })
    console.log(this.data.list)
    wx.setStorageSync('search_history', JSON.stringify(this.data.list))
  },
  // 
  getValue(e) {
    console.log(e,'value');
    let val = e.detail.value;
    if (val) {
      this.setData({
        search: val,
        isSearch: true
      })
      if (val.length > 0) {
        let arr = [];
        for (let i = 0; i < this.data.hot_list.length; i++) {
          if (this.data.hot_list[i].name.indexOf(val) > -1) {
            arr.push({
              name: this.data.hot_list[i].name
            })
          }
        }
        this.setData({
          filterList: arr,
        }, () => {
          this.getHighlight(arr, val)
        })
      } else {
        this.setData({
          filterList: [],
        })
      }
    } else {
      this.setData({
        isSearch: false
      })
    }

  },
  /**
   * 关键字高亮处理
   * @param { String } datalist - 文本
   * @param { String } val - 关键字
   */
  getHighlight(datalist, val) {
    datalist.forEach(item => {
      let textList = item.name.split("");
      let keyList = val.split("");
      let list = [];
      for (let i = 0; i < textList.length; i++) {
        let obj = {
          set: false,
          val: textList[i]
        }
        list.push(obj);
      };
      for (let k = 0; k < keyList.length; k++) {
        list.forEach(i0 => {
          if (i0.val === keyList[k]) {
            i0.set = true;
          }
        })
      }
      item.list = list;
    });
    this.setData({
      filterList: datalist
    })
  },
  // 搜索详情跳转
  goSearchDetail(e){
    console.log('详情');
  },
})