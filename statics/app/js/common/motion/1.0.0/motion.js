/**
 * Created by Administrator on 2016/11/16.
 */
var node = require('node');
var tween = require('tween');
exports.open = function (target, height, result, endtime, pro){
  var timer = null;
  var startTime;

  function start(time){
    if (timer === null) {
      startTime = time;
    }

    time = parseFloat(time - startTime);
    var value = Math.floor(tween.Elastic.easeOut(time, height, result, endtime));

    if (time <= endtime) {
      timer = requestAnimationFrame(start);
    } else if (time > endtime) {
      value = result + height;
      cancelAnimationFrame(timer);
    }

    node.css(target, pro, value);
  }

  requestAnimationFrame(start);
};
exports.close = function (target, endtime, pro){
  var height = node.css(target, pro);
  var result = -height;
  var timer = null;
  var startTime;

  function end(time){
    if (timer === null) {
      startTime = time;
    }
    time = parseFloat(time - startTime);
    var value = Math.floor(tween.Linear(time, height, result, endtime));
    if (time < endtime) {
      timer = requestAnimationFrame(end);
    } else{
      value = height + result;
      cancelAnimationFrame(timer);
      target.parentNode.className = "lesson";
    }
    node.css(target, pro, value);

  }

  requestAnimationFrame(end);
};
