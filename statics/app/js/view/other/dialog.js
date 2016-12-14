/**
 * Created by Administrator on 2016/12/14.
 */

var Dialog = require('dialog');
var Util = require('util');
var btn = document.getElementsByClassName('btn')[0];
var dialog = new Dialog();
Util.addHandler(btn, 'click', function (){
  dialog.openDialog();
});
