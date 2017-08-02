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
    /* 
     * 获取字符串常量
     * @param  {String} _key 字符串常量对应的key
     * @return {boolen}
     */
    getConstant(_key) {
        return _CONSTAND[_key];
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
    /**
     * 照片打印活动埋点统计
     * @param  {String} type         事件标签，事件类别：Print
     */
    dataAlynasis(type) {
        _gaq.push(['_trackEvent','Print',type, ''])
    }

    /**
     * 获取页面当前滚动距离
     * @return {Number}               页面当前滚动距离
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
     * @return {Number}               页面高度
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
     * @return {Number}               窗口屏幕高度
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
     * 滚动到页面顶部
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
}

let tool = new toolClass()
export default tool;
