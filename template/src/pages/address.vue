<template>
  <div class="address-page">
    <div class="pp-addr-success" v-if="addressStatus==2">
      <div class="choosed-box">
        <div class="choosed-item" v-for="(item,index) in photo" v-if="item.choosed" :style="item.styleObject"></div>
      </div>
      <div class="addr-info">
        <div class="addr-title">您的10张照片将会免费寄到以下地址:</div>
        <div class="addr-detail">
          <div class="addr-detail-item">{{ addressDisplay.address }}</div>
          <div class="addr-detail-item">收件人：{{ addressDisplay.name }}</div>
          <div class="addr-detail-item">联系电话：{{ addressDisplay.phone }}</div>
        </div>
      </div> 
      <!-- <div>{{logs}}</div> -->
      <div class="addr-service">如有疑问、请联系客服：<span>0571-8739 6780</span></div> 
    </div>

    <div class="pp-addr-box" v-if="addressStatus==1">
      <div class="pp-addr">
        <div class="addr-line u-flex u-border-bottom">
          <label class="addr-label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
          <input class="u-flex-1 addr-input" type="text" placeholder="收件人姓名" v-model="addressInfo.userName">
        </div>
        <div class="addr-line u-flex u-border-bottom">
            <label class="addr-label">手机号码</label>
            <input class="u-flex-1 addr-input"  type="tel" pattern="[0-9]*" placeholder="收件人联系电话"  v-model="addressInfo.phoneNum">
        </div>
        <city label="address" ref="addr"></city>
        <div class="addr-line u-flex">
            <label class="addr-label">详细地址</label>
            <input class="u-flex-1 addr-input"  type="text" placeholder="街道门牌信息" v-model="addressInfo.detail.other">
        </div>
      </div>
      <!-- <div>{{ addressInfo.address }}</div> -->
      <!-- <div>{{ addressId }}</div> -->
      <div v-on:click="ntAddAddress" class="addr-btn">保存地址</div>
    </div>
  </div>
</template>

<script>
// 组件的应用采用驼峰写法，实际使用的时候中间用‘-’替换
import city from '../components/city'
import native from '../store/native'
import tool from '../store/tool'

export default {
  name: 'address',
  data() {
    return {
      reRequest: true,
      //用户地址信息
      addressInfo:{
        userName:'',
        phoneNum:'',
        detail:{
          province:'',
          city:'',
          area:'',
          other:''
        },
        address:'',
        addressId:'' //返回地址id
      },
      // 活动信息
      activityInfo:{},
      // 是否已经填写过地址
      addressStatus:0,
      //提交状态，防止重复提交
      addressSubmitStatus:false,
      //用户选择的照片信息
      photo:[],
      addressDisplay:{
        addressId:0,
        name:'',
        phone:'',
        address:''
      },
      logs:''
    }
  },
  components: {
    city
  },
  mounted(){
    // 获取用户数据，如果有地址，显示详细信息
    native.clearBackActionCapture()
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
          // 已经领取福利，且addressId不是0，表明已经成功
          if(this.activityInfo.status == 1 && this.activityInfo.addressId && this.activityInfo.addressId!=0){
            this.addressStatus = 2
            native.setTitle('邀你记录好时光')
            // this.logs = JSON.stringify(data)
            this.ntGetAddress(data.result.addressId)
            this.photoRender(data.result.photos)
          }else{
            this.addressStatus = 1
            native.setTitle('填写收货地址')
          }
        }else{
          // 允许重连一次（保护客户端连接断开的情况）
          if(this.reRequest){
            // native.toast('(测试用,请忽略)重新发送请求中...')
            this.reRequest = false
            setTimeout(function(){
              this.photoPrintStatus()
            }.bind(this),500)
          }
        }
        this.ntCaptureNextBackAction()
        // native.toast(JSON.stringify(data))
      }.bind(this))
    },
    // 将字符串转换为可以使用的 img对象
    photoRender(str) {
      if(!!str && str!="EMPTY" && str!=''){
        this.photo = []
        var tmp  = str.split(';')
        for (var i = 0; i < tmp.length; i++) {
          var backgroundThumbnail = tmp[i] + "?resize=300x0"
          this.photo.push({
            choosed: true,
            url:tmp[i],
            // 图标背景样式
            styleObject: {
              background: "url("+backgroundThumbnail+") no-repeat center",
              backgroundSize: "cover",
            }
          })
        }
      }
    },
    // 地址信息单独接口
    ntAddAddress() {
      if(!this.getUserAddress()) return;
      if(this.addressSubmitStatus)
        return
      this.addressSubmitStatus = true;
      tool.dataAlynasis('PrintAddressSave')
      // native.toast("save address")
      native.addAddress({
        name: this.addressInfo.userName,
        phone: this.addressInfo.phoneNum,
        address: this.addressInfo.address
      },function(data){
        this.addressSubmitStatus = false;
        this.addressInfo.addressId = data.addressId
        // native.toast(this.addressInfo.addressId)
        this.photoPrintSet()
      }.bind(this))
    },
    // 上传地址信息后将地址id返回给服务器
    photoPrintSet(){
      native.requestService({
        activityId: '7eb1d816e54bcc923a21749c38e9ad65',
        method: 'PhotoPrintSet',
        data: {addressId:this.addressInfo.addressId}
      }, function(data){
        if(data.code==0){
          this.photoPrintStatus();
        }
        // native.toast(JSON.stringify(data))
        // this.logs = JSON.stringify(data)
      }.bind(this))
    },
    // 获取展示用户上传地址
    ntGetAddress(addressId) {
      native.getAddress(function(data) {
        // if(data)
        for (var i = 0; i < data.addressList.length; i++) {
          if(data.addressList[i].addressId == addressId){
            this.addressDisplay = data.addressList[i]
          }
        }
        // native.toast(JSON.stringify(data))
        // this.logs = JSON.stringify(data)
      }.bind(this))
    },
    // 用户上传信息格式校验
    getUserAddress() {
      if(this.addressInfo.userName.trim() == ''){
        native.toast('收件人不能为空')
        return false
      }
      if(this.addressInfo.phoneNum.trim() == ''){
        native.toast('联系方式不能为空')
        return false
      }else if(!tool.phoneCheck(this.addressInfo.phoneNum)){
        native.toast('手机号码格式不正确')
        return false
      }
      //获取地址联动组件数据
      var addr = this.$refs.addr.getAddress();
      if(addr.province=='省'){
        native.toast('请选择省份')
        return false
      }
      if(this.addressInfo.detail.other.trim() == ''){
        native.toast('详细地址不能为空')
        return false
      }
      this.addressInfo.detail.province = addr.province
      this.addressInfo.detail.city = addr.city
      this.addressInfo.detail.area = addr.area
      this.addressInfo.address = this.addressInfo.detail.province + ' ' + this.addressInfo.detail.city+ ' ' + this.addressInfo.detail.area + ' ' + this.addressInfo.detail.other
      return true
    },
    // 返回键捕获和清除捕获
    ntCaptureNextBackAction(){
      // native.toast('braea')
      native.captureNextBackAction(function(){
        if(this.addressStatus == 1){
          this.$router.push('choose')
        }else{
          this.$router.push("index")
        }
      }.bind(this))
    },
    // ntStorageWrite(step) {
    //   native.storageWrite('xty-activity-photoPrint',step)
    //   this.step = step
    // },
    // ntstorageRead() {
    //   native.storageRead('xty-activity-photoPrint',function(data){
    //     this.step = data.value
    //   }.bind(this))
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address-page{ font-size: 0.14rem; }

.pp-addr-success{padding-top: 0.7rem;}
.choosed-box{font-size: 0;padding:0 0.2rem;height: 1.34rem;}
.choosed-box .choosed-item{display: inline-block;width: 0.65rem;height: 0.65rem;margin-right: 2px;margin-bottom:0.02rem;}
.choosed-box .choosed-item:nth-of-type(5n){margin-right: 0;}

.pp-addr-success .addr-info{margin-top:0.35rem;padding:0 0.2rem;}
.pp-addr-success .addr-info .addr-title{font-size: 0.17rem;color: #333;}
.pp-addr-success .addr-info .addr-detail{padding:0.2rem 0.15rem;margin-top: 0.1rem;background: #fbfbfa;border: dashed 1px #aaa;}
.pp-addr-success .addr-info .addr-detail-item{font-size: 0.15rem;color: #666;}
.pp-addr-success .addr-service{display: block;width: 100%;position: fixed;bottom: 0.2rem;font-size: 0.12rem;color: #999;text-align: center;}
.pp-addr-success .addr-service span{color: #3f8cff;}
.pp-addr-box{position:fixed;left:0;right:0;top:0;font-size: 0.14rem;height: 100%;background: #f2f1f0;bottom:0;padding-top: 0.06rem;}
.pp-addr{background: #fff;padding-bottom: 0.3rem;}

.addr-btn{display:block;margin:0.38rem 0.4rem 0.1rem;height: 0.5rem;line-height: 0.5rem;font-size: 0.16rem;color: #fff;background: #ffa666; border-radius: 0.08rem;text-align: center;}
.addr-btn:active{background: #ffa555;}

.addr-line{position: relative;height: 0.5rem;vertical-align: middle;margin-left: 0.14rem;}
.addr-line:after{border-color:#e5e5e5;}
.addr-label{font-size: 0.14rem;width: 0.7rem;line-height: 0.52rem;color: #333;}
.addr-input{font-size: 0.14rem;line-height: 0.2rem;padding: 0;color: #333;}
.addr-input::-webkit-input-placeholder { font-size: 0.12rem; color:#999; }
</style>
