import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import less from 'less'
Vue.use(less)

Vue.config.productionTip = false//是否需要显示删除信息

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')//挂载功能，和el：没有区别
