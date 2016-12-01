/**
 * Created by Administrator on 2016/12/1.
 */
var node = require('node');
var util = require('util');
function Drag(context){
  this.drag = context.drag;
  this.left = 0;
  this.top = 0;
}
Drag.prototype = {
  start : function (event){
    event = util.getEvent(event);
    this.left = event.clientX - this.drag.offsetLeft;
    this.top = event.clientY - this.drag.offsetTop;
  }
};
var box = document.getElementById('box');
var context = {
  'drag' : box
};
var drag = new Drag(context);
var result = drag.start();
