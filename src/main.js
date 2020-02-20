import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import '@fortawesome/fontawesome-free/js/all'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '../src/assets/sass/default.sass'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
