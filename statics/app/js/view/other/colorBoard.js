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
  var pixel = draw.hsvToRgb(x,y/100,1);
  rgb = 'RGB(' + Math.floor(pixel.r) + ',' + Math.floor(pixel.g) + ',' + Math.floor(pixel.b) +')';
  hex = draw.colorHex(rgb);
  console.log(rgb);
  console.log(hex);
  rgbColor.value = rgb;
  hexColor.value = hex;
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
  hsv.v = parseFloat(y) / 100;
  var pixel = draw.hsvToRgb(hsv.h, hsv.s, hsv.v);
  rgb = 'RGB(' + Math.floor(pixel.r) + ',' + Math.floor(pixel.g) + ',' + Math.floor(pixel.b) +')';
  hex = draw.colorHex(rgb);
  rgbColor.value = rgb;
  hexColor.value = hex;
}
