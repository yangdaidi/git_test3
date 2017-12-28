<template>
  <div class="index-page ">
    <div class="page1"></div>
    <div class="page2">
      <div class="share-btn" @click="ntWeixinShare"></div>
    </div>
    <div class="page3" id="jumpCooperation"></div>
    <div class="page4"></div>
  </div>
</template>

<script>
import tool from '../store/tool'
import native from '../store/native'
export default {
  name: 'milktea',
  data() {
    return {
      os:'',
      isWeixin:false,
      pageIndex: -2,
      activityid:'milktea',
      accid:0,
      accid_userInfo:null,
    }
  },

  mounted(){
    this.initEnv();
    this.ntGetCurrentUserInfo();
  },
  methods: {
    /**
     * [initEnv 环境变量初始化]
     * @return {[type]} [description]
     */
    initEnv(){
      tool.DATrackerTool('','logout')
      this.os = tool.isAndroid() ? 'aos' : 'ios'; //ios
      this.isWeixin = tool.isWeixin();
    },
    // 获取用户id
    ntGetCurrentUserInfo() {
      native.getCurrentUserInfo(function(data){
        this.accid = data.accId;
        // native.toast(this.accid)
        tool.DATrackerTool(this.accid,'login')
        tool.DATrackerTool("milktea_source",'source')
      }.bind(this))
    },

    ntWeixinShare(){
      tool.DATrackerTool("milktea__shareBtn")
      // let headImg = this.accid_userInfo?this.accid_userInfo.headImg:'';
      // let ownInfo = {
      //   accid:this.accid,
      //   headImg: headImg,
      //   nick: this.accid_userInfo.nick,
      // };
      var shareInfo = {
          title: "@杭州大学生丨冬季福利！奶茶甜品免费送啦",
          desc: "10元奶茶任意挑选、10元甜品任意组合，来奇幻狼人杀，领免费甜品兑换券~",
          // link: location.origin+"/anno/milkteaLandpage.html?ownInfo="+encodeURIComponent(JSON.stringify(ownInfo)),
          link: location.origin+"/anno/milkteaLandpage.html?sourceFrom=appShare",
          imgUrl: "https://nos.netease.com/yxupdate/fm_milktea",
          // target : ["WexinTimeline", "Weixin", "Yixin", "YixinTimeline", "QQ"]
          target : ["WeixinTimeline", "Weixin", "QQ"]
      }
      native.shareTo(shareInfo);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rex : 1rem/100;
@rex2 : 1rem*360/100/375;
.index-page{
  font-family: 'HuakangYuanTi';
  font-size:14px;
  height: 100%;
  width: 100%;
  .page1{
    width: 100%;
    height: 368*@rex2;
    background: url(../assets/milktea/in_1.jpg) no-repeat;
    background-size:100%; 
  }
  .page2{
    width: 100%;
    height: 304*@rex2;
    background: url(../assets/milktea/in_2.jpg) no-repeat;
    background-size:100%;
    padding-top: 230*@rex2;
    box-sizing: border-box;
    .share-btn{
      width: 100%;
      height: 54*@rex2;
    }
  }
  .page3{
    width: 100%;
    height: 304*@rex2;
    background: url(../assets/milktea/in_3.jpg) no-repeat;
    background-size:100%; 
  }
  .page4{
    width: 100%;
    height: 279*@rex2;
    background: url(../assets/milktea/in_4.jpg) no-repeat;
    background-size:100%; 
  }
}
</style>
