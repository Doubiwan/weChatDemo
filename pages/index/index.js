//index.js
//获取应用实例
var url = 'http://47.94.146.199:8080';
var base = 'http://47.94.146.199:8080/MessageWall';
var baseUrl = 'http://47.94.146.199:8080/resource/imgs';
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: false,
    autoplay: true,
    circular: true,
    array_top: [{
      topUrl: baseUrl + '/imgTop1.jpg',
      imgUser: baseUrl + '/imgUser1.png',
      name:'晓风城月',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'16'
    },{
      topUrl: baseUrl + '/imgTop2.jpg',
      imgUser: baseUrl + '/imgUser2.png',
      name:'长亭送别他',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'22'
    },{
      topUrl: baseUrl + '/imgTop3.jpg',
      imgUser: baseUrl + '/imgUser3.png',
      name:'一',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'30'
    },{
      topUrl: baseUrl + '/imgTop4.jpg',
      imgUser: baseUrl + '/imgUser4.png',
      name:'两个',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'7'
    },{
      topUrl: baseUrl + '/imgTop5.jpg',
      imgUser: baseUrl + '/imgUser2.png',
      name:'三个字',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'289'
    }],
    imgLike: baseUrl + '/unlike.png',
    imgShare: baseUrl +  '/share.png',
    timeClass: 'time_first',
    heatClass: 'heat_first_toggle',
    array_list: [],
    userid: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  likeIt: function (e){
    var _this = this;
    if(e.target.dataset.id){
      for(var item of _this.data.array_list){
        if(item.id === e.target.dataset.id){
          //取消点赞
          if (item.likeFlag){
            console.log("取消点赞");
            //发送取消点赞请求
            wx.request({
              url: base + '/MessageController/cancelLike',
              data: {
                userId: app.globalData.userid,
                messageId: item.id
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: res => {
                console.log(res);
                //更改样式
                item.likesrc = baseUrl + '/unlike.png';
                item.likenum = res.data.object.likenum;
                item.likeFlag = res.data.object.likeFlag;
                console.log(item);
                _this.setData({
                  array_list: _this.data.array_list
                })
                console.log(_this.data.array_list);
              },
              fail: res => {
                console.log(res);
              }
            })
            break;
          //点赞
          }else{
            console.log("点赞");
            //发送点赞请求
            wx.request({
              url: base + '/MessageController/like',
              data: {
                userId: app.globalData.userid,
                messageId: item.id
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: res => {
                console.log(res);
                //更改样式
                item.likesrc = baseUrl + '/like.png';
                item.likenum = res.data.object.likenum;
                item.likeFlag = res.data.object.likeFlag;
                console.log(item);
                _this.setData({
                  array_list: _this.data.array_list
                })
                console.log(_this.data.array_list);
              },
              fail: res => {
                console.log(res);
              }
            })
            break;
          }
          
        }
      }
    }
  },
  onLoad: function () {
    var _this = this;
    console.log(app.globalData.userid);
    app.getUseridMsg(function (userid) {
      console.log("获取userid已调用");
      _this.setData({
        userid: userid
      })
      getMsgList();
      console.log(userid);
      console.log(_this.data.userid);
    });
    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (_this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(_this.data.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          _this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(_this.data.userid);

    //根据createTime请求聊天信息
    function getMsgList(){
      wx.request({
        url: base + '/MessageController/showAllByPage',
        data: {
          userId: _this.data.userid,
          pageNum: 1,
          pageSize: 30,
          order: 'createTime',
          sort: 'desc'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: res => {
          console.log(res);
          for(var item of res.data.object.rows){
            item.likesrc = (item.likeFlag == true ? baseUrl + '/like.png' : baseUrl + '/unlike.png');
            // console.log(item);
            _this.data.array_list.push(item);
          }
          _this.setData({
            array_list: _this.data.array_list
          });
        },
        fail: res => {
          console.log(res);
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toggleTime: function(e){
    this.setData({
      timeClass: 'time_first',
      heatClass: 'heat_first_toggle'
    });
  },
  toggleHeat: function (e) {
    this.setData({
      timeClass: 'time_first_toggle',
      heatClass: 'heat_first'
    });
  }
})
