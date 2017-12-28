// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import milkteaLandpage from '@/pages/milkteaLandpage'
// import router from './router'
import '@/config/hubble'
import '@/config/rem'
import '@/style/reset.css'
import '@/style/util.css'
// import FastClick from 'fastclick'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // router,
  template: '<milkteaLandpage/>',
  components: { milkteaLandpage }
})