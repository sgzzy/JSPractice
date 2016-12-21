/**
 * Created by Administrator on 2016/12/21.
 */
var $ = require('jquery');
var Shade = require('shade');

var FocusLock = {
   node: $('<div tabindex="0"></div>').css({
     width: 0,
     height: 0,
     position: 'absolute',
     overflow: 'hidden'
   }),

  /**
   * 若遮罩已匹配到浮层，则焦点锁定层插入所给浮层之后
   * @param anchor
   */
   attach: function (anchor){
     if (Shade.anchor) {
       FocusLock.node.insertAfter(anchor.node);
     }
   },

  /**
   * 若遮罩销毁,则焦点锁定层也会随之销毁
   */
  hide: function (){
    if(!Shade.anchor) {
      FocusLock.node.remove();
    }
  }
};
