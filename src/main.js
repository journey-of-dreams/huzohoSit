import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
import axios from 'axios'
import './utils/rem.js'
import VueLazyload from 'vue-lazyload'
import moment from 'moment'

//全局变量暴露导入
import configCommon from './utils/configCommon.js'
Vue.prototype.configCommon=configCommon;

// 时间戳转化
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(VueLazyload)
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/assets/img/图片-加载失败.svg',
  loading: '/assets/img/huhozo.png',
  attempt: 1
})

//时间戳转日期格式
Vue.filter('formatDate', (value) => {
  return moment(value).format('YYYY-MM-DD')
})


// var  vConsole  =  new vconsole ()
// console.log(vConsole);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')