// components/chose-staff/index.js
const date = new Date()
const years = []
const months = []
const days = []
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let getDays = function (year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    staffs:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击radio-group中的列表项事件
    radiochange: function (res) {
      console.log("选中的标签：" + res.detail.value);
      var arrs = this.data.staffs;
      var that = this;
      for (const x in arrs) {
        if (arrs[x].staff_name == res.detail.value) {
          arrs[x].checked = true;
        } else {
          arrs[x].checked = false;
        }
      }
      that.setData({
        staffs: arrs
      })
    },
    // 关闭选择画面
    choseCloseTap: function (e) {
      this.triggerEvent("submit", 'Hello Grayly');
    },
    bindChange: function (e) {
      const val = e.detail.value
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]]
      })
      var totalDay = getDays(this.data.year, this.data.month);
      var changeDate = [];
      for (let i = 1; i <= totalDay; i++) {
        changeDate.push(i)
      }
      this.setData({
        days: changeDate
      })
    }
  }
})
