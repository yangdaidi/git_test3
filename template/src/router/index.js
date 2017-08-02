import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
// pages (add pages)
import index from '@/pages/index'

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
	            component: index
	        },
	        //首页
	        {
	            path: '/index',
	            component: index
	        },
	        // 新添加页面参考index
 	  	]
  	}]
})