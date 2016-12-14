/**
 * Created by Administrator on 2016/12/8.
 */
var DrawImage = require('drawColor');
var Util = require('util');
var node = require('node');
var lightBar = document.getElementById('lightBar');
var lCtx = lightBar.getContext('2d');
var rgbColor = document.getElementsByTagName('input');
var hexColor = rgbColor[3];
var colorBoard = document.getElementById('colorBoard').getElementsByTagName('img')[0];
var colorChoose = document.getElementsByClassName('color-choose')[0];
var colorBox = document.getElementsByClassName('colorBox')[0];
var rgb, hex;
var light = {
  ctx: lCtx,
  width: lightBar.width,
  height: lightBar.height
};
var lightDraw = new DrawImage(light);

Util.addHandler(colorBoard, 'mousedown', mousedown);
Util.addHandler(lightBar, 'click', lightClick);
function mousedown(event){

  event = Util.getEvent(event);
  canClick(event);
  Util.addHandler(document, 'mousemove',mousemove);
  Util.addHandler(document, 'mouseup', function (event){
    event = Util.getEvent(event);
    Util.removeHandler(document,'mousemove', mousemove);
  });
}

function mousemove(event){
  event = Util.getEvent(event);
  var target = Util.getTarget(event);
  if(target != colorBoard) {
    return;
  }
  Util.preventDefault(event);
  Util.stopPropagation(event);
  canClick(event);
}
function canClick(event){
  var x = event.offsetX;
  var y = event.offsetY;
  x -= colorBoard.width / 2;
  y = colorBoard.width / 2 - y;
  var radius = Math.sqrt(x * x + y * y);
  if (radius > colorBoard.width/2) {
    x = x*(colorBoard.width/2/radius);
    x = x > 0 ? Math.floor(x): Math.ceil(x);
    y = y*(colorBoard.width/2/radius);
    y = y > 0? Math.floor(y): Math.ceil(y);
    node.css(colorBox, 'left', (x+colorBoard.width/2) + 'px');
    node.css(colorBox, 'top', (colorBoard.width/2 - y) + 'px');
    choose(x,y);
  } else {
    node.css(colorBox, 'left', event.offsetX + 'px');
    node.css(colorBox, 'top', event.offsetY + 'px');
    choose(x,y);
  }
}

function lightClick(event){
  event = Util.getEvent(event);
  var r = Number(rgbColor[0].value);
  var g = Number(rgbColor[1].value);
  var b = Number(rgbColor[2].value);
  var hsv = lightDraw.rgbToHsv(r, g, b);
  var y = event.offsetY;
  hsv.v = parseFloat(360 - y) / 360;
  var pixel = lightDraw.hsvToRgb(hsv.h, hsv.s, hsv.v);
  rgb = 'RGB(' + Math.floor(pixel.r) + ',' + Math.floor(pixel.g) + ',' + Math.floor(pixel.b) + ')';
  hex = lightDraw.colorHex(rgb);
  rgbColor[0].value = Math.floor(pixel.r).toString();
  rgbColor[1].value = Math.floor(pixel.g).toString();
  rgbColor[2].value = Math.floor(pixel.b).toString();
  hexColor.value = hex.replace('#', '');
  colorChoose.style.background = hex;
}

function choose(x,y){
  var hs = toHSV(x, y);
  var pixel = lightDraw.hsvToRgb(hs.h, hs.s, 1);
  rgb = 'RGB(' + Math.floor(pixel.r) + ',' + Math.floor(pixel.g) + ',' + Math.floor(pixel.b) + ')';
  hex = lightDraw.colorHex(rgb);
  rgbColor[0].value = Math.floor(pixel.r).toString();
  rgbColor[1].value = Math.floor(pixel.g).toString();
  rgbColor[2].value = Math.floor(pixel.b).toString();
  hexColor.value = hex.replace('#', '');
  colorChoose.style.background = hex;
  lightDraw.drawLight(hs.h, hs.s);
}

function toHSV(x, y){
  var h, s;
  h = Math.floor(Math.asin(y / Math.sqrt(x * x + y * y)) * 180 / Math.PI);
  s = Math.sqrt(x * x + y * y) * 2 / colorBoard.width;
  return {
    h: h,
    s: s
  }
}
