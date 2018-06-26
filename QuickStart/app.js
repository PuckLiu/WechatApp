//app.js
App({
  addListener: function (callback) {
    this.callback = callback;
  },
  setChangedData: function (res) {
    if (this.callback != null) {
      this.callback(res);
    }
  },
  onLaunch: function () {
    // 展示本地存储能力
    console.log("onLaunch");
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setNavigationBarTitle({
      title: '噗哈相册',
    })
    this.globalData.g_music_url = 'https://yhsmallapp.oss-cn-shanghai.aliyuncs.com/BrunoMars-JustTheWayYouAre.mp3';
    this.globalData.g_isPalyingMusic = true;
    this.globalData.g_music_cover = '';
    this.globalData.g_music_title = 'Just the way you are';
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              
            }
          })
        }
      }
    })
    //相册链接https://yhsmallapp.oss-cn-shanghai.aliyuncs.com/album_json
    // this.pullLaunchConfig('https://yhsmallapp.oss-cn-shanghai.aliyuncs.com/joy_test2.json');
    this.pullLaunchConfig('https://yhsmallapp.oss-cn-shanghai.aliyuncs.com/config_file/album_json');
  },
  onShow: function() {
    console.log("app onShow");
    // wx.playBackgroundAudio();
  },
  onHide: function() {
    console.log("app onHide");
    // wx.pauseBackgroundAudio();
  },
  globalData: function() {
    userInfo: null;
    g_nav_title:"噗哈相册";
    g_isPalyingMusic: true;
    g_music_url:null;
    g_music_cover: null;
    g_music_title;
    g_images:[];
    g_albums:[];
  },
  
  pullLaunchConfig: function (purl) {
    var that = this;
    wx.request({
      url: purl,
      success: function (res) {
        var imgurls = res.data.imagelist;
        var albums = res.data.albums;
        var musicurl = res.data.musicurl;
        var musiccover = res.data.musiccover;
        var musictitle = res.data.musictitle;
        var navtitle = res.data.navtitle;
        that.globalData.g_music_url = musicurl;
        that.globalData.g_music_cover = musiccover;
        that.globalData.g_music_title = musictitle;
        that.globalData.g_images = imgurls;
        that.globalData.g_albums = albums;
        that.globalData.g_nav_title = navtitle;
        if (that.albumFetchCallback) {
          that.albumFetchCallback(res);
        }
        // if (that.imagesReadyCallback) {
        //   that.imagesReadyCallback(res)
        // }
        // console.log(res);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})