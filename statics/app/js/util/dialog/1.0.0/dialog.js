/**
 * Created by Administrator on 2016/12/14.
 */
var node = require('node');

function Dialog(){
  var context = this;
  context.count = 0;
  context.dialogs = [];
  context.dialog = document.createElement('div');
  context.dialog.className = 'dialog';
  context.shade = document.createElement('div');
  context.shade.className = 'shade';
}

module.exports = Dialog;

Dialog.prototype = {
  initDialog: function (){
    var context = this;
    context.dialog.innerHTML = 'Hello World!';
  },
  openDialog: function (){
    var context = this;
    var dialog = context.dialog.cloneNode(true);
    if (context.count == 0) {
      document.body.appendChild(context.shade);
    }
    console.log(context.count);
    node.css(context.shade, 'z-index', context.count);
    document.body.appendChild(dialog);
    node.css(dialog,'z-index', ++context.count);
    console.log(node.css(dialog, 'z-index'));
  },
  closeDialog: function (){
    var context = this;
    var dialog = document.getElementsByClassName('dialog')[0];
    document.documentElement.removeChild(dialog);
    if (context.dialogs.length != 0) {
      dialog = context.dialogs.shift();
      dialog.className = 'dialog';
    }
  }
};
