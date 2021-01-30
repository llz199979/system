import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
// import store from '../store'
// import vue from 'vue'
import { Message, MessageBox } from 'element-ui'
axios.defaults.withCredentials = false

// 创建axios实例
let key = true;
const service = axios.create({
  // baseURL : 'http://192.168.1.238:8080',
  // 基础地址（协议、地址、端口号）
  baseURL: 'https://sports.mjktech.com.cn',
  // 请求间隔
  timeout: 500000
})
// request拦截器
service.interceptors.request.use(config => {
  // console.log(config);
  return config
}, error => {
  // console.error(error)
  Promise.reject(error)
})
// response拦截器：
service.interceptors.response.use(response => {
  const res = response.data;
  key = true;
  // console.log(response.status)
  // console.log(response)
  if (response.status === 200 && res.code == 1) {
    // 请求成功
    // 如果方法不是get的话，就弹出成功提示
    if(response.config.method != 'get') {
      // console.log(res)
      Message({
        type: 'success',
        message: res.msg
      })
    }
    return response
  }
  // console.log('reponse')
  // console.log(response)
  let msg = '(＠_＠;)';
  if(res.msg) {
    msg += res.msg;
  }
  if(res.data) {
    msg += res.data;
  }
  Message({
    type: 'error',
    message: msg, //+ res.data.massage
    center: true,
    duration: 5000,
    showClose: true
  })
  return Promise.reject(res)
}, err =>{
  // console.log('defeat');
  let obj = err.response;
  if(key && obj.data.code === 70001){
    // 后台设置token有效时长，超出则token无效，清除存取数据
    key = false;
    store.dispatch('removeLogin')
    let local = this.$i18n.locale;
    Message({
        showClose : true,
        message : local==='en'?'Token expired invalid, please login again':local==='zh'?'token过期无效，请重新登录':'tokenの期限切れは無効です。再登録してください。',
        type : 'error',
        duration : 3000,
    })
    window.location.href="/login";
  //  router.push('/login');
}
  return err;
})
export default service
