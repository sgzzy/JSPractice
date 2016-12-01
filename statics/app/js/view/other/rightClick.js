/**
 * Created by Administrator on 2016/11/16.
 */
require.config({
  paths: {
    "node": "node",
    "css": "css",
    "util": "util"
  }
});
require(["node", "css", "util"], function (node, css, util){
  var active = null;
  var items = document.getElementsByClassName("list-item");
  var panel = document.getElementsByClassName("panel")[0];
  var len = items.length, i;
  document.oncontextmenu = function (event){
    contextMenu(event);
    return false;
  };
  util.addHandler(document, "click", click);
  for (i = 0; i < len; i++) {
    util.addHandler(items[i], "mouseover", mouseMove);
    util.addHandler(items[i], "mouseout", mouseOut);
  }
  function mouseMove(event){
    event = event ? event : window.event;
    var oThis = this;
    active = oThis;
    var className = active.className;
    active.className = className.concat(" active");
    if (className.search(" sub") != -1) {
      var target = node.getTagChildNodes(active)[0];
      target.style.display = "block";
      util.addHandler(target,"mousemove", function (){
        this.style.display = "block";
      });
    }
    stopBubble(event);

  }

  function mouseOut(){
    var className = active.className;
    active.className = className.replace(" active", "");
    console.log("end: " + active.className);
    if (active.className.search(" sub") != -1) {
      var target = node.getTagChildNodes(active)[0];
      console.log(target.className);
      target.style.display = "none";
    }
  }

  function contextMenu(event){
    event = util.getEvent(event);
    css(panel, "display", "block");
    var box_w = parseInt(css(panel, "width"));
    var box_h = parseInt(css(panel, "height"));
    var disp_w = getWindow().width - event.clientX;
    var disp_h = getWindow().height - event.clientY;
    panel.style.top = (disp_h >= box_h) ? (event.clientY + 'px') : (getWindow().height - box_h + 'px');
    panel.style.left = (disp_w >= box_w) ? (event.clientX + 'px') : (getWindow().width - box_w + 'px');
    // panel.style.top = event.clientY + 'px';
    // panel.style.left = event.clientX + 'px';
    return false;
  }

  function click(){
    panel.style.display = "none";
  }

  function getWindow(){
    var window_w, window_h;
    if (document.compatMode == "CSS1Compat") {
      window_w = document.documentElement.clientWidth;
      window_h = document.documentElement.clientHeight;
    } else {
      window_w = document.body.clientWidth;
      window_h = document.body.clientHeight;
    }
    return {
      width: parseInt(window_w),
      height: parseInt(window_h)
    };
  }
  function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if(e && e.stopPropagation) {
      //因此它支持W3C的stopPropagation()方法
      e.stopPropagation();
    } else {
      //否则，我们需要使用IE的方式来取消事件冒泡
      window.event.cancelBubble = true;
    }
    return false;
  }

});