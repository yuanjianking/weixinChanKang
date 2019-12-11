const constantData1 = require('../../utils/constantData1.js');
// 右侧每一类的 bar 的高度（固定）
const RIGHT_BAR_HEIGHT = 20;
// 右侧每个子类的高度（固定）
const RIGHT_ITEM_HEIGHT = 100;
// 左侧每个类的高度（固定）
const LEFT_ITEM_HEIGHT = 50

Page({
  data: {
    //是否显示下面的购物车
    isShowCart: false,
    //是否显示服务选择
    isShowChoseService: false,
    //购物车的商品
    myCart: [],
    // 购物车的数量
    num: 0,
    //分类的数组
    categories: [
      '商品',
      // '评论',
      // '商家'
    ],
    //swiper滑动的数组
    swiperId: 0,

    //模拟 数据
    constants: [],
    // 左 => 右联动 右scroll-into-view 所需的id
    toView: null,
    // 当前左侧选择的
    currentLeftSelect: null,
    // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
    eachRightItemToTop: [],
    leftToTop: 0
  },
  onLoad: function () {
    var that = this;
    //导航栏的文字
    // wx.setNavigationBarTitle({
    //   title: '点餐',
    // }),
    // 导航栏的文字颜色和背景的颜色
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#e64340',
    //   animation: {
    //     duration: 400,
    //     timingFunc: 'easeIn'
    //   }
    // })
    //高度大小
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight - 100
        })
      }
    });

    this.setData({
      constants: constantData1,
      currentLeftSelect: constantData1[0].id,
      eachRightItemToTop: this.getEachRightItemToTop()
    })
  },
  // 获取每个右侧的 bar 到顶部的距离，用来做后面的计算。
  getEachRightItemToTop: function () {
    var obj = {};
    var totop = 0;
    // 右侧第一类肯定是到顶部的距离为 0
    obj[constantData1[0].id] = totop
    // 循环来计算每个子类到顶部的高度
    for (let i = 1; i < (constantData1.length + 1); i++) {
      totop += (RIGHT_BAR_HEIGHT + constantData1[i - 1].category.length * RIGHT_ITEM_HEIGHT)
      // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
      obj[constantData1[i] ? constantData1[i].id : 'last'] = totop
    }
    return obj
  },
  //记录swiper滚动的
  swiperchangeTap: function (e) {
    this.setData({
      swiperId: e.detail.current,
    })
  },
  //点击分类栏
  categoriesTap: function (e) {
    this.setData({
      swiperId: e.currentTarget.dataset.index
    })
  },
  // 监听右侧的滚动事件与 HZL_eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
  rightTap: function (e) {
    for (let i = 0; i < this.data.constants.length; i++) {
      let left = this.data.eachRightItemToTop[this.data.constants[i].id]
      let right = this.data.eachRightItemToTop[this.data.constants[i + 1] ? this.data.constants[i + 1].id : 'last']
      if (e.detail.scrollTop < right && e.detail.scrollTop >= left) {
        this.setData({
          currentLeftSelect: this.data.constants[i].id,
          leftToTop: LEFT_ITEM_HEIGHT * i
        })
      }
    }
  },
  // 左侧类的点击事件，点击时，右侧会滚动到对应分类
  leftTap: function (e) {
    this.setData({
      toView: e.target.id || e.target.dataset.id,
      currentLeftSelect: e.target.id || e.target.dataset.id
    })
  },


  //是否显示下面的购物车
  showCartTap: function (e) {
    if (!this.data.isShowCart && this.data.num > 0) {
      this.setData({
        isShowCart: true
      })
    } else if (this.data.isShowCart && this.data.num > 0) {
      this.setData({
        isShowCart: false
      })
    }
  },

  //关闭
  cartCloseTap: function (e) {
    this.setData({
      isShowCart: false
    })
  },

  //清空
  clearCartTap: function (e) {
    for (var i = 0; i < this.data.constants.length; i++) {
      for (var j = 0; j < this.data.constants[i].category.length; j++) {
        this.data.constants[i].category[j].category_num = 0
      }
    }
    this.setData({
      isShowCart: false,
      num: 0,
      myCart: [],
      constants: this.data.constants,
    })
  },

  // 增加
  addTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var myCart = this.subAdd(parentIndex, index)
    this.setData({
      num: this.data.num,
      myCart: myCart,
      constants: this.data.constants,
    })
  },

  //减少
  removeTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var myCart = this.subRemove(parentIndex, index)

    if (this.data.num == 0) {
      this.data.isShowCart = false;
    } else {
      this.data.isShowCart = true;
    }

    this.setData({
      num: this.data.num,
      myCart: myCart,
      constants: this.data.constants,
    })
  },

  // 下面购物车增加
  addcartTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var myCart = this.subAdd(parentIndex, index)
    this.setData({
      num: this.data.num,
      myCart: myCart,
      constants: this.data.constants,
    })
  },

  //下面购物车减少
  removeCartTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var myCart = this.subRemove(parentIndex, index)

    if (this.data.num == 0) {
      this.data.isShowCart = false;
    } else {
      this.data.isShowCart = true;
    }

    this.setData({
      num: this.data.num,
      myCart: myCart,
      constants: this.data.constants,
      isShowCart: this.data.isShowCart
    })
  },

  //封装加的方法
  subAdd: function (parentIndex, index) {
    this.data.num++;
    var index = index;
    var parentIndex = parentIndex;
    var id = this.data.constants[parentIndex].category[index].category_id;
    var name = this.data.constants[parentIndex].category[index].category_name;
    var num = ++this.data.constants[parentIndex].category[index].category_num;
    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { num: num, name: name, mark: mark, index: index, parentIndex: parentIndex };
    var myCart = this.data.myCart;
    myCart.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < myCart.length; i++) {
      if (obj.mark == myCart[i].mark) {
        myCart.splice(i, 1, obj)
      }
      if (arr.indexOf(myCart[i]) == -1) {
        arr.push(myCart[i]);
      }
    }

    return arr
  },

  //封装减的方法
  subRemove: function (parentIndex, index) {
    this.data.num--;
    var index = index;
    var parentIndex = parentIndex;
    var id = this.data.constants[parentIndex].category[index].category_id;
    var name = this.data.constants[parentIndex].category[index].category_name;
    var num = --this.data.constants[parentIndex].category[index].category_num;
    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { num: num, name: name, mark: mark, index: index, parentIndex: parentIndex };
    var myCart = this.data.myCart;
    myCart.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < myCart.length; i++) {
      if (obj.mark == myCart[i].mark) {
        myCart.splice(i, 1, obj)
      }
    }


    var arr1 = [];
    //当数量大于1的时候加
    for (var i = 0; i < myCart.length; i++) {
      if (arr1.indexOf(myCart[i]) == -1) {
        arr1.push(myCart[i]);
        if (myCart[i].num > 0) {
          arr.push(arr1[i])
        }
      }
    }

    return arr
  },

})