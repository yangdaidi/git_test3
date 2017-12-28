<!-- 
组件功能： 回到顶部组件
使用方法：
        1.模块引入（驼峰写法，实际使用时用‘-’替换）
          import topBar from '../components/topBar'
        2.组件注册
          components:{ topBar },
        3.组件使用(组件中间的内容会作为内容分发替换<slot></slot>)
          <top-bar ref="gotoTop" :type="'gotoTop'"></top-bar>
-->
<template>
  <div class="u-topBar" v-on:click="moveTop" v-if="showTopBar">
    <slot></slot>    
  </div>
</template>

<script>
import tool from '../store/tool'
import { throttle } from '../store/throttle.js'

export default {
	data(){
        return{
          showTopBar:false,
        }
    },
    mounted(){
      this.initPosition();
      this.initScroll();
      // console.log("mask type:",this.type);
    },
    props: {
      'type': '',
    },
    methods: {
      initPosition(){
        var self = this;
        if(tool.getScrollTop()>tool.getWindowHeight()*1.4){
          self.showTopBar = true;
        }else{
          self.showTopBar = false;
        }
      },
      initScroll(){
        var self = this;
        document.onscroll = throttle(250, function() {
          if(tool.getScrollTop()>tool.getWindowHeight()*1.4){
            self.showTopBar = true;
          }else{
            self.showTopBar = false;
          }
        });
      },
      moveTop(){
        tool.moveToTop();
      }
    }
}
</script>

<style scoped lang="less"> 
.u-topBar{
  z-index: 100;
  height: 0.36rem;
  width: 0.36rem;
  display: inline-block;
  position: fixed;
  bottom: 0.2rem;
  right: 0.2rem;
  background: url(../assets/topBar.png) no-repeat;
  background-size: contain;
}
</style>
