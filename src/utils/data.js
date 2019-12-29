/**
 * banner数据
 */ 
function getBannerData(){
    var arr = ['../../images/banner_01.png', '../../images/banner_02.png', '../../images/banner_03.png', '../../images/banner_04.png']
    return arr
}
/**
 * 技师 数据
 * */ 
function getSkilledData(){
    var arr = [
                {
                  id:'1',
                  nickname: '李技师',  

                },
                {
                  id: '2',
                  nickname:'张技师',
                },
                {     
                  id: '3',                 
                  nickname:'包技师',
                },
                {
                  id: '4',
                  nickname:'王技师',
                },
                {
                  id: '5',
                  nickname:'黄技师',
                }
            ]
    return arr
}
/**
 * 预约时间段 数据
 * */
function getTimesData() {
  var arr = [
    {
      id: '1',
      time: '08:00-09:00'
    },
    {
      id: '2',
      time: '09:30-10:30'
    },
    {
      id: '3',
      time: '11:00-12:00'
    },
    {
      id: '4',
      time: '12:30-13:30'
    },
    {
      id: '5',
      time: '14:00-15:00'
    },
    {
      id: '6',
      time: '15:30-16:30'
    },
    {
      id: '7',
      time: '17:00-18:00'
    }
  ]
  return arr
}

/**
 * 选择器 数据
 */ 
function getPickerData(){
    var arr =[
        {           
            name:'张三',
            phone:'13812314563',
            province:'北京',
            city:'北京',
            addr:'朝阳区望京悠乐汇A座8011'
        },
        {
            name:'李四',
            phone:'13812314563',
            province:'北京市',
            city:'北京市',
            addr:'朝阳区望京悠乐汇A座4020'
        }
    ]
    return  arr
}
/**
 * 查询 地址
 * */ 
var user_data = userData()
function searchAddrFromAddrs(addrid){
    var result
    for(let i=0;i<user_data.addrs.length;i++){
        var addr = user_data.addrs[i]
        console.log(addr)
        if(addr.addrid == addrid){
            result = addr
        }
    }
    return result || {}
}
/**
 * 用户数据
 * */ 
function userData(){
    var arr = {
                uid:'1',
                nickname:'山炮',
                name:'张三',
                phone:'13833337998',
                avatar:'../../images/avatar.png',
                addrs:[
                   {
                        addrid:'1',
                        name:'张三',
                        phone:'13812314563',
                        province:'北京',
                        city:'直辖市',
                        addr:'朝阳区望京悠乐汇A座8011'
                    },
                    {
                        addrid:'2',
                        name:'李四',
                        phone:'13812314563',
                        province:'北京',
                        city:'直辖市',
                        addr:'朝阳区望京悠乐汇A座4020'
                    } 
                ]
            }
    return arr
}
/**
 * 省
 * */ 
function provinceData(){
    var arr = [
        // {pid:1,pzip:'110000',pname:'北京市'},
        // {pid:2,pzip:'120000',pname:'天津市'}
        '请选择省份','福建省'
    ]
    return arr
}
/**
 * 市
 * */ 
function cityData(){
    var arr = [
        // {cid:1,czip:'110100',cname:'市辖区',pzip:'110000'},
        // {cid:2,czip:'120100',cname:'市辖区',pzip:'120000'}
        '请选择城市','福州市','厦门市','宁德市'
    ]
    return arr
}
/*
 * 对外暴露接口
 */ 
module.exports = {
  getBannerData : getBannerData, 
  getPickerData : getPickerData,
  getSkilledData :getSkilledData,
  getTimesData: getTimesData,
  userData : userData,
  provinceData : provinceData,
  cityData : cityData,
  searchAddrFromAddrs : searchAddrFromAddrs

}