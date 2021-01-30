import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jpLocale from 'element-ui/lib/locale/lang/ja'

Vue.use(VueI18n)
// vue国际化
const i18n = new VueI18n({
    locale: 'zh', //语言标识
    messages: {
    //   zh: {  //第一种写法
    //     ...require('./zh.js'),
    //     ...zhLocale
    // }, //中文语言包
      zh: Object.assign(require('./zh.js'), zhLocale) , 
      en: Object.assign(require('./en.js'), enLocale) , //英文语言包
      jp: Object.assign(require('./jp.js'), jpLocale)
    },
    
    
  })
  export default i18n