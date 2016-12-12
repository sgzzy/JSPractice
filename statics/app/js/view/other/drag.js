/**
 * Created by Administrator on 2016/12/1.
 */
var node = require('node');
var util = require('util');
function Drag(drag, handle){
  this.drag = drag;
  this.handle = handle;
  this._moveDrag = this.moveDrag.bind(this);
  this._stopDrag = this.stopDrag.bind(this);
  this._x = this._y = 0;
  this.limit = false;
}
Drag.prototype = {
  start : function (){
    util.addHandler(this.handle, 'mousedown', this.startDrag.bind(this))
  },
  startDrag : function (event){
    event = util.getEvent(event);
    this._x = event.clientX - this.drag.offsetLeft;
    this._y = event.clientY - this.drag.offsetTop;
    util.addHandler(document, 'mousemove', this._moveDrag);
    util.addHandler(document, 'mouseup', this._stopDrag);
    util.preventDefault(event);
    this.handle.setCapture && this.handle.setCapture();
  },
  moveDrag : function (event){
    event = util.getEvent(event);
    var iLeft = event.clientX - this._x;
    var iTop = event.clientY - this._y;
    if(this.limit) {
      var width = document.documentElement.clientWidth-this.drag.offsetHeight;
      var height = document.documentElement.clientHeight-this.drag.offsetWidth;
      iLeft = iLeft < 0 ? 0 : iLeft;
      iLeft = iLeft > width ? width : iLeft;
      iTop = iTop < 0 ? 0 : iTop;
      iTop = iTop > height ? height : iTop;
    }
    node.css(this.drag, 'left', node.toPixe(iLeft));
    node.css(this.drag, 'top', node.toPixe(iTop));
  },
  stopDrag : function (event){
    event = util.getEvent(event);
    util.removeHandler(this.drag, 'mousedown', this.startDrag.bind(this));
    util.removeHandler(document, 'mousemove', this._moveDrag);
    this.handle.releaseCapture && this.handle.releaseCapture();
  }
};
var box = document.getElementById('box');
var handle = document.getElementsByClassName('title')[0];
var oDrag = new Drag(box, handle);
oDrag.limit = true;
oDrag.start();
