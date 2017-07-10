import Vue from 'vue'

//引入App组件
import App from './App.vue'

//引入MuseUI
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

//引入MintUI部分组件
import { Toast,MessageBox  } from 'mint-ui'
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);


//引入路由
import router from './router/index.js'


//引入 Vue的Ajax
import axios from 'axios'
Vue.prototype.$http = axios; //把axios对象挂到Vue原型上


import Mock from './mock/index.js'
Mock.mock();

//引入全局管理vuex
import store from './store/index.js'

//引入全局 filters
import * as times from './filters/times.js'
Object.keys(times).forEach(key=>{
  Vue.filter(key,times[key])
})


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
