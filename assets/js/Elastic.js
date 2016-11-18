/**
 * Created by Administrator on 2016/11/15.
 */
require.config({
  paths : {
    "css" : "css",
    "Tween" : "jtween"
  }
});
define(["css", "Tween"],function(css, Tween){
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
  var demo = document.getElementsByClassName("demo")[0];
  var up = new Tween({height: 500})
    .easing(Tween.Easing.Linear.None)
    .to({height: 200}, 1000)
    .delay(1000)
    .on('update', function (coords){
      css(demo,"height",coords.height);
    });
  var down = new Tween({height: 200})
    .easing(Tween.Easing.Elastic.Out)
    .to({height: 500},1000)
    .chain(up)
    .on('update',function (coords){
       css(demo, "height", coords.height);
    })
    .start();
  function animation(time){
    Tween.update(time);
    requestAnimationFrame(animation);
  }
  requestAnimationFrame(animation);
});