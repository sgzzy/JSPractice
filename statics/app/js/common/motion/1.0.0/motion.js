/**
 * Created by Administrator on 2016/11/16.
 */
var node = require('node');
var tween = require('tween');
exports.open = function (target, disp, height, result, time, pro){
  var timer = null;

  function start(){
    var value = Math.floor(tween.Elastic.easeOut(disp, height, result, time));
    node.css(target, pro, value);
    if (disp <= time) {
      timer = requestAnimationFrame(start);
    } else if (disp > time) {
      cancelAnimationFrame(timer);
    }
    disp += 10;
  }

  timer = requestAnimationFrame(start);
};
exports.close = function (target, time, pro){
  var height = node.css(target, pro);
  var result = -height;
  var disp = 0;
  var timer = null;

  function end(){
    var value = Math.floor(tween.Linear(disp, height, result, time));
    node.css(target, pro, value);
    if (disp < time) {
      timer = requestAnimationFrame(end);
    } else if (disp >= time) {
      cancelAnimationFrame(timer);
      target.parentNode.className = "lesson";
    }
    disp += 10;
  }

  timer = requestAnimationFrame(end);
};
