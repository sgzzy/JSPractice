/**
 * Created by Administrator on 2016/12/14.
 */

var $ = require('jquery');
var Shade = require('shade');
var FocusLock = require('focusLock');


//创建一个初始弹窗
/**
 * <div class="ui-dialog">
 *   <div class="dialog-content">
 *     <div class="dialog-title fn-clear">
 *       <i class="icon-close"></i>
 *       <h2>{{title}}</h2>
 *     </div>
 *     <div class="dialog-main">
 *       <p>{{data}}</p>
 *       <p>{{data}}</p>
 *       <p>{{data}}</p>
 *     </div>
 *     <div class="dialog-foot">
 *       <input type="button" class="dialog-ok" value={{okValue}}>
 *       <input type="button" class="dialog-cancel" value={{cancelValue}}>
 *     </div>
 *   </div>
 * </div>
 *
 */
function Dialog(obj) {
  var context = this;
  context.obj = obj;
  context.model = obj.model || false;
  context.focusLock = obj.focusLock || false;
  context.title = obj.title || '';
  context.content = obj.content || '';
  context.okValue = obj.okValue || "确定";
  context.cancelValue = obj.cancelValue || "取消";

  context.zIndex = Math.max(1024, Shade.node.css('z-index'));

  var node = '<div class="ui-dialog"><div class="dialog-content"><div class="dialog-title fn-clear"><i class="icon-close"></i><h2>' + context.title +
  '</h2></div><div class="dialog-main">' + context.content + '</div><div class="dialog-foot"><input type="button" class="dialog-ok" value=' +
  context.okValue + '><input type="button" class="dialog-cancel" value=' + context.cancelValue + '></div></div></div>';

  context.node = $(node);
}

Dialog.prototype = {
  show: function (){
    var context = this;
    context.node.appendTo(document.body);

  }
};





















/*
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
foot.className = 'dialog-foot';
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
dialog.setAttribute('tabindex', '-1');
/!**
 *
 * @param obj
 * @constructor
 *!/
function Dialog(obj){
  var context = this;

  //初始化弹窗属性参数
  context.obj = obj;
  context.shade = shade;
  context.tabIndex = tabIndex;
  context.shadeZIndex = 1024;

  context.model = obj.model || true;
  context.remove = obj.remove || false;
  context.tabLock = obj.tabLock || true;
  context.position = obj.position || false;

  context.dialogs = [];

  context.defaultDialog(context.obj);

}

module.exports = Dialog;

/!**
 *
 * @type {{init: Dialog.init, show: Dialog.show, ok: Dialog.ok}}
 *!/
Dialog.prototype = {
  /!**
   *
   * @param obj
   *!/
  defaultDialog: function (obj){
    var context = this;
    // Attributes
    context.title = obj.title || '';
    context.content = obj.content || '';
    context.okValue = obj.okValue || ok.value;
    context.cancelValue = obj.cancelValue || cancel.value;
    obj.width && context._width(obj.width);
    obj.height && context._height(obj.height);

    // Methods
    context._ok = obj._ok || context._ok;
    context._cancel = obj._cancel || context._cancel;

    context._title(context.title);
    context._content(context.content);

    // obj.position && context._position(obj.position.left, obj.position.top);


    context.dialog = dialog.cloneNode(true);
    context.ok = context.dialog.getElementsByClassName('dialog-ok')[0];
    context.cancel = context.dialog.getElementsByClassName('dialog-cancel')[0];
    context.close = context.dialog.getElementsByClassName('icon-close')[0];

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

  /!**
   *
   * @param title
   * @returns {Dialog}
   *!/
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

  /!**
   *
   * @param main
   * @returns {Dialog}
   *!/
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
  _position: function (left, top){
    var context = this;
    var width = node.css(context.dialog,'width')/2 || -node.css(context.dialog, 'marginLeft');
    var height = node.css(context.dialog,'height')/2 || -node.css(context.dialog, 'marginTop');
    node.css(context.dialog, 'left', (left+width)+'px');
    node.css(context.dialog, 'top', (top+height)+'px');
  },
  /!**
   * 弹出弹窗
   *
   * @returns {Dialog}
   *!/
  show: function (){
    var context = this;
    if (context.model) { // 模态
      node.css(context.shade, 'z-index', context.shadeZIndex);
      document.body.appendChild(context.shade);
      document.body.appendChild(context.dialog);
    } else { // 非模态
      document.body.appendChild(context.dialog);
    }
    document.body.appendChild(context.tabIndex);
    context.dialog.focus();
    node.css(context.dialog, 'z-index', context.shadeZIndex);
    node.css(context.tabIndex, 'z-index', context.shadeZIndex);
    node.css(context.dialog, 'display', 'block');
    if (context.position) { // 位置随机
      var left = node.css(context.dialog, 'marginLeft');
      var top = node.css(context.dialog, 'marginTop');
      var width = window.innerWidth+left*2;
      var height = window.innerHeight+top*2;
      var randomLeft = Math.floor(Math.random()*width-left);
      var randomTop = Math.floor(Math.random()*height-top);
      node.css(context.dialog, 'left', randomLeft+'px');
      node.css(context.dialog, 'top', randomTop+'px');
    }
    if (context.tabLock) { // 焦点锁定
      context.lockTab();
    }
    return context;
  },

  /!**
   * 关闭弹窗
   *
   * @returns {Dialog}
   *!/
  _close: function (){
    var context = this;
    node.css(context.dialog, 'display', 'none');
    if (context.model) { // 模态
      if (context.dialogs.length === 1) { // 最后一个弹窗
        document.body.removeChild(context.tabIndex);
        document.body.removeChild(context.dialog);
        document.body.removeChild(context.shade);
        context.dialogs.pop();
      } else { // 不是最后一个弹窗
        document.body.removeChild(context.dialog);
        context.dialogs.pop();
        context.shadeZIndex--;
        context.dialog = context.dialogs.pop();
        document.body.appendChild(context.shade);
        document.body.appendChild(context.dialog);
        document.body.appendChild(context.tabIndex);
        node.css(context.shade, 'z-index', context.shadeZIndex);
        context.dialogs.push(context.dialog);
      }
    } else if (context.remove) { // 非模态，关闭销毁
      document.body.removeChild(context.dialog);
      context.dialogs.pop();
      context.dialog = context.dialogs.pop();
      document.body.appendChild(context.tabIndex);
      context.dialogs.push(context.dialog);
    } else { // 非模态，关闭不销毁
      context.dialogs.pop();
      context.dialog = context.dialogs.pop();
      context.dialogs.push(context.dialog);
    }
    return context;
  },

  /!**
   * 确定按钮
   * @returns {*}
   * @private
   *!/
  _ok: function (){
    var context = this;
    // alert('The work has done!');
    return context._create();
  },

  /!**
   * 取消按钮
   * @returns {*|Dialog}
   * @private
   *!/
  _cancel: function (){
    var context = this;
    return context._close();
  },

  /!**
   * 再生成一个弹窗
   * @returns {*}
   * @private
   *!/
  _create: function (){
    var context = this;
    context = context.defaultDialog(context.obj);
    if (context.model) {
      context.shadeZIndex++;
    }
    return context.show();
  },

  lockTab: function (){
    var context = this;
    var dia = context.dialog;
    var ok = context.dialog.getElementsByClassName('dialog-ok')[0];
    Util.addHandler(context.tabIndex, "focus", function (){
      context.shade.focus();
    });
    Util.addHandler(dia, 'focus', function (){
      console.log(1);
      console.log(dia);
      node.css(dia, 'z-index', ++context.shadeZIndex);
    });
  }
};
*/
