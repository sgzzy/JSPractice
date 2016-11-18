/**
 * Created by Administrator on 2016/11/16.
 */
define(["css","tween"],function (css, tween){
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }());
  return {
    open: function (target, disp, height, result, time){
      var timer = null;
      function start(){
        var value = Math.floor(tween.Elastic.easeOut(disp, height, result, time));
        css(target, "height", value);
        if (disp <= time) {
          timer = window.requestAnimationFrame(start);
        } else if (disp > time) {
          window.cancelAnimationFrame(timer);
        }
        disp += 10;
      }
      window.requestAnimationFrame(start);
    },
    close: function (target, disp, height, result, time){
      var timer = null;
      function end(){
        var value = Math.floor(tween.Linear(disp, height, result, time));
        css(target, "height", value);
        if (disp < time) {
          timer = window.requestAnimationFrame(end);
        } else if (disp >= time) {
          window.cancelAnimationFrame(timer);
          target.parentNode.className = "lesson";
        }
        disp += 10;
      }
      window.requestAnimationFrame(end);
    }
  }
});