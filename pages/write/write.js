// pages/write/write.js
var app = getApp();
var url = 'http://47.94.146.199:8080';
var base = 'http://47.94.146.199:8080/MessageWall';
var baseUrl = 'http://47.94.146.199:8080/resource/imgs';
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    startPoint: [0, 0],
    pics: [],
    imgList: [baseUrl + '/1.jpg', baseUrl + '/2.jpg', baseUrl + '/3.jpg', baseUrl + '/1.jpg', baseUrl + '/2.jpg'],
    uploadImg: '',
    scrollLeft: 0,
    _num1: 0,
    _num2: 0,
    _num3: 0,
    share: false,
    scrolltop: 0,
    inputValue: "",
    switchdisplay: 'flex',
    animationData: {},
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    // value: [9999, 1, 1],
    btntype: 'default',
    plain: true,
    loading: false,
    switchflag: true,
    namedata: '',
    focus: false,
    content: ''
  },
  getValue: function (e){
    this.setData({
      content: e.detail.value
    });
    console.log(this.data.content);
  },
  contains: function (arr,obj){
    var i = arr.length;
    while(i--){
      if(arr[i] === obj){
        return true;
      }
    }
    return false;
  },
  bindFormSubmit: function (e){
    console.log(e);
    this.setData({
      content: e.detail.value
    })
  },
  submit: function (e) {
    var _this = this;
    //切换样式
    _this.setData({
      btntype: 'primary',
      plain: false,
      loading: true,
    })
    //做校验
    console.log(_this.data.content);
    //判断是否匿名
    if (_this.data.switchflag){
      //判断匿名头像是否存在于最近使用列表中
      if (_this.contains(_this.data.imgList,_this.data.uploadImg)){
        wx.request({
          url: base + '/MyMessageController/writeMessage',
          data: {
            sessionId: app.globalData.sessionId,
            anonymous: 1,
            fakeName: _this.data.namedata,
            fakeAvatarUrl: _this.data.uploadImg,
            content: _this.data.content,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res){
            console.log(res);
          },
          fail: function (res){
            console.log(res);
          }   
        })
      }else{
        console.log("调用新上传的");
        console.log(_this.data.uploadImg+" "+app.globalData.sessionId + " " + _this.data.namedata + " " + _this.data.content);
        wx.uploadFile({
          url: base + '/MyMessageController/writeMessage2',
          filePath: _this.data.uploadImg,
          name: 'file',
          formData: {
            'sessionId': app.globalData.sessionId,
            'anonymous': 1,
            'fakeName': _this.data.namedata,
            'content': _this.data.content
          },
          success: function (res){
            console.log("成功了");
            console.log(res.data);
          },
          fail: function (res){
            console.log("失败了");
            console.log(res);
          }
        }) 
      }
    }else{
      wx.request({
        url: base + '/MyMessageController/writeMessage',
        data: {
          sessionId: app.globalData.sessionId,
          anonymous: 0,
          fakeName: app.globalData.userInfo.nickName,
          fakeAvatarUrl: app.globalData.userInfo.avatarUrl,
          content: _this.data.content
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res =>{
          console.log(res);
        },
        fail: res =>{
          console.log(res);
        }
      })
    }
  },
  bindChange: function (e) {
    console.log(e.detail.value);
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      namedata: this.data.year+this.data.month+this.data.day
    })
  },
  switchanonymous: function (e){
    if(e.detail.value){
      this.setData({
        switchflag: true,
        switchdisplay: 'flex'
      });
    }else{
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.height(0).step();
      this.setData({
        switchflag: false,
        animationData: animation.export()
      });
    }
  },
  chooseImgUrl: function (e) {
    console.log("已点击");
    console.log(e.target.dataset.imgsrc);
    this.setData({
      uploadImg: e.target.dataset.imgsrc
    });
    console.log(this.data.uploadImg);
  },
  // mytouchstart: function (e) {
  //   this.setData({ startPoint: [e.touches[0].pageX, e.touches[0].pageY] });
  // },
  // mytouchmove: function (e) {
  //   var _this = this;
  //   var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
  //   var startPoint = _this.data.startPoint;
  //   if (curPoint[0] <= startPoint[0]) {
  //     if (Math.abs(curPoint[0]-startPoint[0]) >= Math.abs(curPoint[1]-startPoint[1])) {
  //       console.log(e.timeStamp + '- touch left move');
  //     } else {
  //       if (curPoint[1] >= startPoint[1]) {
  //         console.log(e.timeStamp + '- touch down move');
  //         if (Math.abs(curPoint[1] - startPoint[1]) < 30){
  //           _this.setData({scrolltop: 30});
  //           console.log(_this.data.scrolltop);
  //         }
  //       } else {
  //         console.log(e.timeStamp + '- touch up move')
  //       }
  //     }
  //   } else {
  //     if (Math.abs(curPoint[0]-startPoint[0]) >= Math.abs(curPoint[1]-startPoint[1])) {
  //       console.log(e.timeStamp + '- touch right move');
  //     } else {
  //       if (curPoint[1] >= startPoint[1]) {
  //         console.log(e.timeStamp + '- touch down move');
  //       } else {
  //         console.log(e.timeStamp + '- touch up move')
  //       }
  //     }
  //   }
  // },
  choose: function () {//这里是选取图片的方法
    var that = this,
    pics = this.data.pics;
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        //判断是否已经上传过
        console.log(imgsrc);
        console.log(pics);
        // pics.splice(0,0,imgsrc).toString();
        // pics = pics.concat(imgsrc);
        that.insertFront(pics,imgsrc)
        console.log(pics);
        that.setData({
          pics: pics
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  insertFront: function(arr,obj){
    if(arr === null){
      for (var i = 0; i < obj.length; i++) {
        arr.push(obj[i]);
      }
    }else{
      for(var i=obj.length-1;i>=0;i--){
        arr.unshift(obj[i]);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.sessionId);
    var _this = this;
    wx.request({
      url: base + '/MyMessageController/selectAvatarList',
      data: {
        sessionId: app.globalData.sessionId
      },
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res){
        for(var item of res.data.object){
          _this.data.imgList.push(item);
        }
        console.log(_this.data.imgList);
        _this.setData({
          imgList: _this.data.imgList
        })
      },
      fail: function (res){
        console.log(res);
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

  //滚动条滚到顶部的时候触发
  upper: function (e) {
    // console.log(e)
  },
  //滚动条滚到底部的时候触发
  lower: function (e) {
    // console.log(e)
  },
  //滚动条滚动后触发
  scroll: function (e) {
    // console.log(e);
    this.setData({scrollTop: e.detail.scrollTop});
    // console.log(this.data.scrollTop);
  },
  bindinput: function (e) {
    console.log(e);
    var _this = this;
    if(e.detail.value != ""){
      _this.setData({
        scrolltop: 0,
      })
    }
    if (e.detail.cursor == 6){
      wx.showToast({
        title: '这么多字不存在的',
        icon: 'loading',
        image: baseUrl + '/user.png',
        duration: 3000,
        mask: true,
        success: function(res) {
          _this.setData({inputValue: ""});
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  shareToFriends: function(){
    var _this = this;
    this.setData({ share: !_this.data.share});
  }
})