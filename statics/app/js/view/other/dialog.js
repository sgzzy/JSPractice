/**
 * Created by Administrator on 2016/12/14.
 */

var Dialog = require('dialog');
var Util = require('util');
var $ = require('jquery');
var btn = $('.btn')[0];


Util.addHandler(btn, 'click', function (){
  var model,remove,tabLock,position;
  var checks = $("input[type='checkbox']");
  for (var i = 0, len=checks.length; i < len; i++ ) {
    if(checks[i].checked == true) {
      switch (i) {
        case 0:
          model = true;
          break;
        case 1:
          remove = true;
          break;
        case 2:
          tabLock = true;
          break;
        case 3:
          position = true;
          break;
        default:
          break;
      }
    }
  }
  var dialog = new Dialog({
    title: {title: 'title', content: 'hhh'},
    content: 'World!',
    model: model,
    position: position,
    tabLock: tabLock,
    remove: remove
  })
    .show();
  $('.no-model').click(function (){
    dialog.model = false;
    dialog._create();
  });
});
