// pages/scan/scan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photonHeight: 0,
    // 导航栏高度
    navHeight: app.globalData.navHeight,
    // 导航栏距离顶部距离
    navTop: app.globalData.navTop,
    // 胶囊的高度
    navObj: app.globalData.navObj,
    // 胶囊宽度+距右距离
    navObjWid: app.globalData.navObjWid,
    sShowCamera: false,
    width: 10,
    height: 10,
    src: "",
    image: "",
    skipphotoStatus: "0", // 1跳过 0没有跳过
    isShowImage: false,
    dataArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // mock数据
    dataLength: null,
    divsion: 4, // 三条数据一个swiper-item
    current: "",
    isFirst: false, //是否是第一次进入

  },
  /**
   * 拍照
   */
  takePhotoAction: function () {
    var that = this
    that.data.ctx.takePhoto({
      quality: 'high', //高质量
      success: (res) => {
        this.loadTempImagePath(res.tempImagePath);
      },
    })
  },
  // 图库选择
  chooseImg() {
    wx.chooseImage({
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },
  photohHistory() {
    console.log('历史记录');
  },
  loadTempImagePath: function (options) {
    var that = this
    that.path = options
    wx.getSystemInfo({
      success: function (res) {

        // 矩形的位置
        var image_x = 15;
        var image_y = 150;
        var image_width = that.data.width - 2 * 15;
        var image_height = 238;

        wx.getImageInfo({
          src: that.path,
          success: function (res) {
            that.setData({
              isShowImage: true,
            })
            that.canvas = wx.createCanvasContext("image-canvas", that)
            //过渡页面中，图片的路径坐标和大小
            that.canvas.drawImage(that.path, 0, 0, that.data.width, that.data.height)
            wx.showLoading({
              title: '数据处理中...',
              icon: 'loading',
              duration: 10000
            })
            // 这里有一些很神奇的操作,总结就是MD拍出来的照片规格居然不是统一的过渡页面中，对裁剪框的设定
            that.canvas.setStrokeStyle('black')
            that.canvas.strokeRect(image_x, image_y, image_width, image_height)
            that.canvas.draw()
            setTimeout(function () {
              wx.canvasToTempFilePath({ //裁剪对参数
                canvasId: "image-canvas",
                x: image_x, //画布x轴起点
                y: image_y, //画布y轴起点
                width: image_width, //画布宽度
                height: image_height, //画布高度
                destWidth: image_width, //输出图片宽度
                destHeight: image_height, //输出图片高度
                success: function (res) {
                  that.setData({
                    image: res.tempFilePath,
                  })
                  //清除画布上在该矩形区域内的内容。
                  // that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                  // that.canvas.drawImage(res.tempFilePath, image_x, image_y, image_width, image_height)
                  // that.canvas.draw()
                  wx.hideLoading()

                  console.log(res.tempFilePath);
                  //在此可进行网络请求
                  PublicJS.drivinglicenseUpload(res.tempFilePath, that.uploadFile);
                },
                fail: function (e) {
                  wx.hideLoading()
                  wx.showToast({
                    title: '出错啦...',
                    icon: 'loading'
                  })
                  if (this.data.skipphotoStatus == 1) {
                    wx.redirectTo({
                      url: 'addCarInfo/addCarInfo',
                    })
                  } else {
                    wx.navigateBack({
                      delta: 1
                    });
                  }
                }
              });
            }, 1000);
          }
        })
      }
    })
  },

  // 接口返回结果

  uploadFile: function (data) {},
  // 照相
  getPhoto() {
    // c创建相机上下文对象,获取唯一的相机对象
    var context = wx.createCameraContext()
    // 照相功能
    context.takePhoto({
      quality: "high",
      success: res => {
        // 照相成功的回调
        console.log(res); // 图片的信息
        this.setData({
          // 隐藏相机
          //  showCamera:false,
          imageUrl: res.tempImagePath,
          imgwidth: res.width,
          imgheight: res.height
        })
        console.log(this.data.imageUrl)
      },
      fail: () => {
        wx.showToast({
          title: '出现错误',
        })
      }
    })
  },

  // 相机前后镜头转换
  changePos() {
    this.setData({
      cameraPos: this.data.cameraPos == "back" ? "front" : "back"
    })
  },

  // 关闭相机
  goBack() {
    this.setData({
      showCamera: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // let divsion = this.data.divsion
    // let {
    //   dataArr
    // } = this.data;
    // let dataLength = (dataArr.length % divsion === 0) ? (dataArr.length / divsion) : ((dataArr.length / divsion) + 1); // 计算分页数
    // this.setData({
    //   dataLength
    // });
    let {
      index
    } = options
    console.log(index)
    if (index != null) {
      this.setData({
        current: index,
      })
    }
    this.data.ctx = wx.createCameraContext()
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  tap(e) {
    console.log(e, 'eeee');
    let {
      index
    } = e.currentTarget.dataset;
    this.setData({
      current: index
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.hideTabBar({})
    console.log(app.globalData.statusBarHeight, 'app.globalData.statusBarHeight');
    this.setData({
      photonHeight: app.globalData.statusBarHeight + 80,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    wx.authorize({
      scope: 'scope.camera',
      success: function (res) {
        that.setData({
          isShowCamera: true,
        })
      },
      fail: function (res) {
        console.log("" + res);
        wx.showModal({
          title: '请求授权您的摄像头',
          content: '如需正常使用此小程序功能，请您按确定并在设置页面授权用户信息',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  console.log('成功');
                  console.log(res);
                  if (res.authSetting['scope.camera']) { //设置允许获取摄像头
                    console.log('设置允许获取摄像头')
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    that.setData({
                      isShowCamera: true,
                    })

                  } else { //不允许
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                    wx.redirectTo({
                      url: 'addCarInfo/addCarInfo',
                    })
                  }
                }
              })
            } else { //取消
              wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1000
              })
              wx.redirectTo({
                url: 'addCarInfo/addCarInfo',
              })
            }
          }
        })

      }
    })
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
  // 返回
  handleBackClick() {
    wx.switchTab({
      url: '/pages/home/home',
    })
    // const pages = getCurrentPages();
    // if (pages.length >= 2) {
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // } else {
    //   wx.switchTab({
    //     url: '/pages/home/home',
    //   })
    // }
  },
})