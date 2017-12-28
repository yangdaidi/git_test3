/* --------------------------------------------
 * fontToolClass: 字体操作相关功能封装
 * @version  1.0
 * @author   hzyangyang2015
 * ------------------------------------------*/
var _CONSTAND = {
    'failTest' : 'failTest',
}
class fontToolClass {
    constructor() {}

    /**
     * [loadscript: 动态加载js脚本]
     * @param  {[type]} url [js脚本url]
     * @return {[type]}     [description]
     */
    loadscript(url){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    }

    /**
     * [fontGet 获取在线字体文件css]
     * 本地开发测试用途，正式线上用途应该提供相应的jssdk
     * @return {[type]} [description]
     */
    fontGet(){
        let fetchUrl  = "http://10.242.18.179:3000/";
        fetch(fetchUrl).then((res) => {
          return res.response;
        }).then((json) => {
          console.log(json.cssString)
          if (json.code === 1){
            setTimeout(function(){
              tool.addCssByStyle(json.cssString);
            },0)
          } else {
            throw Error(json);
          }
        }).catch((error) => {
          console.log("获取在线字体失败")
        });
    }

    /**
     * [addCssByStyle 动态添加style标签和css样式]
     * @param {[type]} cssString [style标签中的css样式字符串]
     */
    addCssByStyle(cssString){  
        var doc=document;  
        var style=doc.createElement("style");  
        style.setAttribute("type", "text/css");  
      
        if(style.styleSheet){// IE  
            style.styleSheet.cssText = cssString;  
        } else {// w3c  
            var cssText = doc.createTextNode(cssString);  
            style.appendChild(cssText);  
        }  
      
        var heads = doc.getElementsByTagName("head");  
        if(heads.length)  
            heads[0].appendChild(style);  
        else  
            doc.documentElement.appendChild(style);  
    }
}

let font = new fontToolClass()
export default font;
