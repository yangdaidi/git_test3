/* --------------------------------------------
 * tool扩展: 封装通用小工具方法：
    字符串校验，ua检测，字符串常量，埋点，版本检验，获取窗口宽高度，回到顶部，下拉加载
 * @version  1.0
 * @author   hzyangyang2015
 * ------------------------------------------*/
var _CONSTAND = {
    'failTest' : 'failTest',
    'photoPrint' : 'xty-activity-photoPrint',
}
class toolClass {
    constructor() {}

    // --------------------------------环境监测--------------------------------
    
    isOnline(){
      return location.host == "lrs.163.com" || location.host == "wolf.163.com";
    }
    /* 
     * 电话号码校验
     * @param  {String} _phone 需要校验的电话号码
     * @return {boolen}
     */
    phoneCheck(_phone){
        let re = new RegExp(/^1\d{10}$/);
        return re.test(_phone);
    }
    /* 
     * email校验
     * @param  {String} _phone 需要校验的email
     * @return {boolen}
     */
    emailCheck(_email){
        let re = new RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
        return re.test(_email);
    }
    /**
     * 是否微信
     * @return {Boolean} 是否isWeixin
     */
    isWeixin(){
        let ua = window.navigator.userAgent.toLowerCase();
        return /micromessenger/i.test(ua);
    }
    /**
     * 是否ios
     * @return {Boolean} 是否IOS
     */
    isIOS(){
        let ua = window.navigator.userAgent.toLowerCase();
        let _isIos = (ua.indexOf('iphone') != -1 || ua.indexOf('ipod') != -1 || ua.indexOf('ipad') != -1);
        return _isIos;
    }
    /**
     * 是否为android
     * @return {Boolean} 是否android
     */
    isAndroid() {
        let ua = window.navigator.userAgent.toLowerCase();
        let _isAndroid = (ua.indexOf('android') != -1);
        return _isAndroid;
    }
    /**
     * 是否为mobile
     * @return {Boolean} 是否mobile
     */
    isMobile() {
        let ua = window.navigator.userAgent.toLowerCase();
        let re = /Android|iPhone|windows phone|ipad|BlackBerry|android|iphone|Windows Phone|iPod/i;
        return re.test(ua);
    }


    // --------------------------------数据统计--------------------------------    
    /**
     * [DATrackerTool hubble埋点方法封装]
     * @param {[type]} content [卖点内容]
     * @param {[type]} type    [埋点类别：login, source, sourceHash, logout]
     */
    DATrackerTool(content,type){
      var isOnline = location.host=="lrs.163.com"|| location.host=="wolf.163.com";
      if(!!DATracker && isOnline){
      // if(!!DATracker){
        if(type && type=='login'){
          DATracker.login(content)
        }else if(type && type=='source'){
          let source = this.getQueryString("sourceFrom") || 'noSource';
          DATracker.track(content+"_"+source);
        }else if(type && type=='sourceHash'){
          let source = this.getQueryString2("sourceFrom") || 'noSource';
          DATracker.track(content+"_"+source);
        }else if(type && type=='logout'){
          DATracker.logout();
        }else{
          DATracker.track(content);
        }
      }
    }
    /**
     * [dataAlynasis da平台埋点封装]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    dataAlynasis(type) {
      _gaq.push(['_trackEvent','Print',type, ''])
    }


    // --------------------------------时间日期--------------------------------
    /**
     * [getCurrentDate 获取当前时间的年/月/日]
     * @return {[type]} [description]
     */
    getCurrentDate(){
      var date = new Date();
      return {
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate()+1,
      }
    }
    /**
     * [formatDate 自定义时间格式化，常用于过滤器处理]
     * @param  {[type]} tmp [时间戳]
     * @param  {[type]} str [年月日中间的分割线]
     * @return {[type]}     [格式化的时间字符串]
     */
    formatDate(tmp,str){
        let date = new Date(tmp);
        let year = date.getFullYear()
        let month = this.numbFormat(date.getMonth()+1);
        let day = this.numbFormat(date.getDate());
        let hour = this.numbFormat(date.getHours());
        let minute = this.numbFormat(date.getMinutes());
        let second = this.numbFormat(date.getSeconds());
        return year+str+month+str+day+" "+hour+":"+minute+":"+second;
    }

    

    // --------------------------------app跳转与下载--------------------------------
    /**
     * [aos的app跳转需要在页面加载直接触发，在微信里面无法直接跳转，需要引导浏览器打开
     * ]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    aosJumpToApp(url,callback){
      if(this.isAndroid()){
        location.href = url?url:'lrs163://lrs.163.com';
      }
    }
    /**
     * [ios的跳转可以在微信中触发，如果没有安装，则会跳转到官网首页，引导下载（但是，跳转后的域名需要与当前页面不同）]
     * @return {[type]} [description]
     */
    iosJumpToApp() {
      if(this.isIOS()){
        location.href='https://wolf.163.com/';
      }
    }

    /**
     * [downloadApp 狼人杀通用下载]
     * @param  {Boolean}  isWeixin [是否是微信内部]
     * @param  {[type]}   os       [手机系统：ios|aos]
     * @param  {Function} callback [微信内遮罩弹框]
     * @return {[type]}            [description]
     */
    downloadApp(isWeixin,os,callback){
        let downloadUrl ={
          // ios: 'https://www.pgyer.com/werewolf_online',
          ios: 'https://itunes.apple.com/cn/app/%E5%A5%87%E5%B9%BB%E7%8B%BC%E4%BA%BA%E6%9D%80/id1319762578?l=zh&ls=1&mt=8',
          aos: 'http://pkg.yixin.im/download/getLastest/lrs/0/1',
        }
        if(os=='ios'){
            window.location = downloadUrl[os];
        }else if(isWeixin){
            if(!!callback){
              callback();
            }
        }else{
            window.location = downloadUrl[os];
        }
    }
    /**
     * 校验IOS版本号[必须为3位及以上版本号]
     * @param  {String} _param         被校验版本号
     * @param  {String} _iosVersion    基准值(被校验版本号必须大于等于该值)
     * @return {Boolean}               校验结果，通过: true, 不通过：false
     */
    checkIOSVersion(_param,_iosVersion){
        var real = _param.split('.');
        var base = _iosVersion.split('.');
        var flag = true;
        if(real.length == base.length && real.length==3){
            if(real[0]<base[0]){
                flag = false;
            }else if(real[0] == base[0]){
                if(real[1]<base[1]){
                    flag = false;
                }else if(real[1] == base[1]){
                    flag = real[1] >= base[1] ? true : false;
                }
            }
        }else{
            flag = false;
        }
        return flag;
    }
    /**
     * 校验AOS版本号[必须为3位及以上版本号]
     * @param  {Number} _param         被校验版本号
     * @param  {Number} _aosVersion    基准值(被校验版本号必须大于等于该值)
     * @return {Boolean}               校验结果，通过: true, 不通过：false
     */
    checkAOSVersion(_param,_aosVersion){
      return parseInt(_param) >= _aosVersion? true:false
    }
    /**
     * 照片打印活动版本校验
     * @param  {Number or String} _param        被校验版本号（AOS or IOS）基准常量：_aosVersion：4  _iosVersion：1.1.0
     * @return {Boolean}                        校验结果，通过: true, 不通过：false
     */
    checkVersionPhotoPrint(_param){
        // let _isIos = this.isIOS();
        let _isAndroid = this.isAndroid();
        if(_isAndroid){
            return this.checkAOSVersion(parseInt(_param),4);
        }else{
            return this.checkIOSVersion(String(_param),'1.1.0');
        }
    }




    // --------------------------------小工具--------------------------------
    // 个位数前面补0
    numbFormat(str) {
        var s = '0' + str;
        return s.substring(s.length-2);
    }
    // 获取字符串常量
    getConstant(_key) {
        return _CONSTAND[_key];
    }
    // 随机数算法
    radomNum(start,end,count){
        var randomArr = [];
        while (true){
          let radom = Math.floor((end-start+1) * Math.random()) + start;
          if(randomArr.indexOf(radom)==-1){
            randomArr.push(radom);
          }
          if(randomArr.length>=count){
            break;
          }
        }
        console.log("randomArr",randomArr);
        return randomArr;
    }

    

    // --------------------------------页面宽高--------------------------------
    /**
     * 获取页面当前滚动距离
     * @return {Number}
     */
    getScrollTop(){
      　var scrollTop = 0
        var bodyScrollTop = 0
        var documentScrollTop = 0
        if(document.body){
          bodyScrollTop = document.body.scrollTop
        }
    　　if(document.documentElement){
    　　　　documentScrollTop = document.documentElement.scrollTop
    　　}
    　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
        // console.log("scrollTop",scrollTop)
    　　return scrollTop
    }
    /**
     * 获取页面高度
     * @return {Number}
     */
    getScrollHeight(){
    　　var scrollHeight = 0
        var bodyScrollHeight = 0
        var documentScrollHeight = 0
    　　if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
        // console.log("scrollHeight",scrollHeight)
    　　return scrollHeight 
    }
    /**
     * 获取窗口屏幕高度
     * @return {Number}
     */
    getWindowHeight(){
    　　var windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
        // console.log("windowHeight",windowHeight)
    　　return windowHeight;
    }

    // --------------------------------页面滚动与操作--------------------------------
    /**
     * 滚动到页面顶部（版本1）
     * @return {Number}               滚动到页面顶部（严格模式下不支持arguments.callee）
     */
    // movePage: (function () {
    //     var interl;
    //     return function () {
    //         var ypos = document.documentElement.scrollTop || document.body.scrollTop;
    //         if (ypos === 0) {
    //             if (interl) {
    //                 clearTimeout(interl);
    //             }
    //             return true;
    //         }
    //         if (ypos > 0) {
    //             var dist = Math.ceil((ypos) / 10);
    //             ypos -= dist;
    //         }
    //         if (document.documentElement.scrollTop) {
    //             document.documentElement.scrollTop = ypos;
    //         } else {
    //             document.body.scrollTop = ypos;
    //         }
    //         interl = setTimeout(arguments.callee, 10);
    //     };
    // }()),
    /**
     * [windowResize 屏幕尺寸变化后，fix部分机型出现的字体大小变化，比如魅族，建议移动端页面都加上]
     * @return {[type]} [description]
     */
    windowResize(){
        var bd = document.getElementsByTagName('body')[0];
        bd.onorientationchange = function(){
            bd.style.webkitTextSizeAdjust = '100%';
        };
    }

    /**
     * 滚动到页面顶部 （版本2）
     * @return {Number}               滚动到页面顶部（严格模式下不支持arguments.callee）
     */
    moveToTop() {
        var ypos = document.documentElement.scrollTop || document.body.scrollTop;
        if (ypos > 0) {
          var dist = Math.ceil((ypos) / 10);
          ypos -= dist;
          if (document.documentElement.scrollTop) {
              document.documentElement.scrollTop = ypos;
          } else {
              document.body.scrollTop = ypos;
          }
          setTimeout(this.moveToTop.bind(this), 10);
        }   
    }
    /**
     * 滚动到页面底部
     * @return {Number}               滚动到页面底部
     */
    moveToBottom() {
        let documentHeight = tool.getScrollHeight()
        let windowHeight = tool.getWindowHeight()
        let scrollTop = tool.getScrollTop()
        let ypos = documentHeight - windowHeight - scrollTop //滚动高度(回去底部)

        if (ypos > 0) {
          var dist = Math.ceil((ypos) / 10);
          ypos -= dist;
          if (document.documentElement.scrollTop) {
              document.documentElement.scrollTop += dist;
          } else {
              document.body.scrollTop += dist;
          }
          setTimeout(this.moveToBottom.bind(this), 5);
        }  
    }


    // -------------------------------页面参数-------------------------------
    // 非单页中获取链接参数（vue单页可用路由获取参数）
    getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        // console.log(r);
        if (r != null) return r[2]; return null; 
    } 
    // 单页中获取链接参数（vue单页可用路由获取参数）
    getQueryString2(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r;
        if(!!location.search){
            r = window.location.search.substr(1).match(reg); 
        }
        if(!!location.hash && /\?/.test(location.hash)){
            var search = window.location.hash.split('?')[1];
            r = search.match(reg); 
        }

        if (r != null) return r[2]; return null; 
    } 


    
    // -------------------------------cookie操作-------------------------------
    /**
     * [getCookie 获取cookie]
     * @param  {[type]} cookieName [cookie的key值]
     * @return {[type]}            [cookie的value值]
     */
    getCookie(cookieName) {
        var arr, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return arr[2];
        }else {
            return null;
        }
    }
    /**
     * [setCookie description]
     * @param {[type]} cookieName   [cookie的key值]
     * @param {[type]} cookieValue  [cookie的value值]
     * @param {[type]} exdays       [cookie有效期]
     */
    setCookie(cookieName, cookieValue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires+";path=/";
    }
    /**
     * [clearCookie 清楚cookie]
     * @param  {[type]} cookieName [cookie的key值]
     * @return {[type]}            [description]
     */
    clearCookie(cookieName) {  
        this.setCookie(cookieName, "", -1);  
    } 
    // 部分机型cookie前面带空格，导致无法正常获取
    // getCookie(cookieName) {
    //   let cookie=null;
    //   alert(document.cookie);
    //   let cookieArray = document.cookie.split(';')
    //   for (var i = 0; i < cookieArray.length; i++) {
    //     if(cookieArray[i].indexOf(cookieName)==0){
    //       cookie = cookieArray[i].split('=')[1];
    //       break;
    //     }
    //   }
    //   return cookie;
    // } 
}

let tool = new toolClass()
export default tool;
