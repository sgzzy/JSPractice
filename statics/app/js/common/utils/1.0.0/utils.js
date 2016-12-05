/**
 * Created by Administrator on 2016/12/5.
 */
/**
 * Utils
 * Version: 1.0.0
 * Date2016/12/05
 *https://github.com/nuintun/tween
 *
 * For details, see: https://github.com/nuintun/tween/blob/master/LICENSE
 * This is licensed under the MIT License (MIT).
 */
var AP = Array.prototype;
var OP = Object.prototype;
var APFilter = AP.filter;
var APIndexOf = AP.indexOf;
var APForEach = AP.forEach;
var OPToString = OP.toString;

/**
 *type
 * @param {any} value
 * @returns
 */
exports.type = function (value){
  return OPToString.call(value);
};

/**
 * typeIs
 * @param {any} value
 * @param {any} dataType
 * @returns
 */
exports.typeIs = function (value, dataType){
  return exports.type(value) == '[object ' + dataType + ']';
};

/**
 * inherits
 * @param ctor
 * @param superCtor
 * @param proto
 */
exports.inherits = function (ctor, superCtor, proto){
  function F(){
    // constructor
  }

  // prototype
  F.prototype = superCtor.prototype;

  ctor.prototype = new F(); // 将父类的原型赋值给子类的原型
  ctor.prototype.constructor = ctor; // 从父类继承原型后再将子类构造赋值给新的子类原型，保证子类的完整性

  if (proto) { // 若传入了函数原型参数，则将该原型中的属性赋值给子类的原型。
    for (var key in proto) {
      if (proto.hasOwnProperty(key)) {
        ctor.prototype[key] = proto[key];
      }
    }
  }
};

// isFinite ,返回一个判断是否为无穷数的函数
exports.isFinite = Number.isFinite || isFinite;

/**
 * isNatural
 * @param {any} number
 */
exports.isNatural = function (number){
  return exports.typeIs(number, 'Number') && exports.isFinite(number) && number >= 0;
};

/**
 * apply
 * @param {function} fn
 * @param {any} context
 * @param {Array} args
 * call is faster than apply, optimize less than 6 args
 * https://github.com/micro-js/apply
 * http://blog.csdn.net/zhengyinhui100/article/details/7837127
 */
exports.apply = function (fn, context, args){
  switch (args.length) {
    //faster
    case 0:
      return fn.call(context);
    case 1:
      return fn.call(context, args[0]);
    case 2:
      return fn.call(context, args[0], args[1]);
    case 3:
      return fn.call(context, args[0], args[1], args[2]);
    default:
      //slower
      return fn.apply(context , args);
  }
};

/**
 * indexOf
 * @param {any} array
 * @param {any} value
 * @param {any} from
 * returns
 */
exports.indexOf = APIndexOf ? function (array, value, from){
  return APIndexOf.call(array, value, from);
} : function (array, value, from){

  var length = array.length >>> 0; // 位运算，当length不存在时可强制转化为0

  from = Number(from) || 0;
  from = Math[from < 0 ? 'ceil' : 'floor'](from);

  if (from < 0) {
    from = Math.max(from + length, 0);
  }

  for (; from < length; from++) {
    if (from in array && array[from] === value) {
      return from;
    }
  }

  return -1;
};

/**
 * forEach
 * @param {any} array
 * @param {any} iterator
 * @param {any} context
 */
exports.forEach = APForEach ? function (array, iterator, context){
  APForEach.call(array, iterator, context)
} : function (array, iterator, context){
  if (arguments.length < 3) {
    context = array;
  }

  for (var i = 0, length = array.length; i < length; i++) {
    iterator.call(array, array[i], i, array);
  }
};
