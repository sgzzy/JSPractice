var util = require('util');
var node = require('node');
var Tween = require('tween');
var motion = require('motion');
var action = document.getElementsByClassName('action')[0];
var input = document.getElementsByTagName('input');
var iPos = new Array();//使用全局变量，让所有函数都能访问和修改

util.addHandler(input[0],'click',function (event){//点击后，图像会的动作为运行到鼠标点击的位置（此次点击除外）
  event = util.getEvent(event);
  util.stopPropagation(event);
  clear();
  util.addHandler(document, "click", click);
});
util.addHandler(input[1], 'click', function (event){//点击后，图像的动作为沿着鼠标点击左键后按着不放移动的轨迹运动（此次点击除外）
  event = util.getEvent(event);
  util.stopPropagation(event);
  clear();
  util.addHandler(document,'mousedown', down);
  util.addHandler(document, 'mouseup', up);
});
function open (target, disp, height, result, time, pro){
  var timer = null;

  function start(){
    var value = Math.floor(Tween.Linear(disp, height, result, time));
    node.css(target, pro, node.toPixe(value));
    if (disp <= time) {
      timer = requestAnimationFrame(start);
    } else if (disp > time) {
      cancelAnimationFrame(timer);
      node.css(action, 'background', ' url(./product/images/moveto/1.gif) no-repeat');
    }
    disp += 10;
  }
  timer = requestAnimationFrame(start);
}
function click(event){
  event = util.getEvent(event);
  var startX = node.css(action, "left"),
    startY = node.css(action, "top"),
    endX = event.clientX,
    endY = event.clientY,
    time = 500,
    disp = 0,
    proX = "left",
    proY = "top";
  node.css(action, 'background', ' url(./product/images/moveto/2.gif) no-repeat');
  open(action, disp, startX, endX-startX, time, proX);
  open(action, disp, startY, endY-startY, time, proY);
}
function down (event){
  event = util.getEvent(event);
  iPos = [{x: action.offsetLeft, y: action.offsetTop}];
  iPos.push({x: event.clientX, y: event.clientY});
  util.addHandler(document,'mousemove', move);
  return false;
}
function move (event){
  event = util.getEvent(event);
  iPos.push({x: event.clientX, y: event.clientY});
  return false;
}
function up (event){
  event = util.getEvent(event);
  document.mousemove = null;
  node.css(action, 'background', ' url(./product/images/moveto/2.gif) no-repeat');
  var i = 0,
    len = iPos.length,
    disp = 0,
    time = 30,
    timer = null;
  timer = setInterval(function (){
    node.css(action,"left",node.toPixe(iPos[i+1].x));
    node.css(action,"top",node.toPixe(iPos[i+1].y));
    i++;
    if(i < len-1) {
      console.log(i);
      open(action, disp, iPos[i].x, iPos[i+1].x-iPos[i].x, time, "left");
      open(action, disp, iPos[i].y, iPos[i+1].y-iPos[i].y, time, "top");
    } else {
      clearInterval(timer);
    }
  },10);
}
function clear(){
  util.removeHandler(document, "mousedowm", down);
  util.removeHandler(document, "mouseup", up);
  util.removeHandler(document, "mousemove", move);
  util.removeHandler(document, "click", click);
}
