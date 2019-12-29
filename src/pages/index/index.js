//index.js
//获取应用实例
var app = getApp()
const fileData = require('../../utils/data.js')

Page({
  // 页面初始数据
  data: {
    // banner 初始化
    banner_url: fileData.getBannerData(),
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    scrolltop: null, //滚动位置

    // nav 初始化
    navTopItems:null,
    curNavId: null,
    list : null
  },

  onLoad: function () {
    this.getService();
  },
  //标签切换
  switchTab: function (e) {
    console.log("选中的标签：" + e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    this.setData({   
      curNavId: id
    })
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    var id = e.currentTarget.dataset.aid
    var serviceItem = this.data.list[this.data.curNavId].filter((p) => {
      return p.Id == id
    })[0];

    wx.navigateTo({
      url: '../detail/detail?id=' + serviceItem.Id
        + '&subject=' + serviceItem.Name
        + '&price=' + serviceItem.Price
        + '&detailMessage=' + serviceItem.DetailMessage

    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.curNavId

   // if (this.data.navSectionItems[curid].length === 0) return

    var that = this
    //再取新数据，加到列表中。
    // that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
    //  list: that.data.navSectionItems,
    })
  },
  // book
  bookTap: function (e) {
    wx.navigateTo({
      url: '../book/book?aid=' + e.currentTarget.dataset.aid
    })
  },
  scrollHandle: function (e) { //滚动事件
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },
  getService: function () {
    var that = this
    wx.request({
      url: 'https://localhost:44356/api/Service/MY0000000003',
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.Services,
          navTopItems: res.data.ServiceGroups,
          curNavId: res.data.ServiceGroups[0].Code  
        })
      }
    })
  }
})
