// pages/history/history.js
var base = 'http://47.94.146.199:8080/MessageWall';
var baseUrl = 'http://47.94.146.199:8080/resource/imgs';
var portUrl = 'http://47.94.146.199:8080';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUser: baseUrl + '/imgUser1.png',
    pics: baseUrl + '/history.jpg',
    userName: '',
    history:[],
    colorList:[{
      imgSrc: baseUrl + '/dialog1.png',
      color: '#a2a6ae'
    },{
      imgSrc: baseUrl + '/dialog2.png',
      color: '#8fc6cd'
    },{
      imgSrc: baseUrl + '/dialog3.png',
      color: '#ebc733'
    },{
      imgSrc: baseUrl + '/dialog4.png',
      color: '#f76b5a'
    },{
      imgSrc: baseUrl + '/dialog5.png',
      color: '#a0c8a3'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.sessionId)
    //获取表白列表
    wx.request({
      url: base + '/MyMessageController/showMineByPage',
      data:{
        sessionId: app.globalData.sessionId,
        userId: app.globalData.userid,
        pageNum: 1,
        pageSize: 100,
        order: 'createTime',
        sort: 'desc'
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: res => {
        for(var item of res.data.object.rows){
          var Rand = Math.floor(Math.random() * 5);
          Object.assign(item,this.data.colorList[Rand]);
          this.data.history.push(item);
        }
        this.setData({
          history: this.data.history
        })
          console.log(this.data.history);
      },
      fail: res => {
        console.log(res.data);
      }
    })
    //获取历史背景图片
    wx.request({
      url: base + '/MyMessageController/gainBackPhoto',
      data: {
        sessionId: app.globalData.sessionId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: res =>{
        this.setData({
          pics: res.data.object.photoUrl
        })
        console.log(res);
      },
      fail: res =>{
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userName: app.globalData.userInfo.nickName,
      imgUser: app.globalData.userInfo.avatarUrl
    })
    wx.setNavigationBarTitle({
      title: this.data.userName,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //上传图片
  uploadImg: function (){
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempRes = res.tempFilePaths.toString();
        _this.setData({
          pics: tempRes
        });
        //上传图片
        console.log(tempRes);
        wx.uploadFile({
          url: base + '/MyMessageController/uploadBackPhoto',
          filePath: tempRes,
          name: 'file',
          formData:{
            'sessionId': app.globalData.sessionId
          },
          success: function (res){
            console.log("上传成功");
            console.log(res.data);
          },
          fail: function (res){
            console.log("宣告失败");
          }
        })
      },
      fail: function(){

      },
      complete: function(){

      }
    })
  }
})