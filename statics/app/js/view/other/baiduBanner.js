/**
 * Created by Administrator on 2016/12/6.
 */
var node = require('node');
var Utils = require('util');
var Youa = require('youa');
var banner = document.getElementById('container');
var slider = document.getElementsByClassName('item');
var control = document.getElementById('control');
var diameter = node.css(banner,'width');
var width = node.css(slider[0],'width');
var obj = {
  slide: banner,
  slideItems: slider,
  diameter: diameter,
  amount: 6,
  width: width,
  time: 500,
  timer: null,
  pro: 'left',
  delay: 2000,
  control: control,
  isTrigger: true
};
var animation = new Youa(obj);
animation.initItems();
animation.initStatus();
animation.defineStatus();
animation.defineItems();
var btn = document.getElementById('btn');
btn.onclick = function (){
  animation.autoPlay();
};
