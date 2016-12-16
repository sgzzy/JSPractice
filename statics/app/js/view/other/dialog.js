/**
 * Created by Administrator on 2016/12/14.
 */

var Dialog = require('dialog');
var Util = require('util');
var btn = document.getElementsByClassName('btn')[0];
Util.addHandler(btn, 'click', function (){
  var dialog = new Dialog({
    title: {title: 'title', content: 'hhh'},
    content: 'World!',
    model: true
  })
    .show();
});
