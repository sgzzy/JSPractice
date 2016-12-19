/**
 * Created by Administrator on 2016/12/19.
 */

/**
 * 此模块不返回任何值，仅作参考
 * @constructor
 */


function Views(){
  var context = this;
}
Views.prototype = {
  /**
   * 获取与屏幕相关的宽高属性
   */
  screen: function (){

    // 屏幕宽高
    var width = window.screen.width; // 获取整个屏幕宽度
    var height = window.screen.height; // 获取整个屏幕高

    // 屏幕坐标
    // FF中screenX和screenY的初始值为-8
    // 浏览器窗口相对于屏幕的位置
    var pageX = window.screenLeft || window.screenX;
    var pageY = window.screenTop || window.screenY;

    // 鼠标事件相对于屏幕的坐标
    // IE中screenX的最小值可能是2；
    document.onclick = function (event){
      event = event ? event: window.event;
      var screenX = event.screenX;
      var screenY = event.screenY;
    };

  },

  client: function (){
    // 客户端（浏览器）宽高
    var wholeWidth = window.outerWidth; // 整个浏览器的宽度
    var wholeHeight = window.outerHeight; // 整个浏览器的高度

    // 文档的宽高
    // IE中document.documentElement.offset == window.inner
    var documentWidth = window.innerWidth; // 浏览器内文档的可视宽度（包括滚动条）
    var documentHeight = window.innerHeight; // 浏览器内文刚的可视高度（包括滚动条）
    var viewWidth = document.documentElement.clientWidth; // 浏览器内文档的可视宽度（不包括滚动条）
    var viewHeight = document.documentElement.clientHeight; // 浏览器内文档的可视高度（不包括滚动条）

    // document.body.client会计算margin
    var scrollWidthDoc =  document.documentElement.scrollWidth = document.documentElement.offsetWidth;
    var scrollHeightDoc =  document.documentElement.scrollHeight = document.documentElement.offsetHeight;
    var scrollWidthBody = document.body.clientWidth = document.body.offsetWidth = document.body.scrollWidth; // 浏览器内文档的滚动条代表的宽度（忽略滚动条）
    var scrollHeightBody = document.body.clientHeight = document.body.offsetHeight = document.body.scrollHeight; // 浏览器内文档的滚动条代表的高度（忽略滚动条）

    // 滚动条的宽高
    var scrollBarWidth = documentWidth - viewWidth; // 垂直滚动条的宽度
    var scrollBarHeight = documentHeight - viewHeight; // 水平滚动条的高度

    //scrollX(Y)只能用于window,及文档和整个页面，而scrollLeft(Top)则能用于所有包含滚动条的HTML元素
    var scrollLeft = window.scrollX; // 可能的值还有 document.documentElement.scrollLeft 和 document.body.scrollLeft;
    var scrollTop = window.scrollY; // 可能的值还有 document.documentElement.scrollTop 和 document.body.scrollTop;

    // 鼠标事件在客户端（浏览器）中的位置

    document.onclick = function (event){
      event = event ? event: window.event;
      var clientX = event.clientX;
      var clientY = event.clientY;
    }
  },

  element: function (ele){
    // 元素自身宽高

    // 除了margin外的宽高, 也包括滚动条
    var borderWidth = ele.offsetWidth;
    var borderHeight = ele.offsetHeight;

    // 只包含padding的宽高， 不包括滚动条
    var paddingWidth = ele.clientWidth;
    var paddingHeight = ele.clientHeight;

    // 元素边框的宽度
    var borderLeft = ele.clientLeft;
    var borderTop = ele.clientTop;

    // 包含该元素且距离其最近的定位元素
    var eleParent = ele.offsetParent;

    // 元素相对于其offsetParent的偏移量

    var offsetLeft = ele.offsetLeft;
    var offsetTop = ele.offsetTop;
  }
};
