var app = getApp();

Page({
  data: {
    device: [
      //单词本和清空单词本栏
      { iconurl: '/images/icon/wx_app_local_files.png', title: '单词本', tap: 'showSystemInfo' },
      { iconurl: '/images/icon/wx_app_clear.png', title: '清空单词本', tap: 'clearCache' },
    ]
  },

  //确认清空单词本弹窗
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },

  // 清空单词本
  clearCache: function () {
    this.showModal('清空单词本', '确定清空单词本吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "单词本已清空",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },

  //显示单词本页面
  showSystemInfo: function () {
    wx.navigateTo({
      url: 'device/device'
    });
  },
})