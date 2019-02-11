//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
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