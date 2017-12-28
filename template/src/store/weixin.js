/* --------------------------------------------
 * 微信相关方法封装
 * @version  1.0
 * @author   hzyangyang2015
 * ------------------------------------------*/

import { fetchForm } from './fetch'
// import 'whatwg-fetch'

let appid = 'wx6dab2b1802d3e6a2'
// cookie_key:wechat_openid
let appApi = {
    auth: '/lovetest/wechatAuth?redirect=',
    share: '/lovetest/wechatShare',
}
// cookie_key:wechat_unionid
let activityAPI = {
    auth:'/activity/wechat/auth?redirect=',
    share:'/activity/wechat/share',
}
class wechatClass {
    constructor(){
        this.checkAPI = "/activity/login/checkLogin";
    }
    //微信授权与免登录
    weixinOauth(){
        if(/MicroMessenger/i.test(navigator.userAgent) == false) return;//非微信直接返回
        let apiUrl = "https://"+location.host + appApi.auth + encodeURIComponent(location.href);
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ appid +"&redirect_uri=" + encodeURIComponent(apiUrl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
    // 第二版，引入appId,签名等
    weixinShare(shareInfo){
        if(/MicroMessenger/i.test(navigator.userAgent) == false) return;//非微信直接返回
        //分享给朋友
        let shareData = {
            title: shareInfo.title1, // 分享标题
            desc: shareInfo.abstractInfo, // 分享描述
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.shareImg, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {},
            cancel: function () {}
        };
        //分享到朋友圈
        let shareDatas ={
            title: shareInfo.title2, // 分享标题
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.shareImg, // 分享图标
            success: function () {},
            cancel: function () {}
        };
        let url = location.href.split('#')[0];
        let fetchUrl  = appApi.share+"?url="+ url;
        fetchForm(appApi.share,{
            method: 'POST',
            body: {
                url:url
            }
        }).then((res) => {
            return res.response;
        }).then((json) => {
            if(json.code === 1){ 
                let r = json.payload;
                wx.config({
                    appId: r.appId,
                    // debug: true,
                    timestamp: r.timestamp,
                    nonceStr: r.noncestr,
                    signature: r.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ]
                });
                // 调用微信API
                wx.ready(function(){
                    wx.onMenuShareTimeline(shareDatas);
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareWeibo(shareData);
                });
            }else {
              throw Error(json);
            }
        }).catch((error) => {

        });
    }

    //微信授权与免登录
    oauth2(){
        if(location.host!='lrs.163.com') return;//只有线上环境可以免登录
        if(/MicroMessenger/i.test(navigator.userAgent) == false) return;//非微信直接返回
        let apiUrl = "https://"+location.host + activityAPI.auth + encodeURIComponent(location.href);
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ appid +"&redirect_uri=" + encodeURIComponent(apiUrl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
    share(shareInfo){
        if(/MicroMessenger/i.test(navigator.userAgent) == false) return;//非微信直接返回
        //分享给朋友
        let shareData = {
            title: shareInfo.title1, // 分享标题
            desc: shareInfo.desc, // 分享描述
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {},
            cancel: function () {}
        };
        //分享到朋友圈
        let shareDatas ={
            title: shareInfo.title2, // 分享标题
            link: shareInfo.link, // 分享链接
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: function () {},
            cancel: function () {}
        };
        let url = location.href.split('#')[0];
        let fetchUrl  = activityAPI.share+"?url="+ url;
        fetchForm(activityAPI.share,{
            method: 'POST',
            body: {
                url:url
            }
        }).then((res) => {
            return res.response;
        }).then((json) => {
            if(json.code === 1){ 
                let r = json.payload;
                wx.config({
                    appId: r.appId,
                    // debug: true,
                    timestamp: r.timestamp,
                    nonceStr: r.noncestr,
                    signature: r.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ]
                });
                // 调用微信API
                wx.ready(function(){
                    wx.onMenuShareTimeline(shareDatas);
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareWeibo(shareData);
                });
            }else {
              throw Error(json);
            }
        }).catch((error) => {

        });
    }
}


let weixin = new wechatClass()
export default weixin;
