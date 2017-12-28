import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
// pages (add pages)
import address from '@/pages/address'

Vue.use(Router)

export default new Router({
  	routes: [{
 	  	path: '/',
 	  	component: App,
 	  	children: [
	 	  	//地址为空时跳转index
	        {
	            path: '',
	            // redirect: '/index'
	            component: address
	        },
	        //首页
	        {
	            path: '/address',
	            component: address
	        },
	        // 新添加单页面参考address
 	  	]
  	}]
})