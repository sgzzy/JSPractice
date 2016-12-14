/**
 * Created by Administrator on 2016/12/8.
 */
var DrawImage = require('drawColor');
var Util = require('util');
var can = document.getElementById('can');
var ctx = can.getContext('2d');
var lightBar = document.getElementById('lightBar');
var lCtx = lightBar.getContext('2d');
var rgbColor = document.getElementsByClassName('rgb-color')[0];
var hexColor = document.getElementsByClassName('hex-color')[0];
var colorBoard = document.getElementById('colorBoard');
var rgb, hex;
var obj = {
  ctx : ctx,
  width: can.width,
  height: can.height
};
var light = {
  ctx: lCtx,
  width: lightBar.width,
  height: lightBar.height
};
var draw = new DrawImage(obj);
var lightDraw = new DrawImage(light);
draw.drawImage();

Util.addHandler(can, 'click', canClick);
Util.addHandler(lightBar, 'click', lightClick);
function canClick(event){
  event = Util.getEvent(event);
  var x = event.offsetX;
  var y = event.offsetY;
  x -= can.width/2;
  y = can.width/2 - y;
  var hs = toHSV(x,y);
  console.log(hs.h);
  console.log(hs.s);
  var pixel = draw.hsvToRgb(hs.h,hs.s,1);
  console.log(pixel);
  rgb = 'RGB(' + Math.floor(pixel.r) + ',' + Math.floor(pixel.g) + ',' + Math.floor(pixel.b) +')';
  hex = draw.colorHex(rgb);
  lightBar.style.background = hex;
  rgbColor.value = rgb;
  rgbColor.style.backgroundColor = hex;
  hexColor.value = hex;
  hexColor.style.backgroundColor = hex;
  lightDraw.drawLight(x,y);
}

function lightClick(event){
  event = Util.getEvent(event);
  var rgbC = rgbColor.value;
  var regI = /(?:\(|\)|rgb|RGB)*/g;
  var rgbN = rgbC.replace(regI, '').split(',');
  var r = Number(rgbN[0]);
  var g = Number(rgbN[1]);
  var b = Number(rgbN[2]);
  var hsv = draw.rgbToHsv(r, g, b);
  var y = event.offsetY;
  hsv.v = parseFloat(100-y) / 100;
  var pixel = draw.hsvToRgb(hsv.h, hsv.s, hsv.v);
  rgb = 'RGB(' + Math.floor(pixel.r) + ',' + Math.floor(pixel.g) + ',' + Math.floor(pixel.b) +')';
  hex = draw.colorHex(rgb);
  rgbColor.value = rgb;
  rgbColor.style.backgroundColor = hex;
  hexColor.value = hex;
  hexColor.style.backgroundColor = hex;
}
function toHSV(x,y){
  var h,s;
  h = Math.floor(Math.asin(y/Math.sqrt(x*x + y*y))*180/Math.PI);
  s = Math.sqrt(x*x + y*y)*2/can.width;
  return {
    h: h,
    s: s
  }
}
