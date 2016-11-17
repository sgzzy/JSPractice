/**
 * Created by Administrator on 2016/11/14.
 */
define(function (){
    return {
      addHandler: function (element, type, handler){
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent("on" + type, handler);
        } else {
          element["on" + type] = handler;
        }
      },
      removeHandler: function (element, type, handler){
        if (element.removeEventListener) {
          element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
          element.detach("on" + type, handler);
        } else {
          element["on" + type] = null;
        }
      },
      getEvent: function (event){
        return event ? event : window.event;
      },
      getTarget: function (event){
        return event.target || event.srcElement;
      }
    };
});
