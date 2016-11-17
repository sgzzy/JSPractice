/**
 * Created by Administrator on 2016/11/10.
 */
define(function (){
  return function (elem, attr, value){
    var css, ret, style;
    style = elem.style;
    var rnumpx = /^-?\d+(?:px)?$/i,
      rnum = /^-?\d/;
    if (window.getComputedStyle) {
      css = getComputedStyle(elem, null);
      ret = css[attr];
    } else if (document.documentElement.currentStyle) {
      css = this.node.currentStyle;
      ret = css[attr];
    }

    if (!rnumpx.test(ret) && rnum.test(ret)) {
      var left = style.left;
      style.left = attr === "fontSize" ? "lem" : (ret || 0);
      ret = parseInt(style.pixelLeft + 'px');
      style.left = left;
    }
    if(rnum.test(ret)) {
      ret = parseInt(ret);
    }
    if (arguments.length === 2) {
      return ret;
    }
    if (arguments.length == 3) {
      if(rnum.test(value)) {
        value = value + 'px';
      }
      elem.style.cssText += "; " + attr + " : " + value;
    }
  };
});