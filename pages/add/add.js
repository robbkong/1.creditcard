// add.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array1: [1,2,3,4, 5,6,7,8,9,10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28],
    array2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28],
    infos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index1: 0,
      index2:0
    });
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
  formSubmit: function (e) {
    var Name = e.detail.value.credit_card_name;
    var norate = app.f_norateday(parseInt(this.data.index1) + 1, parseInt(this.data.index2)+1);
    var day2p = app.f_day2pay(parseInt(this.data.index2)+1);
    this.data.infos = wx.getStorageSync('INFOS').infos;
    var info = 
    [{
      name:Name,
      bill: (parseInt(this.data.index1)+1),
      pay: (parseInt(this.data.index2)+1),
      norateday: norate,
      day2pay: day2p
    }];
    console.log('[add page1] the infos is:', this.data.infos);
    console.log('[add page2] is the infos is undefined:', ((this.data.infos) == undefined));
    if ((this.data.infos) != undefined) 
    {
      this.data.infos = info.concat(this.data.infos);
    } 
    else
    {
      this.data.infos = info;
    }

    wx.setStorageSync("INFOS", this.data);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000,
      complete: function () {
        setTimeout(function () {
          // not navigateTo, it will have layer limitation
          /*wx.navigateTo({
            url: '../abook/abook'
          });*/
          wx.navigateBack({
            delta: 1
          });
        }, 800);
      }
    });
  },
  bindbill: function (e) {
    console.log('[add page3] the bill value have chagned to :', e.detail.value)
    this.setData({index1: e.detail.value})
  },
  bindpay: function (e) {
    console.log('[add page4] the pay value have chagned to :', e.detail.value)
    this.setData({index2: e.detail.value})
  }
})