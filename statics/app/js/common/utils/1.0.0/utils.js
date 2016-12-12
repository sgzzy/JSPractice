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
var SP = String.prototype;
var APFilter = AP.filter;
var APIndexOf = AP.indexOf;
var APForEach = AP.forEach;
var OPToString = OP.toString;
var APFrom = AP.from;

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

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
exports.from = APFrom ? APFrom : (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
}());
/**
 * colorHex
 * @returns
 */
SP.colorHex = function (){
  var that = this;
  var regR = /^(rgb|RGB)/;
  var regI = /(?:\(|\)|rgb|RGB)*/g;
  var hex='#';
  var i;
  if(regR.test(that)) {
    var rgbN = that.replace(regI,'').split(',');
    for(i=0;i < rgbN.length; i++) {
      var num = Number(rgbN[i]);
      if(num < 0 || num >255) {
        throw new RangeError('The RGB number is out of range.');
      } else {
        var strHex = num.toString(16);
        strHex = num < 16 ? '0'+strHex : strHex;
      }
      hex += strHex;
    }
    if(hex.length != 7) {
      throw new RangeError('The RGB numbers is not three.');
    } else {
      return hex;
    }
  }
};
/**
 * colorRgb
 * @returns
 */
SP.colorRgb = function (){
  var that = this.toLowerCase();
  var reg = /^#([0-9a-f]{3}|[0-9a-f]{6})$/;
  var rgb = 'RGB(';
  var i;
  if(that && reg.test(that)) {
    var hexN = that.replace('#','');
    if(hexN.length == 3) {
      hexN = hexN.split('');
      for(i=0;i<3;i++) {
        hexN[i] += hexN[i];
      }
    } else if(hexN.length == 6) {
      hexN = hexN.match(/[0-9a-f]{2}/g);
    }
    for(i = 0; i < 3; i++) {
      hexN[i] = parseInt('0x'+hexN[i],10);
    }
    rgb += hexN[0] + ', ' + hexN[1] + ', ' + hexN[2] + ')';
    return rgb;
  } else {
    throw new Error('The colorHex\'s  format is warn.');
  }
};
