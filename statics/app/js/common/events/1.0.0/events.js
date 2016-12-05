/**
 * Created by Administrator on 2016/12/5.
 */
/**
 * Events (Copy from niuntun)
 * Version: 1.0.0
 * Date: 2016/12/05
 * https://github.com/nuintun/tween
 *
 * This is licensed under the MIT License (MIT).
 * For details, see: https://github.com/nuintun/tween/blob/master/LICENSE
 */
var Utils = require('utils');

/**
 * Events
 * @constructor
 */
function Events(){// Events对象
  this._events = {};// _events属性，其值为一个对象
}

module.exports = Events;
// Set prototype
Events.prototype = {
  /**
   * Bind callback tos event
   * @param event
   * @param callback
   * @param context
   * @returns {Events}
   */
  on: function (event, callback){ // 传参event和一个回调函数
    var context = this;
    var events = context._events;
    var callbacks = events[event] || (events[event] = []);// 若events中存在event数组，则赋值给callbacks，否则定义一个空的event数组，赋值给callbacks

    if (Utils.typeIs(callback, 'Function')) {
      callbacks.push(callback);
    }
    return context;// 将最终把callback放入event数组后的Events对象返回
  },
  /**
   * Remove callback of event.
   * If 'callback' is null, removes all callbacks for the event
   * If 'event' is null, removes all bound callbacks for the event.
   * @param event
   * @param callback
   * @returns {Events}
   */
  off: function (event, callback){
    var context = this;

    switch (arguments.length) {
      case 0: //若没有参数传入，则将调用函数的Events对象的_events属性格式化为空
        context._events = {};
        break;
      case 1:
        delete context._events[event]; // 若传入event参数，则将_events对象中的event数组删除
        break;
      default:
        var callbacks = events[event]; // 若传入两个及以上参数，则将匹配event中的函数，若存在callback，则删除匹配到的第一该函数。

        if(callbacks) {
          var i = Utils.indexOf(callbacks,callback);

          if (i !== -1) {
            callbacks.splice(i,1);
          }
        }
        break;
    }
    return context;
  },
  /**
   * Bind a event only emit once
   * @param events
   * @param callback
   * @param context
   */
  once: function (events, callback, context){ //?????
    var that = this;
    var args = arguments;
    var cb = function (){
      context = args.length < 3 ? this : that;
      that.off(events, cb);
      Utils.apply(callback, context, arguments);// callback.apply(context,arguments),若context参数没有传入，则this为调用函数的events对象
    };
    return that.on(events, cb, context);
  },
  /**
   * Emit event with context
   * @param event
   * @param args
   * @param context
   * @returns {*}
   */
  emitWith: function (event, args, context){ // 将events中的event中的所有的函数都以context为this运行一遍
    var that = this;
    var events = that._events;
    var callbacks = events[event];

    if(!callbacks || callbacks.length === 0) {
      return false;
    }

    // Arguments length
    var length = arguments.length;

    // Default context 若没有传入context参数，则将this给其赋值
    if (length < 3) {
      context = that;
    }

    // Format args 无论是否传入args参数，最终都会将其转化为数组数据结构的，即使为空数组。
    if (length < 2) {
      args = [];
    } else {
      args = Utils.typeIs(args, 'Array') ? args : [args];
    }

    Utils.forEach(callbacks, function (callback){ // forEach(array,iterator,context),此处context为array，及callbacks
      Utils.apply(callback,context,args); // callback.apply(context,args)
    });

    return true;
  },
  /**
   * Emit event
   * @param event
   * @returns {*}
   */
  emit: function (event){
    var context = this;
    var events = context._events;
    var callbacks = events[event];

    if(!callbacks || callbacks.length === 0) {
      return false;
    }

    var rest = [];

    // Fill up 'rest' with the callback arguments. Since we arr only copying
    // the tail of `arguments`, a loop is much faster than Array#slice.
    for(var i = 1, length = arguments.length; i < length ; i++) { // 传入的参数中除第一个外，其他的转换为数组都作为emitWith的args参数
      rest[i-1] = arguments[i];
    }

    return context.emitWith(event, rest);
  }
};
