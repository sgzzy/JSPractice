/**
 * Created by Administrator on 2016/12/1.
 */
var Slider =require('slider');
var slider = document.getElementsByClassName('slider-list')[0];
var prev = document.getElementsByClassName('pre')[0];
var next = document.getElementsByClassName('next')[0];
var banner = document.getElementsByClassName("slider-content")[0];
var sliderItem = document.getElementsByClassName('slider-list-item');
var index = sliderItem.length;
var slide =  {
  "banner" : banner,
  "slider" : slider,
  "sliderItem" : sliderItem,
  "index" : index,
  "isTrigger" : true,
  "direction" : false,
  "loop" : true
};
var obj = new Slider(slide);
obj.trigger();
prev.onclick = function (){
  obj.pause();
  obj.prev();
};
next.onclick = function (){
  obj.pause();
  obj.next();
};
