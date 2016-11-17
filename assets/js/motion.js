/**
 * Created by Administrator on 2016/11/16.
 */
define(["css","tween"],function (css, tween){
  return {
    open: function (target, disp, height, result, time){
      var timer = null;
      function start(){
        var value = Math.floor(tween.Elastic.easeOut(disp, height, result, time));
        css(target, "height", value);
        if (disp <= time) {
          timer = setTimeout(start, 10);
        } else if (disp > time) {
          clearTimeout(timer);
        }
        disp += 10;
      }
      start();
    },
    close: function (target, disp, height, result, time){
      var timer = null;
      function end(){
        var value = Math.floor(tween.Linear(disp, height, result, time));
        css(target, "height", value);
        if (disp < time) {
          timer = setTimeout(end, 10);
        } else if (disp >= time) {
          clearTimeout(timer);
          target.parentNode.className = "lesson";
        }
        disp += 10;
      }
      end();
    }
  }
});