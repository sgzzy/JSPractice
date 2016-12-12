/**
 * Created by Administrator on 2016/12/6.
 */
var node = require('node');
var tween = require('tween');
var Util = require('util');
function Youa(obj){
  var context = this;
  context.diameter = obj.diameter;
  context.amount = obj.amount;
  context.width = obj.width;
  context.slide = obj.slide;
  context.slideItems = obj.slideItems;
  context.time = obj.time;
  context.timer = obj.timer;
  context.pro = obj.pro;
  context.delay = obj.delay;
  context.control = obj.control;
  context.isTrigger = obj.isTrigger;
  context.status = [context.amount];
  context.items = [context.amount];
  context.nextCount = context.amount - 1;
  context.prevCount = context.slideItems.length - 1;
}

module.exports = Youa;

Youa.prototype = {
  addCount: function (){
    var context = this;

    if (context.nextCount == context.slideItems.length - 1) {
      context.nextCount = 0;
    } else {
      context.nextCount++;
    }

    return context.nextCount;
  },
  reduceCount: function (){
    var context = this;

    if (context.prevCount == 0) {
      context.prevCount = context.slideItems.length;
    } else {
      context.prevCount--;
    }

    return context.prevCount;
  },
  movePrev: function (){ // 开始动画
    var context = this;
    var pro = context.pro;
    var start, end, target;

    if (context.items[context.amount - 1] === null) {
      context.items[context.amount - 1] = context.slideItems[context.prevCount];
      target = context.items[context.amount - 1];
      node.css(target, 'z-index', context.status[context.amount - 1]['z-index']);
      node.css(target, pro, node.toPixe(context.status[context.amount - 1][pro]));
    }

    for (var i = 0; i < context.amount; i++) {
      target = context.items[i];
      start = context.status[i][pro];
      if (i == context.amount - 1) { // 在元素运动之前先改变其除了位置属性外的其他属性
        end = context.status[0][pro] - start;
        node.css(target, 'z-index', context.status[0]['z-index']);
        node.css(target, 'opacity', context.status[0]['opacity']);
      } else {
        end = context.status[i + 1][pro] - start;
        node.css(target, 'z-index', context.status[i + 1]['z-index']);
        node.css(target, 'opacity', context.status[i + 1]['opacity']);
      }
      this.move(target, start, end, context.time, context.timer, pro);
    }

    setTimeout(function (){ // 动画完成后，对显示元素对象数组进行更新
      node.css(context.items[context.amount-1], 'z-index', 1);
      node.css(context.items[context.amount-1], 'opacity', 0);
      context.items.pop();
      context.items.unshift(context.slideItems[context.prevCount]);
      this.reduceCount(context);
    }, context.time);
  },
  moveNext: function (){ // 开始动画
    var context = this;
    var pro = context.pro;
    var start, end, target;

    if (context.items[context.amount - 1] === null) {
      context.items[context.amount - 1] = context.slideItems[context.nextCount];
      target = context.items[context.amount - 1];
      node.css(target, 'z-index', context.status[context.amount - 1]['z-index']);
      node.css(target, pro, node.toPixe(context.status[context.amount - 1][pro]));
      context.addCount(context);
    }

    for (var i = 0; i < context.amount; i++) {
      target = context.items[i];
      start = context.status[i][pro];
      if (i == 0) { // 在元素运动之前先改变其除了位置属性外的其他属性
        end = context.status[context.amount - 1][pro] - start;
        node.css(target, 'z-index', context.status[context.amount - 1]['z-index']);
        node.css(target, 'opacity', context.status[context.amount - 1]['opacity']);
      } else {
        end = context.status[i - 1][pro] - start;
        node.css(target, 'z-index', context.status[i - 1]['z-index']);
        node.css(target, 'opacity', context.status[i - 1]['opacity']);
      }
      this.move(target, start, end, context.time, context.timer, pro);
    }

    setTimeout(function (){ // 动画完成后，对显示元素对象数组进行更新
      node.css(context.items[0], 'z-index', 1);
      node.css(context.items[0], 'opacity', 0);
      context.items.shift();
      context.items.push(context.slideItems[context.nextCount]);
      context.addCount(context);
    }, context.time);
  },
  move: function (target, startValue, endValue, endTime, timer, pro){ // 单个元素运动函数
    var startTime;

    function end(time){
      if (timer === null) {
        startTime = time;
      }

      time = parseFloat(time - startTime);
      var value = Math.floor(tween.Linear(time, startValue, endValue, endTime));

      if (time < endTime) {
        timer = requestAnimationFrame(end);
      } else {
        value = startValue + endValue;
        cancelAnimationFrame(timer);
      }

      node.css(target, pro, node.toPixe(value));
    }

    requestAnimationFrame(end);
  },
  autoPlay: function (){
    var context = this;

    function play(){
      context.moveNext();
      setTimeout(play, context.delay)
    }

    play();
  },
  initStatus: function (){ // 初始化状态对象
    var context = this;
    for (var i = 0; i < context.amount; i++) {
      context.status[i] = {};
      context.status[i][context.pro] = 0;
      context.status[i]['z-index'] = 0;
      context.status[i]['opacity'] = 0;
    }
  },
  initItems: function (){ // 初始化显示元素对象数组
    var context = this;

    for (var i = 0; i < context.amount - 1; i++) {
      context.items[i] = context.slideItems[i];
    }
    context.items[context.amount - 1] = null;
  },
  defineItems: function (){ // 为显示元素对象定义相关属性
    var context = this;
    var pro = context.pro;

    for (var i = 0; i < context.amount - 1; i++) {
      node.css(context.items[i], pro, node.toPixe(context.status[i][pro]));
      node.css(context.items[i], 'z-index', context.status[i]['z-index']);
      node.css(context.items[i], 'opacity', context.status[i]['opacity']);
    }
  },
  defineStatus: function (){ // 为显示元素对象数组状态定义相关属性
    var context = this;
    var pro = context.pro;
    var r = parseFloat(context.diameter / 2);
    var index = context.amount - 2;
    var radius = parseFloat(Math.PI / index);
    var width = parseFloat(context.width);

    for (var i = 0; i < index + 1; i++) {

      if (i < index / 2) {
        context.status[i][pro] = (r - width / 2) * (1 - Math.cos(radius * i));
        context.status[i]['z-index'] = i + 1;
        context.status[context.amount - i - 2]['z-index'] = i + 1;
        context.status[i]['opacity'] = Math.log((2 * (i + 1) * (Math.E - 1)) / context.amount + 1);
        context.status[context.amount - i - 2]['opacity'] = Math.log((2 * (i + 1) * (Math.E - 1)) / context.amount + 1);
      } else if (i == index / 2) {
        context.status[i][pro] = r - width / 2;
        context.status[i]['z-index'] = i + 1;
        context.status[i]['opacity'] = 1;
      } else {
        context.status[i][pro] = context.diameter - (r - width / 2) * (1 + Math.cos(radius * i)) - width;
      }
    }

    context.status[context.amount - 1]['z-index'] = 1;
    context.status[context.amount - 1][pro] = context.status[index / 2][pro];

    return context;
  }
};
