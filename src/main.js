import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from './axios'
Vue.prototype.axios = axios
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')


