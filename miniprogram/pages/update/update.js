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
    info: {},
    index1: 0,
    index2: 0,
    id: 0,
    database: 'infos'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index);
    const db = wx.cloud.database()
    db.collection(this.data.database).where({
      _id: options.index
    }).get({
      success: res => {
        var myinfo = res.data[0].info[0];
        console.log(myinfo);
        console.log('[数据库] [查询记录] 成功: ', res.data)
        this.setData({ info: myinfo });
        this.setData({ id: options.index });
        this.setData({ index1: myinfo.bill - 1 });
        this.setData({ index2: myinfo.pay - 1 });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  formSubmit: function (e) {
    var Name = e.detail.value.credit_card_name;

    this.data.info.name = Name;
    this.data.info.bill = parseInt(this.data.index1) + 1;
    this.data.info.pay = parseInt(this.data.index2) + 1;

    console.log('[update page1] the info is:', this.data.info);

    const db = wx.cloud.database()
    const newCount = this.data.count - 1
    db.collection(this.data.database).doc(this.data.id).update({
      data: {
        info: [this.data.info]
      },
      success: res => {
        this.setData({
          count: newCount
        })
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
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  del: function () {
    const db = wx.cloud.database()
    db.collection(this.data.database).doc(this.data.id).remove({
      success: res => {
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
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },
  bindbill: function (e) {
    console.log('[update page3] the bill value have chagned to :', e.detail.value)
    this.setData({ index1: e.detail.value })
  },
  bindpay: function (e) {
    console.log('[update page4] the pay value have chagned to :', e.detail.value)
    this.setData({ index2: e.detail.value })
  }
})