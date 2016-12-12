/**
 * Created by Administrator on 2016/11/29.
 */
var node = require('node'),
  util = require('util'),
  Tween = require('tween');
var list = document.getElementsByTagName('ul')[0],
  barL = document.getElementsByClassName('barL')[0],
  barR = document.getElementsByClassName('barR')[0],
  bar = document.getElementsByClassName('bar')[0],
  barM = document.getElementsByClassName('barM')[0],
  box = document.getElementById('box');
var widthUp = node.css(list, 'width'),
  widthUHas = node.css(node.getParentNode(list), 'width'),
  widthD = node.css(barM, 'width'),
  widthDHas = node.css(bar, 'width');
var lenUp = widthUp - widthUHas,
  lenD = widthD - widthDHas;
var timer = null;

util.addHandler(barM, 'click', click);

util.addHandler(bar, 'click', function (event){
  event = util.getEvent(event);
  util.stopPropagation(event);
});

util.addHandler(box, 'mouseover', over);

util.addHandler(bar, "mousedown", down);

util.addHandler(barL, 'mouseover', function (event){//鼠标入出左右标签控制滚轮
  var time = 4000;
  var left = node.css(bar,'left');
  time = Math.floor(4000*left/lenD);
  moveTo(0,time);
  util.addHandler(barL,'mouseout',function (event){
    cancelAnimationFrame(timer);
  })
});

util.addHandler(barR, 'mouseover', function (event){
  var time = 4000;
  var left = node.css(bar,'left');
  time = Math.floor(4000*(lenD-left)/lenD);
  moveTo(lenD,time);
  util.addHandler(barR,'mouseout',function (event){
    cancelAnimationFrame(timer);
  })
});

util.addHandler(document, 'keydown', function (event){//按左右键控制滚动条
  event = util.getEvent(event);
  var time = 200;
  var left = node.css(bar,'left');
  var value;
  if (event.keyCode == 37) {
    util.preventDefault(event);
    util.stopPropagation(event);
    value = left -10;
    value = value < 0 ? 0 : value;
    value = value > lenD ? lenD : value;
    moveTo(value,50);
  } else if (event.keyCode == 39) {
    util.preventDefault(event);
    util.stopPropagation(event);
    value = left + 10;
    value = value < 0 ? 0 : value;
    value = value > lenD ? lenD : value;
    moveTo(value,50);
  }
  util.addHandler(document,'keyup', function (){
    event = util.getEvent(event);
    if (event.keyCode == 37 || event.keyCode == 39)
    cancelAnimationFrame(timer);
  })
});
function sync(){
  var left = node.css(bar, 'left');
  var value = (left / lenD) * lenUp;
  node.css(list, 'left', node.toPixe(-value));
}
function click(event){
  event = util.getEvent(event);
  util.stopPropagation(event);
  var value = event.clientX - box.offsetLeft - node.css(barL, 'width') - node.css(bar, 'width') / 2;
  value = value < 0 ? 0 : value;
  value = value > lenD ? lenD : value;
  moveTo(value, 500);
}
function over(event){
  util.addHandler(box, 'mousewheel', mouseWheel);
  util.addHandler(box, 'DOMMouseScroll', mouseWheel);
  function mouseWheel(event){
    event = util.getEvent(event);
    util.preventDefault(event);
    util.stopPropagation(event);
    var detail = -util.getWheelDelta(event);
    var value = Math.ceil(node.css(bar, 'left') + (lenD / 6) * detail);
    value = value < 0 ? 0 : value;
    value = value > lenD ? lenD : value;
    moveTo(value, 300);
    return false;
  }
}
function down(event){
  event = util.getEvent(event);
  var start = event.clientX;
  util.addHandler(document, 'mousemove', move);
  function move(event){
    var left = node.css(bar, 'left');
    event = util.getEvent(event);
    util.preventDefault(event);
    util.stopPropagation(event);
    var end = event.clientX;
    var value = Math.ceil(end - start);
    value = left + value;
    value = value < 0 ? 0 : value;
    value = value > lenD ? lenD : value;
    moveTo(value, 500);
    return false;
  }
  util.addHandler(document, 'mouseup', function (event){
    event = util.getEvent(event);
    util.removeHandler(document, 'mousemove', move);
    util.removeHandler(document, 'mouseup');
  });
  return false;
}
function moveTo(target, time){
  var left = node.css(bar, 'left');
  var disp = 0;

  function start(){
    var value = Math.ceil(Tween.Linear(disp, left, target - left, time));
    node.css(bar, 'left', node.toPixe(value));
    sync();
    if (disp < time) {
      timer = requestAnimationFrame(start);
    } else if (disp >= time) {
      cancelAnimationFrame(timer);
      node.css(bar, 'left', node.toPixe(target));
    }
    disp += 10;
    isStop();
  }

  timer = requestAnimationFrame(start);
}
function isStop(){
  var len = node.css(bar, 'left');
  if (len == 0) {
    barL.className += " barLStop";
  } else if (len > 0 && len < lenD) {
    if (barL.className.search(" barLStop") != -1) {
      barL.className = barL.className.replace(" barLStop", "");
    }
    if (barR.className.search(" barRStop") != -1) {
      barR.className = barR.className.replace(" barRStop", "");
    }
  } else if (len == lenD) {
    barR.className += " barRStop"
  }
}
