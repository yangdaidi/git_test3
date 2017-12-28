// 移动端rem布局在页面首页（index.html）引人，或者模块主入口（main.js）引人
(function(doc, win) {
    //视觉一般给640的效果图，
    //但是我这边取了一般的像素，所以用clientWidth / 320, 最大font-size取200px;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '200px';
            } else {
                docEl.style.fontSize = 100* (innerWidth / 360) + 'px';
            }
            doc.body.style.display = '';
        };

    if (!doc.addEventListener) return;
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);

// (function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);
// 
