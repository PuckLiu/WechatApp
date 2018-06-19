// pages/pics/pics.js.js
const app = getApp()
var isLoop = true;
var isControls = true;
var pause = false;
let col1H = 0;
let col2H = 0;
let lastOffY = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    imagesurls: [],
    btnplayimage: "../../resources/pause.png",
    showbutton: true,
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    col1: [],
    col2: []
  },
  //开始播放
  audioPlay: function () {
    if (app.globalData.g_isPalyingMusic) {
      app.globalData.g_isPalyingMusic = false;
      this.changebtnbg(true);
      wx.pauseBackgroundAudio();
    } else {
      app.globalData.g_isPalyingMusic = true;
      this.changebtnbg(false);
      wx.playBackgroundAudio();
    }
  },
  //手动暂停或者播放
  pausePlay: function(pause) {
    app.globalData.g_isPalyingMusic = !pause;
    this.changebtnbg(pause);
    if (pause) {
      wx.pauseBackgroundAudio();
    } else {
      wx.playBackgroundAudio();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
      }
    })

    // var that = this;
    // wx.playBackgroundAudio({
    //   dataUrl: app.globalData.g_music_url,
    //   title: app.globalData.g_music_title,
    //   coverImgUrl: app.globalData.g_music_cover,
    //   success: function (res) {
    //     console.log("music success");
    //     // console.log(res);
    //     app.globalData.g_isPalyingMusic = true;
    //     // console.log(app.globalData.g_isPalyingMusic);
    //   },
    //   fail: function (res) {
    //     console.log("music failed");
    //     console.log(res);
    //     app.globalData.g_isPalyingMusic = false;
    //   }
    // })
    this.checkNetWork();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /*网络环境判断*/
  checkNetWork: function() {    
    let that = this;
    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType
        if(networkType != 'wifi') {
          that.pausePlay(true);
          console.log(networkType)
          wx.showModal({
            title: '提示',
            content: '这些图片需要消耗大量流量，建议开启wifi再打开~',
            cancelText: '算了',
            confirmText: '继续浏览',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.startLoadImages();
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })  
        } else {
          that.startLoadImages();
        }
      },
    })
  },
  /*开始加载图片*/
  startLoadImages: function() {
    if (app.globalData.g_images) {
      this.loadImages(app.globalData.g_images);
      this.changeNavTitle();
      this.startAudio();
    } else {
      //请求成功后，回调
      app.imagesReadyCallback = res => {
        var imgurls = res.data.imagelist;
        var music = res.data.musicurl;
        console.log("music >>>>" + music);
        console.log("gloable music >>>>" + app.globalData.g_music_url);
        this.loadImages(imgurls);
        this.changeNavTitle();
        this.startAudio();
      }
    }
  },
  startAudio: function() {
    wx.playBackgroundAudio({
      dataUrl: app.globalData.g_music_url,
      success: function (obj) {
        console.log("music play second success");
        console.log(obj);
      },
      fail: function (obj) {
        console.log("music play second fail");
        console.log(obj);
      }
    })
  },
  onImageUnLoad: function(e) {

  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }
    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);

  },
  loadImages: function (pimages) {
    if (pimages == null || pimages.length <= 0) {
      return;
    }
    
    let images = pimages;
    let baseId = "img-" + (new Date());
    let urls = [];
    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
      images[i].height = 0;
      urls.push(images[i].pic);
    }

    this.setData({
      loadingCount: images.length,
      images: images,
      imagesurls: urls
    });
  },
  /**   
     * 预览图片  
     */
  previewimage: function (e) {
    var current = e.target.dataset.src;
    let urls = [];
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imagesurls // 需要预览的图片http链接列表  
    })
  },
  changebtnbg: function (play) {
    let imgsrc = "../../resources/play.png";
    if (!play) {
      imgsrc = "../../resources/pause.png";
    } this.setData({
      btnplayimage: imgsrc
    });
  },
  changeNavTitle: function () {
    var navtitle = "噗哈相册";
    if (app.globalData.g_nav_title) {
      navtitle = app.globalData.g_nav_title;
    }
    wx.setNavigationBarTitle({
      title: navtitle,
    })
  }

})