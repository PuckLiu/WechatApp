// pages/albums/albums.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 600,
    imgWidth:0,
    imgH:0,
    albumTitleH:0,
    albums: [
    ],
    albumleft:[],
    albumright:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.40;
        let imgHeight = imgWidth *1.0;
        let albumTitleH = ww * 0.12;
        let scrollH = wh;
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth,
          imgH:imgHeight,
          albumTitleH:albumTitleH
        });
      }
    })

    this.onStartLoadAlbums();
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
    console.log("albums pages onhide");
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
  
  onStartLoadAlbums: function() {
    if (app.globalData.g_albums) {
      console.log("already get albums data");
      this.handleAlbumsData(app.globalData.g_albums);
      console.log(app.globalData.g_albums);
    } else {
      app.albumFetchCallback = res => {
        console.log("callback get albums data");
        console.log(app.globalData.g_albums);
        this.handleAlbumsData(app.globalData.g_albums);
      }
    }

  },

  handleAlbumsData: function(albums) {
    let left = this.data.albumleft;
    let right = this.data.albumright;
    for (let i = 0; i < albums.length; i++) {
      let img = albums[i];
      img.id = i;
      if (i % 2 == 0) {
        left.push(img);
      } else {
        right.push(img);
      }
    }
    this.setData({
      albums: albums,
      albumleft: left,
      albumright: right
    })
  },

  albumCorverLoad: function (e) {
    let imageW = e.detail.width;
    let imageH = e.detail.height;
  },
  albumClicked: function (e) {
    let title = e.currentTarget.dataset.name;
    let iindex = e.currentTarget.dataset.index;
    var albumurl = e.currentTarget.dataset.albumurl;
    wx.navigateTo({
      url: '../pics/pics?albumUrl=' + albumurl,
    })
  }
})