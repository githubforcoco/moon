var util = require('../util/util.js')

class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId = postId;
  }

  //获取指定id号的文章数据
  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == this.postId) {
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }
  
  /*得到全部文章信息*/
  getAllPostData() {
    //var res = wx.getStorageSync(this.storageKeyName);
    //if (!res) {
    var res = require('../data/food.js').postList;
    //this.initPostList(res);
    //}
    return res;
  }

  /*初始化缓存数据*/
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

};

export { DBPost }