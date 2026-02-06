/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-20 17:18:01
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-22 15:02:12
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/utils/PVUV.ts
 */
import Cookies from 'js-cookie'  //取到用户信息唯一标识
import router from '../router'   //获取到路由表来监听当页的路由
// import request from './request'  //封装的axios请求
let ipobj = {
  usid: '',
  time: '',
  event: '',
  flag: false,
  pg: '',
  prepg: '',
  bl: ''
}                  
// 把当前时间换成yyyy-mm-dd hh:mm:ss格式
function currentDate(date: any){
  let year = date.getFullYear();        //年 从 Date 对象以四位数字返回年份
  let month = date.getMonth() + 1;      //月 从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
  let day = date.getDate();             //日 从 Date 对象返回一个月中的某一天 (1 ~ 31)
  let hours = date.getHours();          //小时 返回 Date 对象的小时 (0 ~ 23)
  let minutes = date.getMinutes();      //分钟 返回 Date 对象的分钟 (0 ~ 59)
  let seconds = date.getSeconds();      //秒 返回 Date 对象的秒数 (0 ~ 59)
  //修改月份格式
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  //修改日期格式
  if (day >= 0 && day <= 9) {
      day = "0" + day;
  }
  //修改小时格式
  if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
  }
  //修改分钟格式
  if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
  }
  //修改秒格式
  if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
  }
  //格式(yyyy-mm-dd hh:mm:ss)
  let currentFormatDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return currentFormatDate;
}
// 获取当前页面的标识  以路由每个页面的name为准
router.beforeEach((to,from,next)=>{
  let  urlName = to.meta.title?to.meta.title:"";
  let  preUrl = from.meta.title?from.meta.title:"";
  window.sessionStorage.setItem("url",urlName.replace(/\s+/g,''))      //当前页面 pg
  window.sessionStorage.setItem("preUrl",preUrl.replace(/\s+/g,''))    //上一个页面 prepg
  next()
})


ipobj.usid = Cookies.get('userName');        //用户的唯一标识 usid
// ipobj.ip = window.returnCitySN['cip'];                          // 获取电脑的ip ip
ipobj.time = currentDate(new Date())

// 获取当前触发的事件    点击触发事件才会上报
function getEvent(e: any,type: boolean){
  //type是非上报接口，普通有接口要触发的按钮传true
  if(type){
    // 从新获取事件和当前事件  把普通接口为true的值赋值  就return不走上报接口了
    ipobj.time = currentDate(new Date())   
    ipobj.event = e; 
    ipobj.flag = type;
    return
  }
  // 需要上报接口  恢复默认值
  ipobj.flag =false 
  ipobj.time = currentDate(new Date())   //获取当前时间  time
  ipobj.event = e;                                                                         //获取当前触发的事件 event
  setTimeout(()=>{
    ipobj.pg = window.sessionStorage.getItem("url")?window.sessionStorage.getItem("url"):""
    ipobj.prepg = window.sessionStorage.getItem("preUrl")?window.sessionStorage.getItem("preUrl"):""
    // request.post("上报的接口",{},false).then(res=>{}) 
  },200)                  
}
// 精确获取当前在哪个页面的那个模块
function getBl(e: string){
  ipobj.time = currentDate(new Date())   //获取当前时间  time
  ipobj.bl = e.replace(/\s+/g,'');  
  // request.post("上报的接口",{},false).then(res=>{})    //获取在页面的那个模块内 bl
}
export default {
  ipobj,//要传给headers的值{}
  getEvent,//要抛出挂载到Vue全局在每个页面触发事件时调用，参数2个，（事件类型，布尔值——点击触发事件的普通接口传true）
  getBl //获取到某个页面的某个模块
}
