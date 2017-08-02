/* --------------------------------------------
 * native扩展: 封装YixinJSBridge交互方法
 * @version  1.0
 * @author   hzyangyang2015
 * ------------------------------------------*/
class nativeClass {
    constructor() {}
    // description: 获取用户和家庭圈信息(测试通过)
    // method     : call
    // param      : callback
    getCurrentUserInfo(callback){
        if(!window.YixinJSBridge) return;
        YixinJSBridge.invoke('getCurrentUserInfo',null,callback);
    }
    /* 
     * Native写
     * @param  {String} 键
     * @param  {Object} 值
     * @return {Void}
     */
    storageWrite(_key, _value) {
        if (!window.YixinJSBridge || !_key) return;
        YixinJSBridge.call('storageWrite', {
            'key': _key,
            'value': _value
        });
    };
    /* 
     * Native读
     * @param  {Function} 键
     * @param  {Function} 回调函数
     * @return {JSON} , 如：{"key":"kCarShareTabIndexKey","value":0}
     */
    storageRead(_key, _callback) {
        if (!window.YixinJSBridge || !_key) return;
        YixinJSBridge.invoke('storageRead', {
            'key': _key
        }, _callback);
    };
    /* 
     * 提示控件
     * @param  {String} 提示信息
     * @return {Void}
     */
    toast(_message) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.call('toast', {
            'message': _message
        });
    }
    /* 
     * Native alert
     * @param  {Object}  参数
     *                   title:
     *                   message:
     *                   items:["取消","确定"]
     * @return {Function} 回调函数
     */
    alert(_param, _callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('alert', _param, _callback);
    }
    /* 
     * 设置界面标题
     * @param  {String} 界面标题
     * @return {Void}
     */
    setTitle(_title) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.call('setTitle', {
            'title': _title
        });
    }
    /* 
     * 返回键捕获
     * @param  {Function} 回调函数
     * @return {Void}
     */
    captureNextBackAction(_callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('captureNextBackAction', null, _callback);
    }
    /* 
     * 取消返回键捕获
     * @param  {Function} 回调函数
     * @return {Void}
     */
    cancelLastBackActionCapture() {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.call('cancelLastBackActionCapture');
    }
    /* 
     * 清除返回键捕获
     * @param  {Function} 回调函数
     * @return {Void}
     */
    clearBackActionCapture() {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.call('clearBackActionCapture');
    }
    /* 
     * 关闭webview
     * @return {Void}
     */
    closeWebView() {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.call('closeWebView');
    }
    /**
     * [_$httpRelay 加密转发接口]
     * @param  {[type]} _url      [转发url]
     * @param  {[type]} _data     [参数]
     * @param  {[type]} _callback [回调]
     * @return {[type]}           [description]
     */
    httpRelay(_url, _data, _callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('httpRelay', {
            'url': _url,
            'data': _data
        }, _callback);
    }
    /**
     * [_$gotoPublish 跳转到发布页面]
     * @param  {[type]} _url      [转发url]
     * @param  {[type]} _data     [参数]
     * @param  {[type]} _callback [回调]
     * @return {[type]}           [description]
     */
    gotoPublish() {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.call('gotoPublish');
    }
    /**
     * [_$gotoPublish 跳转到发布页面]
     * @param  {[type]} _url      [转发url]
     * @param  {[type]} _data     [参数]
     * @param  {[type]} _callback [回调]
     * @return {[type]}           [description]
     */
    requestService(_param, _callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('requestService', _param, _callback);
    }
    /**
     * [_$gotoPublish 跳转到发布页面]
     * @param  {[type]} _url      [转发url]
     * @param  {[type]} _data     [参数]
     * @param  {[type]} _callback [回调]
     * @return {[type]}           [description]
     */
    requestService(_param, _callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('requestService', _param, _callback);
    }
    /**
     * [_$gotoPublish 跳转到发布页面]
     * @param  {[type]} _url      [转发url]
     * @param  {[type]} _data     [参数]
     * @param  {[type]} _callback [回调]
     * @return {[type]}           [description]
     */
    addAddress(_param, _callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('addAddress', _param, _callback);
    }
    /**
     * [_$gotoPublish 跳转到发布页面]
     * @param  {[type]} _url      [转发url]
     * @param  {[type]} _data     [参数]
     * @param  {[type]} _callback [回调]
     * @return {[type]}           [description]
     */
    getAddress(_callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('getAddress', null, _callback);
    }
    /**
     * [_$gotoPublish 跳转到发布页面]
     * @param  {[type]} _url      [转发url]
     * @param  {[type]} _data     [参数]
     * @param  {[type]} _callback [回调]
     * @return {[type]}           [description]
     */
    getWebViewVersion(_callback) {
        if (!window.YixinJSBridge) return;
        YixinJSBridge.invoke('getWebViewVersion', null, _callback);
    }
}

let native = new nativeClass()
export default native;
