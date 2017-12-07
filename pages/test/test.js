var base = 'http://47.94.146.199:8080/MessageWall';
var pageObject = {
  data: {

  },
  change: function (e){
    wx.request({
      url: base + '/CommonController/getAccessToken',
      success: res =>{
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + res.data.object,
          method: 'POST',
          data: {
            "path": "pages/index/index",
          },
          success: res =>{
            console.log(res);
          },
          fail: res =>{
            console.log(res);
          }
        })
      }
    })
  }
}

// for (var i = 0; i < types.length; ++i) {
//   (function (type) {
//     pageObject[type] = function (e) {
//       var key = type + 'Size'
//       var changedData = {}
//       changedData[key] =
//         this.data[key] === 'default' ? 'mini' : 'default'
//       this.setData(changedData)
//     }
//   })(types[i])
// }

Page(pageObject)