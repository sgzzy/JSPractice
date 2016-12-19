/**
 * Created by Administrator on 2016/12/14.
 */
var node = require('node');
var Util = require('util');

//创建一个初始弹窗
var dialog = document.createElement('div');
dialog.className = 'ui-dialog';
var dialogContent = document.createElement('div');
dialogContent.className = 'dialog-content';
var title = document.createElement('div');
title.className = 'dialog-title fn-clear';
var titleContent = document.createElement('h2');
var closeIcon = document.createElement('i');
closeIcon.className = 'icon-close';
title.appendChild(closeIcon);
title.appendChild(titleContent);
var content = document.createElement('div');
content.className = 'dialog-main';
var foot = document.createElement('div');
foot.className = 'dialog-foot fn-clear';
var ok = document.createElement('input');
ok.className = 'dialog-ok';
ok.type = 'button';
ok.value = '确定';
var cancel = document.createElement('input');
cancel.className = 'dialog-cancel';
cancel.type = 'button';
cancel.value = '取消';
foot.appendChild(ok);
foot.appendChild(cancel);
dialogContent.appendChild(title);
dialogContent.appendChild(content);
dialogContent.appendChild(foot);
dialog.appendChild(dialogContent);

var shade = document.createElement('div');
var tabIndex = document.createElement('div');
tabIndex.className = 'dialog-tab';
shade.className = 'dialog-shade';
shade.setAttribute('tabindex', '0');
tabIndex.setAttribute('tabindex', '0');
tabIndex.innerHTML = 'adf';
dialog.appendChild(tabIndex);
dialog.setAttribute('tabindex', '-1');
/**
 *
 * @param obj
 * @constructor
 */
function Dialog(obj){
  var context = this;

  //初始化弹窗属性参数
  context.obj = obj;
  context.shade = shade;
  context.shadeZIndex = 1024;

  context.model = obj.model || false;
  context.remove = obj.remove || false;
  context.tabLock = obj.tabLock || true;
  context.position = obj.position || false;

  context.dialogs = [];

  context.defaultDialog(context.obj);

}

module.exports = Dialog;

/**
 *
 * @type {{init: Dialog.init, show: Dialog.show, ok: Dialog.ok}}
 */
Dialog.prototype = {
  /**
   *
   * @param obj
   */
  defaultDialog: function (obj){
    var context = this;
    // Attributes
    context.title = obj.title || '';
    context.content = obj.content || '';
    context.okValue = obj.okValue || ok.value;
    context.cancelValue = obj.cancelValue || cancel.value;

    // Methods
    context._ok = obj._ok || context._ok;
    context._cancel = obj._cancel || context._cancel;

    context._title(context.title);
    context._content(context.content);



    context.dialog = dialog.cloneNode(true);
    context.ok = context.dialog.getElementsByClassName('dialog-ok')[0];
    context.cancel = context.dialog.getElementsByClassName('dialog-cancel')[0];
    context.close = context.dialog.getElementsByClassName('icon-close')[0];
    node.css(context.dialog, 'z-index', context.shadeZIndex);

    context.dialogs.push(context.dialog);

    if (context.position) {
      var left = node.css(context.dialog, 'left');
      var top = node.css(context.dialog, 'top');
      var randomLeft = Math.floor(Math.random()*left/100);
      var randomTop = Math.floor(Math.random()*top/100);
      node.css(context.dialog, 'left', randomLeft);
      node.css(context.dialog, 'top', randomTop);
    }

    Util.addHandler(context.ok, 'click', function (){
      context._ok();
    });
    Util.addHandler(context.cancel, 'click', function (){
      context._cancel();
    });
    Util.addHandler(context.close, 'click', function (){
      context._close();
    });
    return context;
  },

  /**
   *
   * @param title
   * @returns {Dialog}
   */
  _title: function (title){
    var context = this;
    var type = Object.prototype.toString.call(title);
    if (type == '[object String]') {
      titleContent.innerHTML = title;
    } else if (type == '[object Object]') {
      titleContent.setAttribute('title', title.title);
      titleContent.innerHTML = title.content;
    } else {
      throw new TypeError("The param is not current type.");
    }
    return context;
  },

  /**
   *
   * @param main
   * @returns {Dialog}
   */
  _content: function (main){
    var context = this;
    var type = Object.prototype.toString.call(main);
    if (type == '[object String]') {
      content.innerHTML = main;
    }
    return context;
  },

  _width: function (value){
    var context = this;
    node.css(context.dialog, 'width', value+'px');
  },
  _height: function (value){
    var context = this;
    node.css(context.dialog, 'height', value + 'px');
  },
  _position: function (left, right){
    var context = this;

  },
  /**
   * 弹出弹窗
   *
   * @returns {Dialog}
   */
  show: function (){
    var context = this;
    if (context.model) {
      node.css(context.shade, 'z-index', context.shadeZIndex);
      document.body.appendChild(context.shade);
      document.body.appendChild(context.dialog);
    } else {
      document.body.appendChild(context.dialog);
    }
    context.dialog.focus();
    node.css(context.dialog, 'z-index', context.shadeZIndex);
    node.css(context.dialog, 'display', 'block');
    context.lockTab();
    return context;
  },

  /**
   * 关闭弹窗
   *
   * @returns {Dialog}
   */
  _close: function (){
    var context = this;
    node.css(context.dialog, 'display', 'none');
    if (context.model) {
      if (context.dialogs.length === 1) {
        document.body.removeChild(context.dialog);
        document.body.removeChild(context.shade);
        context.dialogs.pop();
      } else {
        document.body.removeChild(context.dialog);
        context.dialogs.pop();
        context.shadeZIndex--;
        context.dialog = context.dialogs.pop();
        document.body.appendChild(context.shade);
        document.body.appendChild(context.dialog);
        node.css(context.shade, 'z-index', context.shadeZIndex);
        context.dialogs.push(context.dialog);
      }
    } else if (context.remove) {
      document.body.removeChild(context.dialog);
      context.dialogs.pop();
      context.dialog = context.dialogs.pop();
      context.dialogs.push(context.dialog);
    } else {
      context.dialogs.pop();
      context.dialog = context.dialogs.pop();
      context.dialogs.push(context.dialog);
    }
    return context;
  },

  /**
   * 确定按钮
   * @returns {*}
   * @private
   */
  _ok: function (){
    var context = this;
    // alert('The work has done!');
    return context._create();
  },

  /**
   * 取消按钮
   * @returns {*|Dialog}
   * @private
   */
  _cancel: function (){
    var context = this;
    return context._close();
  },

  /**
   * 再生成一个弹窗
   * @returns {*}
   * @private
   */
  _create: function (){
    var context = this;
    context = context.defaultDialog(context.obj);
    context.shadeZIndex++;
    node.css(context.dialog, 'z-index', context.shadeZIndex);
    return context.show();
  },

  lockTab: function (){
    var context = this;
    var tab = context.dialog.getElementsByClassName('dialog-tab')[0];
    var ok = context.dialog.getElementsByClassName('dialog-ok')[0];
    Util.addHandler(tab, "focus", function (){
      context.shade.focus();
    });
    Util.addHandler(context.shade, 'focus', function (){
      context.dialog.focus();
    })
  }
};
