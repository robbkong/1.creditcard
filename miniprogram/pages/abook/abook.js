// abook.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    infos: [], // 存储记录的缓存
    isnull: 1, // 是否为空
    database: 'infos'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.show();
  },
  show: function () {
    this.setData({ isnull: 1 });
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection(this.data.database).where({
      _openid: this.data.openid
    }).get({
      success: res => {
        var temp = res.data[0].info;
        temp[0].id = res.data[0]._id;
        for (let i = 1; i < res.data.length; i++) {
          temp = temp.concat(res.data[i].info);
          temp[i].id = res.data[i]._id;
        }
        this.data.infos = temp;
        console.log(temp)
        console.log('[数据库] [查询记录] 成功: ', res.data)

        // update the norateday and pay2dao
        const length = this.data.infos.length;
        for (let i = 0; i < length; ++i) {
          this.data.infos[i].norateday = app.f_norateday(parseInt(this.data.infos[i].bill), parseInt(this.data.infos[i].pay));
          this.data.infos[i].day2pay = app.f_day2pay(parseInt(this.data.infos[i].pay));
        }

        // 插入法排序，从大到小降序排序
        for (let j = 1; j < length; ++j) {
          var key = this.data.infos[j];
          let i = j - 1;
          while ((i >= 0) && (parseInt(this.data.infos[i].norateday) < parseInt(key.norateday))) {
            this.data.infos[i + 1] = this.data.infos[i];
            i = i - 1;
          }
          this.data.infos[i + 1] = key;
        }
        this.setData({ isnull: 0 });
        this.setData({ infos: this.data.infos });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        this.setData({ isnull: 1 });
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  add: function () {
    setTimeout(() => {
      wx.navigateTo({
        url: '../add/add'
      })
    }, 500);
  }
})