//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  day_month: function (n) {
    var date = new Date();
    var year = date.getFullYear();
    var daypermonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (n == 1) 
    {
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
      {
        return daypermonth[n] + 1;
      }
      else
      {
        return daypermonth[n];
      }   
    }
    else
    {
      return daypermonth[n];
    }
  },
  bill2pay: function (bill, pay) {
    var date = new Date();
    var bill2payday;
    if (bill <= pay) {
      bill2payday = pay - bill;
    }
    else {
      bill2payday = this.day_month(date.getMonth()) - bill + pay;
    }
    //console.log('bill2payday', bill2payday);
    return bill2payday;
  },
  f_day2pay: function (pay) {
    var date = new Date();
    var day = date.getDate();
    var day2payday;
    if (day <= pay) {
      day2payday = pay - day;
    }
    else {
      day2payday = this.day_month(date.getMonth()) - day + pay;
    }
    return day2payday;
  },
  f_norateday: function (bill, pay) {
    var date = new Date();
    var day = date.getDate();
    var norate;
    if (day <= bill) {
      norate = bill - day + this.bill2pay(bill, pay);
      //console.log('f:  bill', bill)
      //console.log('f:  day', day)
      //console.log('f:  this.bill2pay(bill, pay)', this.bill2pay(bill, pay))
      //console.log('f:  norate', norate)
    }
    else {
      norate = this.day_month(date.getMonth()) - day + bill + this.bill2pay(bill, pay);
    }
    return norate;
  },
  globalData:{
    userInfo:null
  }
})