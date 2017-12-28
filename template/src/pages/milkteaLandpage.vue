<template>
  <div class="index-page ">
    <show-mask ref="maskToast" :type="'toast'"></show-mask>
    <show-mask ref="maskShare" :type="'share'"></show-mask>
    <show-mask ref="maskShare2" :type="'share2'"></show-mask>
    <div class="page1"></div>
    <div class="page2">
      <div class="download-btn" @click="downloadApp"></div>
      <div class="share-btn" @click="shareToFriend"></div>
    </div>
    <div class="page3"></div>
    <div class="page4"></div>
    <div class="page5"></div>
  </div>
</template>

<script>
import showMask from '../components/showMask'
import tool from '../store/tool'
import weixin from '../store/weixin'
export default {
  name: 'milkteaLandpage',
  data() {
    return {
      // 环境变量
      os:'',
      isWeixin:false,
      // 页面控制显示变量
      pageIndex: -2,
      isLegal:true,
      errTips:'',
      activityid:'milkteaLandpage',
    }
  },
  components:{
    showMask
  },
  mounted(){
    this.initEnv();
    this.initShare();
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
      tool.DATrackerTool("milkteaLandpage_visit");
    },

    // 用户下载 & 引导
    showMask:function(ev){
      this.$refs.maskShare.show();
    },

    downloadApp(){
      tool.DATrackerTool("milkteaLandpage_downloadBtn");
      tool.downloadApp(this.isWeixin,this.os,this.showMask);
    },

    /**
     * [shareToFriend 页面中引导用户分享]
     * @return {[type]} [description]
     */
    shareToFriend(){
      tool.DATrackerTool("milkteaLandpage_shareBtn");
      if(this.isWeixin){
        this.$refs.maskShare2.show();
      }else{
        this.$refs.maskToast.show("只能在微信中分享哦～")
      }
    },

    /**
     * [initShare 微信活动页面，在微信内分享]
     * @return {[type]} [description]
     */
    initShare: function() {
      var shareInfo = {
          title1: "@杭州大学生丨冬季福利！奶茶甜品免费送啦",
          title2: "@杭州大学生丨冬季福利！奶茶甜品免费送啦",
          desc: "10元奶茶任意挑选、10元甜品任意组合，来奇幻狼人杀，领免费甜品兑换券~",
          link: document.URL,
          imgUrl: "https://nos.netease.com/yxupdate/fm_milktea",
      }
      weixin.share(shareInfo);
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
  min-height: 100%;
  width: 375*@rex2;
  margin: 0 auto;
  .page1{
    width: 375*@rex2;
    height: 368*@rex2;
    background: url(../assets/milktea/out_1.jpg) no-repeat center;
    background-size:cover; 
  }
  .page2{
    width: 375*@rex2;
    height: 304*@rex2;
    background: url(../assets/milktea/out_2.jpg) no-repeat center;
    background-size:cover;
    padding-top: 230*@rex2;
    box-sizing: border-box;
    .download-btn{
      display: inline-block;
      width: 54%;
      height: 54*@rex2;

    }
    .share-btn{
      display: inline-block;
      width: 44%;
      height: 54*@rex2;
    }
  }
  .page3{
    width: 375*@rex2;
    height: 436*@rex2;
    background: url(../assets/milktea/out_3.jpg) no-repeat center;
    background-size:cover; 
  }
  .page4{
    width: 375*@rex2;
    height: 304*@rex2;
    background: url(../assets/milktea/out_4.jpg) no-repeat center;
    background-size:cover; 
  }
  .page5{
    width: 375*@rex2;
    height: 279*@rex2;
    background: url(../assets/milktea/out_5.jpg) no-repeat center;
    background-size:cover;
  }
}
</style>
