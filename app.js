//app.js
var base = 'http://47.94.146.199:8080/MessageWall';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    var _this = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: base + '/LoginController/codeForSessionKey',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: getCodeSuccess,
            fail: function (data){
              console.log(data);
            }
          });
        }else {
          console.log("获取登录信息失败！" + res.errMsg);
        }
      }
    })

    // 获取用户信息
    console.log(_this.globalData);
    //请求用户信息
    function getCodeSuccess(codeRes){
      _this.globalData.sessionId = codeRes.data.object.sessionId;
      _this.globalData.userid = codeRes.data.object.userId;
      //查看用户是否授权
      wx.getSetting({
        success: getSetRes =>{
          console.log(getSetRes.authSetting['scope.userInfo']);
          if(!getSetRes.authSetting['scope.userInfo']){
            //申请权限
            wx.authorize({
              scope: 'scope.userInfo',
              success: res =>{
                console.log(res);
              },
              fail: res =>{
                console.log(res);
              },
            })
          }
        }
      })
      //获取用户信息
      wx.getUserInfo({
        success: userRes => {
          console.log("已经调用了app.js里的全局函数");
          _this.globalData.userInfo = userRes.userInfo;
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (_this.userInfoReadyCallback) {
            _this.userInfoReadyCallback(userRes)
          }
          //上传用户头像和昵称
          wx.request({
            url: base + '/LoginController/uploadNickName',
            data: {
              sessionId: codeRes.data.object.sessionId,
              nickName: userRes.userInfo.nickName,
              avatarUrl: userRes.userInfo.avatarUrl,
              rawData: userRes.rawData.slice(1, -2),
              signature: userRes.signature
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: res => {
              console.log("成功了");
              console.log(res.data)
            },
            fail: res => {
              console.log("失败了");
              console.log(res.data);
            }
          })
        }
      })
      
    }
  },
  getUseridMsg: function (lz){
    var _this = this;
    if(_this.globalData.userid){
      typeof lz == "function" && lz(_this.globalData.userid)
    }else{
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: base + '/LoginController/codeForSessionKey',
              data: {
                code: res.code
              },
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                // console.log(res.data.object);
                _this.globalData.sessionId = res.data.object.sessionId;
                _this.globalData.userid = res.data.object.userId;
                typeof lz == "function" && lz(_this.globalData.userid)
                console.log(_this.globalData);
              },
              fail: function (data) {
                console.log(data);
              }
            });
          } else {
            console.log("获取登录信息失败！" + res.errMsg);
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    nickName: null,
    avatarUrl: null,
    sessionId: null,
    userid: null
  },
  //多张图片上传
  uploadimg (data) {
    var that= this,
    i=data.i ? data.i : 0,
    success=data.success ? data.success : 0,
    fail=data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'fileData',//这里根据自己的实际情况改
      formData: null,
      success: (resp) => {
        success++;
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading()
  }
})