import api from './api'
import axios from 'axios';
import {Message, MessageBox} from 'element-ui'
const fx = {
  getDate (d) {
    if (typeof d === 'string') {
      d = new Date(d)
    }
    let day = d.getDate()/10 < 1 ? '0' + d.getDate() : d.getDate();
    d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + day;
    // d = '' + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
    return d 
  },
  setConnect ( payload ) {
    let Authorization = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      api({
        url: payload.url,
        method: payload.methods ? payload.methods : 'get',
        headers: {
          'Authorization': Authorization
        },
        data: payload.data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  number_Chinese(number) {
    let arr = [0,1,2,3,4,5,6,7];
    let brr = ['日', '一', '二', '三', '四', '五', '六', '天']
    return brr[arr.indexOf(number)];
  },
  getWeather(that) {
    axios.get("https://free-api.heweather.com/v5/weather?key=5a08956dc52c43eca4ee75d77db964c8&city=zhanjiang")
    .then( res => {
      that.weather = res.data.HeWeather5[0];
    }).catch( err => {
    })
  },
  // 浏览器全屏与半全屏展示
  fullScreen() {
    let doc = document.documentElement;
    // doc.mozRequestFullScreen()
    if(doc.requestFullscreen) {             // W3C
      console.log('w3c')
      doc.requestFullscreen();
    }else if(doc.webkitRequestFullscreen) { // chrome
      console.log('chrome')
      doc.webkitRequestFullscreen();
    }else if(doc.mozRequestFullScreen) {    // firefox
      console.log('firefox')
      doc.mozRequestFullScreen();
    }else if(doc.msRequestFullscreen) {     // IE11
      console.log('IE11')
      doc.msRequestFullscreen();
    }else{
      Message.error('您的浏览器不支持全屏展示');
    }
  },
  exitFullScreen() {
    let doc = document;
    if(doc.exitFullscreen) {              //W3c
      console.log('w3c')
      doc.exitFullscreen();
    }else if(doc.webkitExitFullScreen) {  //chrome
      console.log('chrome')
      doc.webkitExitFullScreen();
    }else if(doc.mozCancelFullScreen) {     //firefox
      console.log('firfox')
      doc.mozCancelFullScreen();
    }else if(msExitFullScreen) {          //IE11
      console.log('Ie11')
      doc.msExitFullscreen();
    }
  },
  /**
   * 是否全屏并按键ESC键的方法
   */
  checkFull() {
    var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
    // to fix : false || undefined == undefined
    if (isFull === undefined) {
      isFull = false
    }
    return isFull
   },
  fileHandle(file) {
    const formData = new FormData();
    let upload_file = file.file;
    formData.append('file', upload_file);
    return formData;
  },
  deleteOne () {
    return new Promise((resolve) => {
      MessageBox.confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          resolve(true)
      }).catch(() =>{

      })
    })
  },
  deleteWarning(item) {
      return new Promise((resolve, reject) => {
        if(item && item.length){
          MessageBox.confirm('此操作将批量删除信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
          }).then(() => {
            resolve(1);
          }).catch(() => {
    
          })
        }else{
          Message({
            message: '请选中至少一条数据',
            type: 'error',
            duration: 1500
          })
        }
      })
  }
}
export default fx
