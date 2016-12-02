/**
 * Created by Administrator on 2016/11/24.
 */

function EventUtil(){

}
module.exports = new EventUtil();
EventUtil.prototype.addHandler = function (element, type, handler){//add EventListener
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
};
EventUtil.prototype.removeHandler = function (element, type, handler){// remove EventListener
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detach("on" + type, handler);
  } else {
    element["on" + type] = null;
  }
};
EventUtil.prototype.getEvent = function (event){// get Event
  return event ? event : window.event;
};
EventUtil.prototype.getTarget = function (event){// get Event's target
  return event.target || event.srcElement;
};
EventUtil.prototype.preventDefault = function (event){//取消事件的默认行为
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
};
EventUtil.prototype.stopPropagation = function (event){//阻止事件流冒泡
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
};
EventUtil.prototype.getRelatedTarget = function (event){//提供相关元素的属性,仅用于mouseover和mouseout事件
  if (event.getRelatedTarget) {
    return event.getRelatedTarget;
  } else if (event.toElement) {
    return event.toElement;
  } else if (event.fromElement) {
    return event.fromElement;
  } else {
    return null;
  }
};
//check mouse click events
EventUtil.prototype.getButton = function (event){
  if (document.implementation.hasFeature("MouseEvents", "2.0")) {
    return event.button;
  } else {
    switch (event.button) {
      case 0:
      case 1:
      case 3:
      case 5:
      case 7:
        return 0;
      case 2:
      case 6:
        return 2;
      case 4:
        return 1;
    }
  }
};
//get mouse scroll delta
EventUtil.prototype.getWheelDelta = function (event){
  return event.wheelDelta ? event.wheelDelta/120 : -event. detail/3;
};
//keyboard events
EventUtil.prototype.getKeyCode = function (event){
  if (typeof event.charCode == "number") {
    return event.charCode;
  } else {
    return event.keyCode;
  }
};
