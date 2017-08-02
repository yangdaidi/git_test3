<template>
  <div class="choose-page">
    <div v-if="chooseStatus==1" class="pp-choose">
      <div class="choose-tips">选择高质量照片 可以提高照片打印的质量</div>
      <div class="choose-box">
        <div class="choose-item" v-for="(item, index) in photo" :style="item.styleObject" v-on:click="choosePhoto(index)">
          <div v-if="!item.valid" class="valid-mask"></div>
          <i class="unchoosed" :class="{ valid :!item.valid, choosed : item.choosed}"></i>
        </div>
      </div>
      <div class="choose-back-tips">没有满意的照片？回首页继续记录</div>
      <div class="choose-submit" :class="{ 'choose-submit-nomal': choosedNum==10 }" v-on:click="chooseSubmit">完成（{{ choosedNum }}/10）</div>
    </div>

    <div v-if="chooseStatus==2" class="pp-choosed">
      <div class="choosed-title-box">
        <div class="choosed-title1">已成功选择10张照片</div>
        <div class="choosed-title2">为适配打印尺寸，照片可能会被裁剪</div>
      </div>

      <div class="choosed-box">
        <div class="choosed-item" v-for="(item,index) in photo" v-if="item.choosed" :style="item.styleObject"></div>
      </div>
      <router-link to="/address" class="address-btn u-btn-color1" v-on:click="dataAlynasis">马上填写收货地址</router-link>
      <!-- <div class="address-btn" v-on:click="goAddrsess">填写地址</div> -->
      <div class="address-tips">请在2017年4月16日前填完地址，逾期失效</div>
      <div class="choosed-reset" v-on:click="chooseReset">重新选照片<i></i></div>
    </div>
  </div>
</template>

<script>
// 组件的应用采用驼峰写法，实际使用的时候中间用‘-’替换
import native from '../store/native'
import tool from '../store/tool'

export default {
  name: 'choose',
  data() {
    return {
      reRequest: true,
      pagename: '免费印照片',
      photo:[],
      activityInfo:{},
      chooseStatus:0,
      choosedNum: 0,
      maxChoosed: 10,
      chooseLimit: 0,
      submitStatus: false,
      step:'',
      logs:'',
    }
  },
  mounted(){
    // native.setTitle('邀你记录好时光')
    this.ntCaptureNextBackAction()
    this.photoPrintStatus()
  },
  methods: {
    // 获取用户活动信息
    photoPrintStatus() {
      native.requestService({
        activityId: '7eb1d816e54bcc923a21749c38e9ad65',
        method: 'PhotoPrintStatus',
        data: null
      }, function(data){
        if(data.code==0){
          this.activityInfo = data.result;
          // 已经领取福利，且photos不是0，表明已经成功
          if(this.activityInfo.status == 1 && !!this.activityInfo.photos && this.activityInfo.photos!='EMPTY' && this.
            activityInfo.photos!=''){
            native.setTitle('邀你记录好时光')
            this.chooseStatus = 2
          }else{
            native.setTitle('选择照片')
            this.chooseStatus = 1;
          }
          this.photoPrintSelectPhotos(data.result.photos)//渲染已经选择的图片（由于未选择的图片也需要请求，故只能在回调中调用）
        }else{
          // 允许重连一次（保护客户端连接断开的情况）
          if(this.reRequest){
            // native.toast('(测试用,请忽略)重新发送请求中...')
            this.reRequest = false
            // 0.5s后请求重新发送
            setTimeout(function(){
              this.photoPrintStatus()
            }.bind(this),500)
          }
        }
      }.bind(this))
    },
    // 获取符合条件的图片
    photoPrintSelectPhotos(photoStr) {
      native.requestService({
        activityId: '7eb1d816e54bcc923a21749c38e9ad65',
        method: 'PhotoPrintSelectPhotos',
        data: {limit:100}
      }, function(data){
        if(data.code==0){
          var tmp  = data.result.photos.split(';')
          this.photo = []
          this.choosedNum = 0
          for (var i = 0; i < tmp.length; i++) {
            var flagStatus = false;
              // 未传过图，图片不可选，均视为未选中
            if (!!photoStr && photoStr.indexOf(tmp[i].split('?')[0])>-1) {
              flagStatus = true //校验是否选中
              this.choosedNum++;
            }
            if(!/a=0$/.test(tmp[i])){
              var backgroundThumbnail = tmp[i] + "?resize=300x0"
            }else{
              var backgroundThumbnail = tmp[i] + "&resize=200x0"
            }
            // backgroundThumbnail = tmp[i] 
            this.photo.push({
              choosed: flagStatus,
              url:tmp[i],
              valid: !/a=0$/.test(tmp[i]),
              // 图标背景样式
              styleObject: {
                background: "url("+backgroundThumbnail+") center / cover no-repeat",
                // background: "url("+tmp[i]+") center no-repeat",
                // backgroundSize: "cover",
              }
            })
          }
        }
        // native.toast(JSON.stringify(data))
        this.logs = JSON.stringify(data)

        // native.toast(JSON.stringify(data))
      }.bind(this))
    },
    // 选择或取消选择图片
    choosePhoto(index){
      // 如果是已经选中，并且想取消选中
      if(this.photo[index].choosed){
        this.choosedNum--;
        this.photo[index].choosed = false;
      }else{
        if(!this.photo[index].valid){
          native.toast('当前照片质量不符合印刷要求，不可选择')
          return
        }
        if(this.choosedNum >= this.maxChoosed){
          native.toast("最多只能选择"+ this.maxChoosed +"张照片")
        }else{
          this.choosedNum++
          this.photo[index].choosed = true
        }
      }
    },
    chooseSubmit() {
      if(this.choosedNum < this.maxChoosed){
          native.toast("必须选择"+ this.maxChoosed +"张照片，才能提交")
      }else{
        if(this.submitStatus == false){
          tool.dataAlynasis('PrintSelectSave')
          this.submitStatus = true;
          this.photoPrintSet()
        }
      }
    },
    //合并选中的字符串
    mergeAddress() {
      var tmp=[]
      for (var i = 0; i < this.photo.length; i++) {
        if(this.photo[i].choosed)
          tmp.push(this.photo[i].url)
      }
      return tmp.join(';')
    },
    // 上传地址信息后将地址id返回给服务器
    photoPrintSet(){
      var photoStr = this.mergeAddress()
      native.requestService({
        activityId: '7eb1d816e54bcc923a21749c38e9ad65',
        method: 'PhotoPrintSet',
        data: {photos:photoStr}
      }, function(data){
        this.submitStatus = false
        this.chooseStatus = 2;
        native.setTitle('邀你记录好时光')
        // native.toast(JSON.stringify(data))
      }.bind(this))
    },
    chooseReset() {
      tool.dataAlynasis('PrintReselectPicture')
      this.chooseStatus = 1;
      native.setTitle('选择照片')
    },
    // 返回键捕获 实测只能捕获一次，执行之后捕获消失（）
    ntCaptureNextBackAction(){
      // 清除捕获
      native.clearBackActionCapture()
      native.captureNextBackAction(function(){
        this.$router.push('index')
      }.bind(this))
    },
    dataAlynasis() {
      tool.dataAlynasis('PrintAddress')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.choose-page{font-size: 0;padding-bottom: 0.6rem;}
.pp-choose .choose-tips{height: 0.4rem;line-height: 0.4rem;background: #fef8db;font-size: 0.14rem;color: #e99a44;text-align: center;}
.pp-choose .choose-box .choose-item{position: relative;display: inline-block;width:0.92rem;height: 0.92rem;margin-right:0.02rem;margin-bottom: 0.02rem;background: #ccc;}
/*choose-item的nth-of-type并不是找class，而是找到父容器下面所有标签类型，如所有的div，这样如果列表中包含其他div，则会造成干扰*/
.pp-choose .choose-box .choose-item:nth-of-type(4n){margin-right:0;width: 0.93rem;}
.pp-choose .choose-back-tips{text-align: center;font-size: 0.14rem;margin-top:0.12rem;color: #999;}
.pp-choose .unchoosed{display:inline-block;height:0.34rem;width:0.34rem;position:absolute;top:0;right:0;background: url(../assets/choose_normal@3x.png) no-repeat center;background-size: contain;}
.pp-choose .valid{background: url(../assets/choose_invalid@3x.png) no-repeat center;background-size: contain;}
.pp-choose .choosed{background: url(../assets/choose_pressed@3x.png) no-repeat center;background-size: contain;}
.pp-choose .valid-mask{position: absolute;left: 0;top: 0;bottom:0;right:0;background:rgba(255,255,255,0.5);}
.pp-choose .choose-submit{position: fixed;bottom: 0; width: 100%;height:0.5rem;line-height:0.5rem;text-align: center;font-size: 0.16rem;color: #fff;background: #e5e5e5;}
.pp-choose .choose-submit-nomal{
  background: #ffa666;
}
.pp-choose .choose-submit-nomal:active{background: #ffa555;}

/*照片选中成功样式*/
.pp-choosed .choosed-title-box{padding: 0.54rem 0 0.30rem;text-align: center;}
.pp-choosed .choosed-title-box .choosed-title1{font-size: .25rem;color: #333; /*margin-bottom: 0.05rem;*/}
.pp-choosed .choosed-title-box .choosed-title2{font-size: 0.15rem;color: #999;}

.pp-choosed .choosed-box{font-size: 0;padding:0 0.2rem;height: 1.34rem;}
.pp-choosed .choosed-box .choosed-item{display: inline-block;width: 0.65rem;height: 0.65rem;margin-right: 0.02rem;margin-bottom: 0.02rem;background: #12a76b;font-size: 0.12rem;}
.pp-choosed .address-btn{display:block;margin:0.38rem 0.4rem 0.1rem;height: 0.5rem;line-height: 0.5rem;font-size: 0.16rem;color: #fff;background: #ffa666; border-radius: 0.08rem;text-align: center;}
.pp-choosed .address-btn:active{background: #ffa555;}
.pp-choosed .address-tips{font-size: 12px;color: #999;text-align: center;}
.pp-choosed .choosed-reset{position:fixed;bottom:0.2rem;width:100%;font-size:0.14rem;color:#635349;text-align:center;}
.pp-choosed .choosed-reset:active{color:#4a3e37;}
.pp-choosed .choosed-reset i{display: inline-block;width:0.05rem;height: 0.2rem;margin-left:0.02rem;vertical-align:top;background: url(../assets/icon_arrow@3x.png) no-repeat center;background-size: contain;}
</style>
