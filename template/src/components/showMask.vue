<!-- 
组件功能： 通用遮罩弹窗，分享弹框
使用方法：
        1.模块引入（驼峰写法，实际使用时用‘-’替换）
          import showMask from '../components/showMask'
        2.组件注册
          components:{ showMask },
        3.组件使用(组件中间的内容会作为内容分发替换<slot></slot>)
          <show-mask ref="mask" :type="'share'" @ok="hello">
            ... //内容分发
          </show-mask> 
参数说明：
        1. :绑定的参数，会在props中接受
        2. @自定义事件(eg: @ok)，可通过this.$emit('ok')触发，ok的this指向为调用该组件的模块
        3. type: （必传）用户控制显示样式，share(分享遮罩)
        3. maskNotClose: （可选）点击遮罩是否关闭弹框，默认为关闭：false
          为了使弹框slot区域可点击，需在slot最外层标签上添加冒泡阻止事件，阻止默认关闭弹框
          但是，像clipboard这类插件，通过事件代理，将事件绑定到body上，如果阻止冒泡则无法正常使用，于是需要允许冒泡，但又不能关闭弹窗，于是只能通过控制点击遮罩不关闭弹框来解决。
-->
<template>
  <div class="u-mask" :class="'m-'+type" v-on:click="destory" v-if="showmask">
    <div class="mask-tcell" ref="maskTcell" :class="animateClass" v-show="type=='alert'||type=='dialog'||type=='toast'">
        <span v-if="type=='toast'">{{toastMsg}}</span>
      <slot></slot>    
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
	data(){
        return{
          showmask:false,
          animateClass:'',
          toastMsg:'',
        }
    },
    mounted(){
      // console.log("mask type:",this.type);
    },
    props: {
      'type': '',
      'maskNotClose':false,//组件中传递该值为true，则点击遮罩不关闭弹框（1.遮罩上面默认带关闭按钮，）
    },
    methods: {
        show(msg) {
          // this.$emit("ok")
          this.showmask = true;
          var self = this;
         
          // Vue.nextTick(function(argument) {
          //    setTimeout(function(){
          //     self.animateClass = 'n-animated';
          //   },10)
          // })
          if(msg&&this.type=="toast"){
            this.toastMsg = msg;
            setTimeout(function(){
                self.toastMsg='';
                self.close();
            },1000)
          }
        },
        close() {
          this.showmask = false;
        },
        destory() {
          if(!this.maskNotClose){
            this.showmask = false;
          }
        }
    }
}
</script>

<style scoped lang="less"> 
.u-mask{
  position: fixed;
  z-index:999;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.6);
}
/* 浏览器打开遮罩 */
.u-mask.m-share{
  background: url(../assets/mask.png) no-repeat;
  background-size: 100% 100%;
}
/* 发送给小伙伴遮罩 */
.u-mask.m-share2{
  background: url(../assets/mask2.png) no-repeat;
  background-size: 100% 100%;
}
/*弹框遮罩*/
.u-mask.m-alert,.u-mask.m-dialog{display: table !important;}
.u-mask.m-toast,{
  display: table !important;
  background: rgba(0,0,0,0);
}
.u-mask .mask-tcell{
  display: table-cell;
  vertical-align: middle;
  text-align: center; 
  /*transform: scale(.7);
  -webkit-transition: transform .3s,opacity .3s;
  -moz-transition: transform .3s,opacity .3s;
  transition: transform .3s,opacity .3s;*/
}
.u-mask .mask-tcell>span{
  display: inline-block;
  max-width: 3.2rem;
  /*min-width: 1.6rem;*/
  border-radius: 0.08rem;
  padding: 0.1rem 0.2rem;
  line-height: 0.2rem;
  font-size: 0.16rem;
  margin:0 auto;
  /*background: #fff;*/
  background: rgba(0,0,0,.6);
  color: #fff;
  font-family: PingFangSC-Regular, sans-serif !important;
}

.u-mask .n-animated{
  -webkit-transform: scale(1); 
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1); 
  opacity: 1;
  -webkit-transition: transform .3s,opacity .3s;
  -moz-transition: transform .3s,opacity .3s;
  transition: transform .3s,opacity .3s;
}
</style>
