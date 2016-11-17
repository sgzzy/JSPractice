/**
 * Created by Administrator on 2016/11/15.
 */
require.config({
  paths : {
    "css" : "css",
    "tween" : "Tween"
  }
});
define(["css", "tween"],function(css, tween){
  var demo = document.getElementsByClassName("demo")[0];
  var d = 500;
  var btn = document.getElementById("btn");
  var opentimer =null, closetimer = null;
  btn.onclick = function (){
    var height = css(demo, "height");
    btn.innerHTML = btn.innerHTML == "Open" ? "Close" : "Open";
    var disp = 0;
    if (btn.innerHTML == "Open") {
      console.log(height);
        function open(){
        var value = Math.floor(tween.Elastic.easeOut(disp,height,200,d));
        console.log(value);
        css(demo, "height", value);
        if(disp <= d) {
          opentimer = setTimeout(open,1);
        } else if (disp > d) {
          clearTimeout(opentimer);
        }
        disp++;
        }
      open();
    } else if(btn.innerHTML == "Close") {
      console.log(height);
      function close(){
        d = 200;
        console.log("disp： " + disp);
        var value = Math.floor(tween.Linear(disp,height,-300,d));
        css(demo, "height", value);
        if(disp <= d) {
          closetimer = setTimeout(close,1);
        } else if (disp > d) {
          clearTimeout(closetimer);
        }
        disp++;
      }
      close();
    }
    setTimeout(function (){
      console.log("endHeight: " + css(demo,"height"));
      console.log(opentimer);
      console.log(closetimer);
    },500);
  };
});