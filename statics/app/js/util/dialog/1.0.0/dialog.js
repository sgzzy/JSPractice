/**
 * Created by Administrator on 2016/12/14.
 */
var node = require('node');
var Util = require('util');

//创建一个初始弹窗
var dialog = document.createElement('div');
dialog.className = 'ui-dialog';
var title = document.createElement('div');
title.className = 'dialog-title fn-clear';
var titleContent = document.createElement('h2');
var closeIcon = document.createElement('i');
closeIcon.className = 'icon-close';
title.appendChild(closeIcon);
title.appendChild(titleContent);
var content = document.createElement('div');
content.className = 'dialog-content';
var foot = document.createElement('div');
foot.className = 'dialog-foot fn-clear';
var ok = document.createElement('input');
ok.className = 'dialog-ok';
ok.type = 'button';
ok.value = '确定';
var cancel = document.createElement('input');
cancel.className ='dialog-cancel';
cancel.type = 'button';
cancel.value = '取消';
foot.appendChild(cancel);
foot.appendChild(ok);
dialog.appendChild(title);
dialog.appendChild(content);
dialog.appendChild(foot);


var shade = document.createElement('div');
shade.className = 'dialog-shade';

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
  _content: function (main) {
    var context = this;
    var type = Object.prototype.toString.call(main);
    if (type == '[object String]') {
      content.innerHTML = main;
    }
    return context;
  },

  /**
   * 弹出弹窗
   *
   * @returns {Dialog}
   */
  show: function () {
    var context = this;
    if (context.model) {
      node.css(context.shade, 'z-index', context.shadeZIndex);
      context.shade.setAttribute('tab-index', '0');
      document.body.appendChild(context.shade);
    }
    document.body.appendChild(context.dialog);
    node.css(context.dialog, 'z-index', context.shadeZIndex);
    node.css(context.dialog, 'display', 'block');
    if (context.tabLock) {
      context.dialog.setAttribute('tab-index', '-1');
      context.dialog.focus();
      Util.addHandler(context.dialog, 'blur', function (){
        console.log(1);
        document.activeElement !== context.dialog && context.dialog.focus();
      });
    }
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
    } else if(context.remove) {
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
  _ok: function () {
    var context = this;
    // alert('The work has done!');
    return context._create();
  },
  _cancel: function () {
    var context = this;
    return context._close();
  },
  _create: function (){
    var context = this;
    context = context.defaultDialog(context.obj);
    context.shadeZIndex++;
    node.css(context.dialog, 'z-index', context.shadeZIndex);
    return context.show();
  }

};
