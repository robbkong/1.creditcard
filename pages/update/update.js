// update.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28],
    array2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28],
    infos: [],
    info: {},
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Infos = wx.getStorageSync('INFOS').infos
    this.setData({
      infos: Infos,
      info: Infos[options.index],
      index: options.index,
      index1: Infos[options.index].bill - 1,
      index2: Infos[options.index].pay - 1
    });
  },
  formSubmit: function (e) {
    var Name = e.detail.value.credit_card_name;
    var norate = app.f_norateday(parseInt(this.data.index1) + 1, parseInt(this.data.index2) + 1);
    var day2p = app.f_day2pay(parseInt(this.data.index2) + 1);
    this.data.infos = wx.getStorageSync('INFOS').infos;

    this.data.info.name = Name;
    this.data.info.norateday = norate;
    this.data.info.day2pay = day2p;
    this.data.info.bill = parseInt(this.data.index1) + 1;
    this.data.info.pay = parseInt(this.data.index2) + 1;

    console.log('[update page1] the info is:', this.data.info);

    this.setData({info: this.data.info});
    this.data.infos[this.data.index] = this.data.info;
    wx.setStorageSync('[update page2] the infos is:', this.data);
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000,
      complete: function () {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 800);
      }
    });
  },
  del: function () {
    this.data.infos.splice(this.data.index, 1);
    wx.setStorageSync("INFOS", this.data);
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000,
      complete: function () {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 800);
      }
    });
  },
  bindbill: function (e) {
    console.log('[update page3] the bill value have chagned to :', e.detail.value)
    this.setData({index1: e.detail.value})
  },
  bindpay: function (e) {
    console.log('[update page4] the pay value have chagned to :', e.detail.value)
    this.setData({index2: e.detail.value})
  }
})