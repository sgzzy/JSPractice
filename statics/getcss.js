/**
 * Created by Administrator on 2016/11/10.
 */
function GetCss(){
}
GetCss.prototype = {
  css: function (elem, attr, value){
    var css, ret, style;
    style = elem.style;
    value = value + 'px';
    if (window.getComputedStyle) {
      css = getComputedStyle(elem, null);
      ret = css[attr];
    } else if (document.documentElement.currentStyle) {
      css = this.node.currentStyle;
      ret = css[attr];
      console.log(parseInt(ret));
      var rnumpx = /^-?\d+(?:px)?$/i,
        rnum = /^-?\d/;
      if (!rnumpx.test(ret) && rnum.test(ret)) {
        var left = style.left;
        console.log(left);
        style.left = attr === "fontSize" ? "lem" : (ret || 0);
        console.log(style.left);
        ret = style.pixelLeft + 'px';
        style.left = left;
      }
    }
    if(arguments.length === 2) {
      return parseInt(ret);
    }
    if(value) {
      elem.style.cssText += "; " + attr + " : " + value ;
    }
  }
};