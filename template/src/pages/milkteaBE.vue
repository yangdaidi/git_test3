<template>
  <div class="index-page ">
    <show-mask ref="maskToast" :type="'toast'"></show-mask>
    <transition name="fade">
      <div class="page0" v-show="pageIndex==-1">
        <div class="title1"></div>
        <div class="title2">商家兑换平台</div>
        <a href="javascript:void(0)" class="weui-btn weui-btn_primary" style="margin: 0.15rem;" @click="wechatLogin">微信登录</a>
        <!-- <div class="title2">
        1，测试服无法进行微信授权<br>
        2，此处为模拟登录，登录accid：31870<br>
        3，商户白名单功能需要线上验证<br>
        4，本注释线上验证时去掉<br>
        </div> -->
      </div>
    </transition>
    <transition name="fade">
      <div class="page0" v-show="pageIndex==0">
        <div class="title1"></div>
        <div class="title2">商家兑换平台</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入游戏昵称" v-model="code.content" @input="codeInputCheck">
                </div>
            </div>
        </div>
        <a href="javascript:void(0)" class="weui-btn weui-btn_primary" :class="err.code?'weui-btn_disabled':''" style="margin: 0.15rem;" @click="codeCheck">立即使用</a>
      </div>
    </transition>
    <transition name="fade">
      <div class="page0" v-show="pageIndex==1">
        <div class="title1"></div>
        <div class="title2">商家兑换平台</div>
        <div class="success-box">
          <i class="weui-icon-success weui-icon_msg"></i>
          <div class="code">{{code.content}} 兑换成功！</div>
          <div class="code-tip">请发放对应的奶茶/甜品给玩家</div>
          <div class="code-back">
            <a href="javascript:void(0)" class="weui-btn weui-btn_plain-primary" @click="gobackCheck">继续兑换</a>
          </div>
        </div>
      </div>
    </transition>
    <div class="u-legal-tips" v-show="!isLegal" v-if="pageIndex==-2">{{ errTips }}</div>
  </div>
</template>

<script>
// 组件引入
import showMask from '../components/showMask'

import tool from '../store/tool'
import weixin from '../store/weixin'
import { fetch } from '../store/fetch'
import { milkteaAPI } from '../config/lrs.api'

export default {
  name: 'milkteaBE',
  data() {
    return {
      // 环境变量
      os:'',
      isWeixin:true,
      // 页面控制显示变量
      pageIndex: -2,
      isLegal:true,
      errTips:'',
      // 活动变量
      activityid:'milkteaBE',
      hasJoin: false,
      cookieid:'',
      phone:'',
      err:{
        phone:false,
        code:true,
      },
      code:{
        focusStatus:false,
        content:'',
      },
    }
  },
  components:{
    showMask
  },
  mounted(){
    this.initEnv();
    if(!this.isWeixin){
      this.pageError("请在微信中打开页面");
    }else{
      this.checkLogin();
    }
    this.initShare();
  },
  methods: {
    loginTest(){
      // this.cookieid = 31870;
      this.checkLogin();
    },
    stopBubble(ev){
      ev.stopPropagation();
    },
    /**
     * [initEnv 环境变量初始化]
     * @return {[type]} [description]
     */
    initEnv(){
      tool.DATrackerTool('','logout')
      this.os = tool.isAndroid() ? 'aos' : 'ios'; //ios
      this.isWeixin = tool.isWeixin();
    },
    /**
     * [pageError 页面参数无效等]
     * @return {[type]} [description]
     */
    pageError(err){
      this.goPageIndex(-2);
      this.isLegal = false;
      this.errTips = err;
    },
    /**
     * [goPageIndex 调整到指定page]
     * @param  {[type]} index [page index]
     * @return {[type]}       [description]
     */
    goPageIndex(index){
      this.pageIndex = index;
    },
    // wx step 1: 获取用户自己信息
    checkLogin() {
      let self = this;
      if(!!tool.getCookie('login_accid')){
        this.cookieid = tool.getCookie('login_accid')
      }
      if(!!this.cookieid){
          tool.DATrackerTool(this.cookieid,'login');
          let fetchUrl  = milkteaAPI.checkAPI;
          fetch(fetchUrl).then((res) => {
            return res.response;
          }).then((json) => {
            if (json.code === 1){
              self.goPageIndex(0);
              // self.logout();
            }else if(json.code==40005){
              self.pageError("暂时无法使用此功能");
            }else{
              throw Error(json);
            }
          }).catch((error) => {
            self.goPageIndex(-1);//手动授权
            // weixin.oauth2();//自动授权
          });
      }else{
        self.goPageIndex(-1);//手动授权
        // weixin.oauth2();//自动授权
      }
    },
    /**
     * [wechatLogin 微信授权]
     * @return {[type]} [description]
     */
    wechatLogin(){
      if(tool.isOnline()){
        weixin.oauth2();//线上才能授权
      }else{
        tool.setCookie("login_accid",'31870',1);
        this.checkLogin();
      }
    },
    /**
     * [codeInputCheck 兑换码输入校验]
     * @return {[type]} [description]
     */
    codeInputCheck(){
      if(this.code.content.trim()!=''){
        this.err.code = false;
      }else{
        this.err.code = true;
      }
    },
    /**
     * [codeCheck 兑换码server校验]
     * json.code:
     *   @Message("兑换码不存在") 40001
     *   @Message("兑换码已使用过，请勿重复使用") 40002
     *   @Message("兑换期已过") 40003
     *   @Message("奖励码不符合规范") 40004
     * @return {[type]} [description]
     */
    codeCheck(){
      if(this.err.code) return;
      var self  = this;
      let fetchUrl  = milkteaAPI.nick+"?nick="+self.code.content;
      fetch(fetchUrl).then((res) => {
        return res.response;
      }).then((json) => {
        if (json.code === 1){ 
          self.pageIndex = 1;
        }else if(json.code == 8 ||json.code == 40001 || json.code == 40002 || json.code == 40003 || json.code == 40004){
          self.$refs.maskToast.show(json.message);// 开启遮罩
        }else{
          throw Error(json);
        }
      }).catch((error) => {
        console.info("get info failed:",error);
      });
    },
    /**
     * [gobackCheck 继续验证]
     * @return {[type]} [description]
     */
    gobackCheck(){
      this.code.content='';
      this.err.code = true;
      this.goPageIndex(0);
    },


    // 校验用户是否已经参加活动
    logout(){
      var self  = this;
      let fetchUrl  = milkteaAPI.logout;
      fetch(fetchUrl).then((res) => {
        return res.response;
      }).then((json) => {
        if (json.code === 1){

        }else {
          throw Error(json);
        }
      }).catch((error) => {
        console.info("get info failed:",error);
      });
    },

    /**
     * [initShare 微信活动页面，在微信内分享]
     * @return {[type]} [description]
     */
    initShare: function() {
      var shareInfo = {
          title1: "奇幻狼人杀商家兑换平台",
          title2: "奇幻狼人杀商家兑换平台",
          desc: "奇幻狼人杀商家兑换平台",
          link: document.URL,
          imgUrl: "https://lrs.163.com/logo_120.png",
      }
      weixin.share(shareInfo);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.fade-enter-active, .fade-leave-active {transition: opacity 1s}
.fade-enter, .fade-leave-to{opacity: 0}
.index-page{
  position: relative;
  font-family: 'HuakangYuanTi';
  font-size:14px;
  height: 100%;
  width: 3.6rem;
  margin:0 auto;
  background:#f8f8f8;
  .page0{
    position: absolute;
    top: 0;
    width: 3.6rem;
    height: 6.4rem;
    padding: 0.4rem 0;
    box-sizing: border-box;
    .title1{
      height: 0.5rem;
      background: url(../assets/milktea/logo.png) no-repeat center;
      background-size:contain; 
      font-size: 0.2rem;
      text-align: center;
    }
    .title2{
      font-size: 0.12rem;
      text-align: center;
      color: #888;
      margin: 0.1rem 0 0.6rem;
    }
    .success-box{
      text-align: center;
      .code{font-size: 0.18rem;margin-top:0.1rem;}
      .code-tip{font-size: 0.12rem;color:#999;margin-top: 0.04rem;}
      .code-back{padding:0.8rem;box-sizing: border-box;}
    }
  }
}
</style>
