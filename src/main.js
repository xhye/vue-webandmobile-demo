import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api'
import utils from './utils'
import VantUI from 'vant';
import 'vant/lib/index.css';
import global from './global/index'
Vue.prototype.$global = global
// 引入i18n国际化插件
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@/lang/zh.json'),
    'en': require('@/lang/en.json')
  }
})
Vue.use(ElementUI); // 使用ElementUI
Vue.use(VantUI); // 使用Vant
Vue.config.productionTip = false
Vue.prototype.$api = api // 全局Api
Vue.prototype.$utils = utils // 全局Util
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
