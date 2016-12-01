/**
 * Created by Administrator on 2016/11/14.
 */
/**
 * Created by Administrator on 2016/11/14.
 */
var util = require('util');
var node = require('node');
var motion = require('motion');
var click = document.getElementsByClassName("lesson"),
  list = document.getElementsByClassName("list");
var len = list.length,
  active = null,
  timer = null,
  i;
for (i = 0; i < len; i++) {
  util.addHandler(click[i], "click", onclick);
}
function onclick(event){
  var event = util.getEvent(event);
  var tar = util.getTarget(event);
  var oThis = this,
    target = node.getTagChildNodes(oThis)[1],
    listHeight = node.css(node.getTagChildNodes(target)[0], "height"),
    len1 = node.getTagChildNodes(target).length;
  var time = 1000,
    closetime = 500,
    height,
    result,
    disp,
    pro = "height";
  if (tar != oThis && tar != node.getFirstChildNode(oThis)) {
    // util.stopPropagation(event);
    return;
  }
  if (active && active == oThis) {
    motion.close(target, closetime, pro);
    setTimeout(function (){
      active = null;
    }, closetime);
  } else if (active && active != oThis) {
    target = node.getTagChildNodes(active)[1];
    motion.close(target, closetime, pro);
    setTimeout(function (){
      active = oThis;
      active.className = "lesson active";
      target = node.getTagChildNodes(active)[1];
      height = node.css(target, "height");
      result = (listHeight + 1) * len1;
      disp = 0;
      motion.open(target, disp, height, result, time, pro);
    }, closetime * 2);
  } else if (active == null) {
    active = oThis;
    active.className = "lesson active";
    target = node.getTagChildNodes(active)[1];
    height = node.css(target, "height");
    result = (listHeight + 1) * len1;
    disp = 0;
    motion.open(target, disp, height, result, time, pro);
  }
}
