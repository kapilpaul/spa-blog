import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import axios from 'axios'
// import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css'
// window.$ = window.jQuery = require('jquery')
Vue.config.productionTip = false

console.log(
  '%c Developed by Kapil (https://kapilpaul.me)',
  'background-color:#333;padding:20px;color:#fff;border-radius:4px'
)

axios.defaults.baseURL = 'https://webable.digital/bable/wp-json/wp/v2/'
// axios.interceptors.response.use(
//   function(response) {
//     // console.log(response)
//     return response
//   },
//   function(error) {
//     store.dispatch("setSubmitted", false)
//     store.dispatch("setValidationErrors", error.response.data.errors)
//
//     // swal({
//     //     title: 'ERROR !',
//     //     text: error.response.data.error,
//     //     type: 'error',
//     // });
//
//     throw error.response
//   }
// )

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
