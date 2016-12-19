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
    model: true,
    position: true
  })
    .show();
});
/*Util.addHandler(document, 'keydown', function (event){
  console.log(1);
  event = Util.getEvent(event);
  var keyCode = event.keyCode;
  console.log(keyCode);
  if (keyCode == 9) {
    console.log(document.activeElement);
  }
});*/
