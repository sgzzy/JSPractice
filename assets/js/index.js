/**
 * Created by Administrator on 2016/11/14.
 */
/**
 * Created by Administrator on 2016/11/14.
 */
require.config({
    paths: {
      "node": "node",
      "css": "css",
      "util": "util",
      "tween": "Tween",
      "motion": "motion"
    }
  }
);
require(["node", "css", "util", "tween", "motion"], function (node, css, util, tween, motion){
  var click = document.getElementsByClassName("lesson"),
      list = document.getElementsByClassName("list");
  var len = list.length,
      active = null,
      i;
  for (i = 0; i < len; i++) {
    util.addHandler(click[i], "click", onclick);
  }
  function onclick(){
    var oThis = this,
        target = node.getTagChildNodes(oThis)[1],
        listHeight = css(node.getTagChildNodes(target)[0], "height"),
        len1 = node.getTagChildNodes(target).length;
    var time = 1000,
        closetime = 500,
        height,
        result,
        disp;
    if (active && active == oThis) {
      target = node.getTagChildNodes(active)[1];
      height = css(target, "height");
      result = -height;
      disp = 0;
      motion.close(target, disp, height, result, closetime);
      setTimeout(function (){
        active.className = "lesson";
        active = null;
      }, closetime);
    } else if (active && active != oThis) {
      target = node.getTagChildNodes(active)[1];
      height = css(target, "height");
      result = -height;
      disp = 0;
      motion.close(target, disp, height, result, closetime);
      setTimeout(function (){
        active.className = "lesson";
      }, closetime);
      setTimeout(function (){
        active = oThis;
        active.className = "lesson active";
        target = node.getTagChildNodes(active)[1];
        height = css(target, "height");
        result = (listHeight + 1) * len1;
        disp = 0;
        motion.open(target, disp, height, result, time);
      }, closetime);
    } else if (active == null) {
      active = oThis;
      active.className = "lesson active";
      target = node.getTagChildNodes(active)[1];
      height = css(target, "height");
      result = (listHeight + 1) * len1;
      console.log(result);
      disp = 0;
      motion.open(target, disp, height, result, time);
    }
  }
});