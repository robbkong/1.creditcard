// abook.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    infos: [],  // 存储记录的缓存
    isnull: 1  // 是否为空
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.show();
  },
  show: function () {
    this.data.infos = wx.getStorageSync('INFOS').infos;
    var is_null = 1;

    if (this.data.infos != undefined) 
    {
      // update the norateday and pay2dao
      const length = this.data.infos.length;
      for (let i = 0; i < length; ++i) 
      {
        this.data.infos[i].norateday = app.f_norateday(parseInt(this.data.infos[i].bill), parseInt(this.data.infos[i].pay));
        this.data.infos[i].day2pay = app.f_day2pay(parseInt(this.data.infos[i].pay));
      }

      // 插入法排序，从大到小降序排序
      for (let j = 1; j < length; ++j) 
      {
        var key = this.data.infos[j];
        let i = j - 1;
        while ((i >= 0) && (parseInt(this.data.infos[i].norateday) < parseInt(key.norateday)))
        {
          this.data.infos[i + 1] = this.data.infos[i];
          i = i - 1;
        }
        this.data.infos[i + 1] = key;
      }

      // no need to reset the INFOS
      //wx.setStorageSync("INFOS", this.data);
      is_null = 0;
      this.setData({infos: this.data.infos});
    }
    else
    {
      is_null = 1;
    }
    this.setData({isnull: is_null});
  },
  add: function () {
    setTimeout(() => {
      wx.navigateTo({
        url: '../add/add'
      })
    }, 500);
  }
})
