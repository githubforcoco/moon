Page({
    //跳转到主页页面
    onTapJump: function (event) {
        wx.switchTab({
            url: "../post/post",
            //在console输出跳转成功或失败
            success: function () {
                console.log("jump success")
            },
            fail: function () {
                console.log("jump failed")
            },
            complete: function () {
                console.log("jump complete")
            }
        });
    },
    onUnload: function (event) {
        console.log("page is unload")
    },
    onHide: function (event) {
        console.log("page is hide")
    },
})