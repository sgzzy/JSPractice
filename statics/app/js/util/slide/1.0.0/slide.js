/**
 * Created by Administrator on 2016/11/17.
 */
var node = require("node");
var Util = require("util");
function Slider(slide){
  this.banner = slide.banner;
  this.slider = slide.slider;
  this.autoPlay = false;
  this.isTrigger = slide.isTrigger;
  this.sliderItem = slide.sliderItem;
  this.direction = slide.direction; //true为水平，false为垂直
  this.timer = null;
  this.autotimer = null;
  this.index = slide.index;
  this.loop = slide.loop;
  this.active = null;
}
module.exports = Slider;
Slider.prototype = {
  move: function (iTarget){//一次动画的过程
    var pro = this.unit().pro;
    var oThis = this.slider;
    if (this.isTrigger) {//触发标签的变换
      var index = -iTarget / this.unit().uLength;
      var className;
      var triggers = document.getElementsByClassName("trigger-item");
      if (index >= this.index) { index = 0; }
      if (node.css(this.slider, pro) == -this.unit().uLength && this.sliderItem.length == this.index + 1) {index = this.index - 1;}
      if (this.active && this.active != triggers[index]) {
        className = this.active.className;
        this.active.className = className.replace(" active", "");
        this.active = null;
      }
      if (this.active == null) {
        triggers[index].className += " active";
        this.active = triggers[index];
      }
    }
    cancelAnimationFrame(oThis.timer);
    function start(){
      var value = node.css(oThis, pro);
      var iSpeed = (iTarget - value) / 10;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      node.css(oThis, pro, node.toPixe(value + iSpeed));
      if (node.css(oThis, pro) != iTarget) {
        oThis.timer = requestAnimationFrame(start);
      } else if (node.css(oThis, pro) == iTarget) {
        cancelAnimationFrame(oThis.timer);
      }
    }

    oThis.timer = requestAnimationFrame(start);
  },
  unit: function (){//获取移动的距离和初始位置及动画的属性
    var uLength, init;
    if (this.direction) {
      uLength = node.css(this.sliderItem[0], "width");
      init = node.css(this.slider, "left");
      return {
        uLength: uLength,
        init: init,
        pro: "left",
        unit: "width"
      };
    } else {
      uLength = node.css(this.sliderItem[0], "height");
      init = node.css(this.slider, "top");
      return {
        uLength: uLength,
        init: init,
        pro: "top",
        unit: "height"
      };
    }
  },
  next: function (){//下一张图片
    var pro = this.unit().pro;
    var uLength = -this.unit().uLength;
    var init = this.unit().init;
    var unit = this.unit().unit;
    init = Math.ceil(init / uLength) * uLength;
    var iTarget = init + uLength;
    if (this.loop) {
      if (this.sliderItem.length == this.index + 1 && iTarget == uLength) {//在从第一张进行上一张动画后再进行下一张动画
        this.slider.removeChild(this.sliderItem[0]);
        node.css(this.slider, pro, node.toPixe((this.index - 1) * uLength));
        iTarget = this.index * uLength;
      }
      if (iTarget == this.index * uLength) {//在最后一张上进行下一张的动画
        node.css(this.slider, unit, node.toPixe(-(this.index + 1) * uLength));
        var item = document.createElement("li");
        item = this.sliderItem[0].cloneNode(true);
        this.slider.appendChild(item);
      }
      if (iTarget == (this.index + 1) * uLength) {//在上面的动画完成后的再一次下一张动画
        node.css(this.slider, pro, 0);
        iTarget = uLength;
        this.slider.removeChild(this.sliderItem[this.index]);
      }
    }
    this.move(iTarget);
  },
  prev: function (){//上一张图片
    var pro = this.unit().pro;
    var uLength = this.unit().uLength;
    var init = this.unit().init;
    var unit = this.unit().unit;
    init = Math.ceil(init / uLength) * uLength;
    var iTarget = init + uLength;
    if (this.loop) {//多次快速点击，left最终始终为0
      if (iTarget == uLength && this.sliderItem.length == this.index + 1) {//在第一张进行上一张动画后的又一次上一张动画
        this.slider.removeChild(this.sliderItem[0]);
        node.css(this.slider, pro, node.toPixe(-(this.index - 1) * uLength));
        iTarget = (this.index - 2) * (-uLength);
      }
      if (iTarget == -uLength * (this.index - 1) && this.sliderItem.length == this.index + 1) {//在最后一张上next后又prev
        this.slider.removeChild(this.sliderItem[this.index]);
        node.css(this.slider, pro, node.toPixe(0));
        iTarget = uLength;
      }
      if (iTarget == uLength && this.sliderItem.length == this.index) {//在第一张进行上一张动画
        iTarget = 0;
        node.css(this.slider, unit, node.toPixe((this.index + 1) * uLength));
        var item = document.createElement("li");
        item = this.sliderItem[this.index - 1].cloneNode(true);
        this.slider.insertBefore(item, this.sliderItem[0]);
        node.css(this.slider, pro, node.toPixe(-uLength));
      }
    }
    this.move(iTarget);
  },
  play: function (){//播放动画
    var oThis = this;
    this.autotimer = setInterval(oThis.next.bind(oThis), 3000);
  },
  pause: function (){
    clearInterval(this.autotimer);
  },
  auto: function (flag){//自动播放
    this.autopaly = flag;
    if (this.autopaly) {
      this.play();
    }
  },
  trigger: function (){//生成触发标签
    var oThis = this;
    if (this.isTrigger) {
      var trigger = document.createElement("ul");
      var triggerItem;
      trigger.className = "slider-trigger";
      for (var i = 0; i < this.index; i++) {
        triggerItem = document.createElement("li");
        triggerItem.className = "trigger-item";
        trigger.appendChild(triggerItem);
      }
      this.banner.appendChild(trigger);
      var triggers = node.getTagChildNodes(trigger);
      triggers[0].className += " active";
      oThis.active = triggers[0];
      var className, iTarget;
      for (i = 0; i < this.index; i++) {
        Util.addHandler(triggers[i], "mouseover", function (event){
          var index = node.getIndexOfParent(this);
          if (oThis.active && oThis.active != this) {
            className = oThis.active.className;
            oThis.active.className = className.replace(" active", "");
            oThis.active = null;
          }
          if (oThis.active == null) {
            oThis.active = this;
            oThis.active.className += " active";
            iTarget = -index * oThis.unit().uLength;
            oThis.move(iTarget);
          }
        })
      }
    }
  }
};
