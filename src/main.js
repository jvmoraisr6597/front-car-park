import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/app.scss'

Vue.config.productionTip = false

windows._Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
