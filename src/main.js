import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores/store'

// 引入axios库
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
})

// 引入全局 组件scroll 
import Scroller from './components/Scroller/scroller.vue'
Vue.component('scroller',Scroller)

import Loading from './components/Loading/load.vue'
Vue.component('loading', Loading)

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
