import { DBPost } from '../../db/DBPost.js';
//import { data } from '../../data/data.js';
Page({
  data: {
    
  },
  //NEWS页面启动函数
  onLoad: function () {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData()//获取所有文章信息
    });
  },
  //点击进入新闻具体内容
  onTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    //每篇新闻都有唯一一个postId，通过这个Id获取新闻内容
    console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  // target 和currentTarget
  // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
  // target这里指的是image，而currentTarget指的是swiper

  //扫屏函数
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  }
})