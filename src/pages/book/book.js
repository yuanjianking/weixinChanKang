var app = getApp()
const mydata = require('../../utils/data')
const util = require('../../utils/util.js')
Page({
  data: {
    technicians: null,
    techniciansIndex: 0,
    dates: null,
    datesIndex: 0,
    times: null,
    timesIndex: 0,
    bookToastHidden: true
  },
  onLoad: function (options) {
    this.getTimes()   
  },
  // 技师选择
  bindAddrPickerChange: function (e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      techniciansIndex: e.detail.value,
      times: this.data.technicians[e.detail.value].ServiceTimes[this.data.dates[this.data.datesIndex]]
    })
  },
  // 日期选择
  bindDateChange: function (e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      datesIndex: e.detail.value,
      times: this.data.technicians[this.data.techniciansIndex].ServiceTimes[this.data.dates[e.detail.value]]
    })
  },
  // 时间选择
  bindTimeChange: function (e) {
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timesIndex: e.detail.value
    })
  },
  bindToastTap: function () {
    console.log('预定成功')
    this.setData({
      bookToastHidden: false
    })
  },
  hideToast: function () {
    this.setData({
      bookToastHidden: true
    })
  },
  postBook: function () {
    wx.request({
      url: 'http://localhost:27206/api/SmallApp/Test/TestPostObject',
      data: {
        msg: '测试内容',
        item: { Text: 'Text', Value: 'testValue' }
      },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.Code == 0) {         
          wx.showToast({
            title: '登录成功!',//这里打印出登录成功
            icon: 'success',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '登录失败!',
            icon: 'loading',
            duration: 1500
          })
        }
      }
    })
  },
  getTimes: function () {
    var that = this
    wx.request({
      url: 'https://localhost:44356/api/Staff/MY0000000003',
      success: function (res) {
        console.log(res.data)
        that.setData({
          technicians: res.data.StaffInfos,
          dates: res.data.Dates,
          times: res.data.StaffInfos[that.data.techniciansIndex].ServiceTimes[res.data.Dates[that.data.datesIndex]]
        })
      }
    })
  }
})