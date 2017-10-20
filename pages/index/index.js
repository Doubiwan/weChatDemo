//index.js
//获取应用实例
const app = getApp()

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
      topUrl:'../../image/imgTop1.jpg',
      imgUser:'../../image/imgUser1.png',
      name:'晓风城月',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'16'
    },{
      topUrl:'../../image/imgTop2.jpg',
      imgUser:'../../image/imgUser2.png',
      name:'长亭送别他',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'22'
    },{
      topUrl:'../../image/imgTop3.jpg',
      imgUser:'../../image/imgUser3.png',
      name:'一',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'30'
    },{
      topUrl:'../../image/imgTop4.jpg',
      imgUser:'../../image/imgUser4.png',
      name:'两个',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'7'
    },{
      topUrl:'../../image/imgTop2.jpg',
      imgUser:'../../image/imgUser2.png',
      name:'三个字',
      content:'2015年12月31日,想到之前第一次看到大海的时候竟然脑海中闪现的是电影《once》里男主角问女主角捷克语“海洋”怎么讲,"ottsan"。',
      numLike:'289'
    }],
    imgLike:'../../image/like.png',
    imgShare:'../../image/share.png',
    timeClass: 'time_first',
    heatClass: 'heat_first_toggle',
    array_list: [{
      profile_photo: '../../image/profile_photo.png',
      username: '枫火眠',
      user_content: '月落乌啼霜满天，江枫渔火对愁眠，姑苏城外寒山寺，夜半钟声到客船',
      numLike: '21'
    }, {
      profile_photo: '../../image/profile_photo.png',
      username: '枫火眠',
      user_content: '月落乌啼霜满天，江枫渔火对愁眠，姑苏城外寒山寺，夜半钟声到客船',
      numLike: '21'
    },{
      profile_photo: '../../image/profile_photo.png',
      username: '枫火眠',
      user_content: '月落乌啼霜满天，江枫渔火对愁眠，姑苏城外寒山寺，夜半钟声到客船',
      numLike: '21'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
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
