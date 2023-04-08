import Vue from 'vue'
import axiosApi from 'axios'
import pinia from './store/store'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false

// eslint-disable-next-line import/first

const axios = axiosApi.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
})

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios = axios
window.baseURL = process.env.VUE_APP_API_URL

new Vue({
  pinia,
  router,
  // store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
