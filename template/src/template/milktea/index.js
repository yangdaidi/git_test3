// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import milktea from '@/pages/milktea'
// import router from './router'
import '@/config/hubble'
import '@/config/rem'
import '@/style/reset.css'
// import FastClick from 'fastclick'

Vue.config.productionTip = false

if(!window.jsBrideReadyStatus){
	if(!!window.YixinJSBridge){
		new Vue({
		  el: '#app',
		  // router,
		  template: '<milktea/>',
		  components: { milktea }
		})
	}else{
		document.addEventListener('YixinJSBridgeReady', function() {
			window.jsBrideReadyStatus = true;
			new Vue({
			  el: '#app',
			  // router,
			  template: '<milktea/>',
			  components: { milktea }
			})
		})
	}
}