//文章详细内容界面
import { DBPost } from '../../../db/DBPost.js';
var app = getApp();
console.log(app)

Page({
  data: {
    isPlayingMusic: false,
    detail:""
  },
  //页面加载函数，传参options
  onLoad: function (options) {
    var postId = options.id;
    //获得Id
    this.postId = postId;
    
    this.dbPost = new DBPost(postId);
    //this.dbpost.execSetStorageSync(data);
    //通过Id获得文章内容
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      post: this.postData
    })
   
    //this.setMusicMonitor();
    //this.initMusicStatus();
    this.setAniation();
  },
  //进入查单词页面
  onSearchTap: function (){
    wx.navigateTo({
      url: '../post-search/post-search'
    })
  },

  //页面渲染
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
  },
  //
  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })

    this.animationUp = animationUp
  },
  //分享时用到的函数
  onShareAppMessage: function () {
    return {
      title: this.postData.title,
      desc: this.postData.content,
      path: "/pages/post/post-detail/post-detail?id="+this.postId
    }
  },


})