var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (options) {
    var postId = option.id;
    this.data.currentPostId = postId;
    this.setData({
      postData: postData.postList[postId]
    })

    var postCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      this.setData({
        collected: postsCollected[postId]
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function (event) {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId === that.data.currentPostId) {
        that.setData({
          isPlayingMusic: true
        })
      }
    })

    wx.onBackgroundAudioPause(function () {
      var pages = getCurrentPages();
      var currentPage = page[pages.length - 1];
      if (cuurentPage.data.currentPostId === that.data.currentPostId) {
        if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          that.setData({
            isPlayingMusic: false
          })
        }
      }
      app.globalData.g_isPlayingMusic = false;
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
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

  }
})