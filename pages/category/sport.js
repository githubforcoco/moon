import { DBPost } from '../../db/dbSport.js';
//import { data } from '../../data/data.js';
Page({
  data: {

  },

  //页面启动函数，获取该分类下全部文章信息
  onLoad: function () {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData()
    });
  },

  //点击查看文章内容
  onTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;//获取文章对应postId
    console.log(postId);
    wx.navigateTo({  //根据postID，点击跳转到指定文章页面
      url: '../post/post-detail/post-detail?id=' + postId,
    })
  }
})