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
    // },
    searchScrollList: {
      type: '',
      value: ''
    },
  },
  data: {
    modalHeight: 10,
    showPopup: false,
    maxHeight: 500,
    active: 0,
    currentTab: 0,
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
  // created() {
  //   let that = this
  //   that.scrollX = that.selectComponent(".scrollX");
  // },
  methods: {
    onModalTap() {
      // 防止点击弹窗内容时关闭弹窗
    },
    updateModalHeight() {
      let that = this
      // 使用 wx.createSelectorQuery() 获取内容高度
      const query = wx.createSelectorQuery().in(that)
      query.select('#content').boundingClientRect(rect => {
        if (rect) {
          console.log(rect, 're');
          // 根据内容高度设置弹窗高度
          const contentHeight = rect.height
          const modalHeight = Math.min(contentHeight, that.data.maxHeight)
          console.log(modalHeight, 'modalHeight');
          that.setData({
            modalHeight: Math.min(contentHeight, that.data.maxHeight)
          })
        }
      }).exec()
    },
    // 隐藏弹窗
    hideDialog() {
      this.setData({
        showPopup: false,
        modalHeight: 0
      })
    },
    //显示弹窗
    showDialog() {
      this.setData({
          showPopup: true
        }),
        this.updateModalHeight()
    },
    // 顶部导航切换
    currentTab: function (e) {
      if (this.data.currentTab == e.currentTarget.dataset.idx) {
        return;
      }
      this.setData({
        currentTab: e.currentTarget.dataset.idx,
        modalHeight:10
      })
      this.updateModalHeight()
      // this.getList(this.data.currentTab)
    },
    /**
     * 选择切换 
     */
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
    }
  },
  lifetimes: {
    ready() {
      // // 页面加载时更新弹窗高度
      // this.updateModalHeight()
      // console.log(this.data.modalHeight, 'rady');
    },
    created() {
      let that = this
      that.scrollX = that.selectComponent(".scrollX");
    },
  }
})