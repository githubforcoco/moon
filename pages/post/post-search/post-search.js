Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteTitle: null,
    simple: false,
    detail: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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

  
  onShareAppMessage: function (options) {

  },
  //从框中获得待查询的单词
  voteTitle: function (e) {
    this.setData({ simple: true, voteTitle: e.detail.value })
  },

  detail() {
    var that = this
    wx.request({
      //使用扇贝单词API，查询单词并处理返回数据
      url: 'https://api.shanbay.com/bdc/search/?word=' + this.data.voteTitle,
      data: {},
      method: 'GET',
      success: function (res) {

        console.log(res)
        that.setData({
          word: res.data.data.content,//单词
          pron: res.data.data.pronunciation,//音标
          definition: res.data.data.definition,//释义
          pron_audio: res.data.data.audio//发音音频文件

        })
        that.get_sams(res.data.data.conent_id)
      },
      fail: function () {
      },
      complete: function () {
      }
    })

    this.setData({
      detail: true,
      simple: false
    })
  },
  //按下听读音时会触发的函数
  read() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.pron_audio
    innerAudioContext.onPlay(() => {
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  //获得例句
  get_sams(id) {
    var that = this
    wx.request({
      url: 'https://api.shanbay.com/bdc/example/?vocabulary_id=' + id,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          //选了返回例句的其中两句
          defen: [res.data.data[0],res.data.data[4]]
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  //收藏功能
  handleSaveTap() {
    if (wx.getStorageSync('collect')) {
      var collect = wx.getStorageSync('collect')
    }
    else {
      var collect = []
    }
   
   if (!collect.collectionStatus) {
    collect.push([this.data.word, this.data.pron, this.data.pron_audio, this.data.defen, this.data.definition])
    wx.setStorage({
      key: "collect",
      data: collect
    })
      //如果当前状态是未收藏
      collect.collectionStatus = true;
      this.setData({
        'voteTitle.collectionStatus': collect.collectionStatus
      })
    } 
   else if (collect.collectionStatus) {
      // 如果当前状态是收藏
      collect.collectionStatus = false;
      this.setData({
        'voteTitle.collectionStatus': collect.collectionStatus
      })
    } 
    console.log(collect)
    wx.showToast({
      title: collect.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true})

 
  }
})