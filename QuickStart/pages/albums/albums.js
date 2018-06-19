// pages/albums/albums.js
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
      { "id":"a1", "pic": "https://img.alicdn.com/imgextra/i4/828286880/TB2T637mndYBeNkSmLyXXXfnVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i4/828286880/TB2EunXa8gXBuNjt_hNXXaEiFXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i2/828286880/TB2Eg5njuuSBuNjy1XcXXcYjFXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2NX0lbhPI8KJjSspfXXcCFXXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i4/828286880/TB2ncpcbmYH8KJjSspdXXcRgVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i1/828286880/TB2JPJibbYI8KJjy0FaXXbAiVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i1/828286880/TB2wnFnbf6H8KJjSspmXXb2WXXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2hPVibbYI8KJjy0FaXXbAiVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i4/828286880/TB2PTJjbnnI8KJjy0FfXXcdoVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2uK4vbmfD8KJjSszhXXbIJFXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2e6SIXUo09KJjSZFDXXb9npXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i1/828286880/TB2hIVcbmYH8KJjSspdXXcRgVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2lZXibcjI8KJjSsppXXXbyVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i2/828286880/TB2kkplbh6I8KJjy0FgXXXXzVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2pG8dbnnI8KJjSszgXXc8ApXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i1/828286880/TB2mZhYeZyYBuNkSnfoXXcWgVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2s1cGX2fM8KJjSZPfXXbklXXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i1/828286880/TB21H4lbgnD8KJjy1XdXXaZsVXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i4/828286880/TB2WHhdbnnI8KJjSszgXXc8ApXa_!!828286880.jpg" },
      { "pic": "https://img.alicdn.com/imgextra/i3/828286880/TB2RU5lub5YBuNjSspoXXbeNFXa_!!828286880.jpg" }
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
        let albumTitleH = ww * 0.08;
        let scrollH = wh;
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth,
          imgH:imgWidth,
          albumTitleH:albumTitleH
        });
      }
    })

    let left = this.data.albumleft;
    let right = this.data.albumright;
    for (let i = 0;i < this.data.albums.length;i++) {
      let img = this.data.albums[i];
      img.id = "album"+i;
      img.title = "album_"+i;
      if (i % 2 == 0) {
        left.push(img);
      } else {
        right.push(img);
      }
    }
    this.setData ({
      albumleft: left,
      albumright: right
    })
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

  albumCorverLoad: function (e) {
    let imageW = e.detail.width;
    let imageH = e.detail.height;
    console.log(e.currentTarget.id);
    console.log(e);
  },
  albumClicked: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../pics/pics',
    })
  }
})