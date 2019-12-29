var app = getApp()
Page({
  data: {
    id:null,
    subject:null,
    price: null, 
    detailMessage:null
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      subject: options.subject,
      price: options.price,
      detailMessage: options.detailMessage
    })
  },
  bookTap: function () {
    wx.navigateTo({
      url: '../book/book'
    })
  }
})