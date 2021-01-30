import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import addRouter from './modules/addRouter'
import system from './modules/system'
import device from './modules/device'
import corporation from './modules/corporation'
import attendence from './modules/attendence'
import file from './modules/file'
// 引入动态路由表
import { asyncRouterMap } from '../router/asyncRouterMap'
// 引入localStorage封装函数
import { setItem, getItem, removeItem } from '../utils/token'
// 引入函数库
import fx from '../utils/fx';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asyncRouterMap: asyncRouterMap, //动态路由列表
    authorization: '',   //登录后获取的token信息，请求凭证
    user: {
      role: ''           //登录者的角色，即管理权限
    },
    breadList: [],       //面包屑列表
    theme: ''            //主题
  },
  getters,
  mutations: {
    set_breadList(state, bread) { //同步请求设置面包屑
      // 通过Array find方法来判断面包屑列表中是否有重复的路由，
      // 重复则赋给flag当前重复的值，否则返回undefined
      let flag = state.breadList.find(v => {
      
        return v.path == bread.path;
      })
    
      // 如果点击路由与面包屑列表不重复时，即flag为undefined时添加当前路由到该列表
      if(!flag){
        state.breadList.push(bread);
      }
    },
    delete_breadList(state, i) {  //同步请求删除当前面包屑路由
    
      // 获取当前路由索引，通过Array splice方法剪切出去
      state.breadList.splice(i, 1); 
   
    },
    themeChange(state, theme) {   //主题改变
      state.theme = theme;
      setItem('theme', theme);
    }
  },
  actions: {
    // 登录状态
    async login({ state, dispatch }, user) {
      // 页面主题默认主题
      if(!getItem('theme')) {
        setItem('theme', '#0E80F7');
      }
      let url = '/login',
          methods = 'post',
          data = user;
          // 登录接口,取token 及部分用户信息
      await fx.setConnect({url, methods, data})
      .then(res => {
        let data  = res.data.data;
          // 将获取的token存到localStorage中，几乎每个命令都需要用到token，这样可以随调随取。
          setItem('token', data.token);
          // 将获取的name存到localStorage中
          setItem('name', data.name);
          setItem('routeName', data.routeName);
          // 将获取的用户名存到localStorage中
          setItem('username', data.userName);
      })
 
      // 获取登录用户的路由顶级目录
      url = '/system/getCatalogue';
      await fx.setConnect({url})
      .then(res => {
        // 返回值为对象，直接存取localStorage中只会得到类似['object']的字符串,无法使用
        // 故而先将其通过JSON.stringify 转化成JSON字符串，需要使用的时候再通过JSON.parse()转换回去即可
        setItem('catalogue', JSON.stringify(res.data.data));
      })
      // 获取权限列表(二三级路由)，之后需要插入到顶级目录中，组成动态权限路由
      url = '/getUserRole';
      await fx.setConnect({url})
      .then(res => {
    
        // 道理同上
        localStorage.setItem('branch', JSON.stringify(res.data.data))
      }) 
    },
    // 加载目录 get /system/getCatalogue
    getCatalogue({}) {
      let url = '/system/getCatalogue';
      fx.setConnect({url})
      .then(res => {
        // 道理同上
        setItem('catalogue', JSON.stringify(res.data.data));
      })
    },
    // 权限列表获取
    getUserRole({state}) {
      let url = '/getUserRole';
      let method = 'post';
      fx.setConnect({url, method})
      .then(res => {
     
        localStorage.setItem('branch', JSON.stringify(res.data.data))
      })
    },
    // 添加面包屑
    addBreadCrumb({ state, commit }, bread) {
  
      // 点击导航条便会触发该方法，来存面包屑列表的路由集合
      commit('set_breadList', bread)
      
    },
    // 修改当前登录用户密码 post /userPasswordUpd
    updatePassword({state}, data) {
      return new Promise((resolve, reject) => {
        let url = `/userPasswordUpd`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
        
          resolve();
        }).catch(err => {
       
        })
      })
    },
    // 用户注销操作，删除用户登录之后localStorage值防止未登录状态访问
    removeLogin({state}) {
      removeItem('token');      // 清除登录时返回的Token值
      removeItem('name');       // 清除登录者的姓名
      removeItem('username');   // 清除存取的用户名
      removeItem('branch');     // 清除二三级路由
      removeItem('tree');       // 清除加工过的路由总表
      removeItem('catalogue');  // 清除顶级路由
      this.breadList = [];      // 清空面包屑列表
    
    }
  },
  modules: {      // 引入模块儿
    file,         // 文件（excel、图片等）上传
    system,       // 系统管理的请求方法
    device,       // 设备管理的请求方法
    addRouter,    // 动态路由的添加方法
    attendence,   // 考勤管理的请求方法
    corporation   // 公司管理的请求方法
  }
})
