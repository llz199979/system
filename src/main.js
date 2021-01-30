import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios);
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true, // 启用 inline 模式
    'button': true, // 显示右上角关闭按钮
    'navbar': true, // 显示缩略图导航
    'title': true, // 显示当前图片的标题
    'toolbar': true, // 显示工具栏
    'tooltip': true, // 显示缩放百分比
    'movable': true, // 图片是否可移动
    'zoomable': true, // 图片是否可缩放
    'rotatable': true, // 图片是否可旋转
    'scalable': true, // 图片是否可翻转
    'transition': true, // 使用 CSS3 过度
    'fullscreen': true, // 播放时是否全屏
    'keyboard': true, // 是否支持键盘
    'url': 'data-source' // 设置大图片的 url
  }
})

// 引入element-UI
import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
// import '../theme/index.css'
import './styles.scss'
// 引入vue国际化
import i18n from './lang/index'
// 引入简单动画css
import animated from 'animate.css' 
// 拖拽弹窗
import elDragDialog from './directive/drag/index';
import rules from './utils/rules';
// import './element-variables.scss'
import VeCharts from 've-charts';


Vue.use(VeCharts)
Vue.use(animated);
Vue.use(elDragDialog);
// Vue.use(ElementUI, { locale })
// Vue.use(ElementUI)
// import VueI18n from 'vue-i18n';
// Vue.use(VueI18n)  //通过插件的形式挂载

// 引入element-UI 中英切换
Vue.prototype.rules = rules;

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 数组删除方法
Array.prototype.delete = function(id) {
  let i = this.indexOf(id);
  this.splice(i, 1);
}
// rules el-form表格提交时的判别标准

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  echarts,
  render: h => h(App)
}).$mount('#app')
