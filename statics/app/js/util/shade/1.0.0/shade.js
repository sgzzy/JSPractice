/**
 * Created by Administrator on 2016/12/20.
 */
var $ = require('jquery');
var dialog = require('dialog');

var Shade = {
  // 遮罩缓存队列
  alloc: [],
  // 遮罩当前匹配浮层
  anchor: null,
  // 遮罩节点
  node: $('<div tabindex="0"></div>')
    .css({
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }),
  /**
   * 设置遮罩层级
   * @param zIndex
   */
  zIndex: function (zIndex){
    // 遮罩层级比浮层低一级，最小为0
    zIndex = Math.max(0, --zIndex);
    Shade.node.css('z-index', zIndex);
  },
  /**
   * 将遮罩与浮层节点匹配
   * @param anchor
   */
  attach: function (anchor){
    var node = anchor.node;
    var className = node.className + '-shade';

    Shade.node
      .css('class', className)
      .insertBefore(anchor.node);

    if(anchor !== Shade.anchor) {
      var alloc = Shade.alloc;
      var index = alloc.indexOf(anchor);
      if (index === -1 || index === alloc.length-1) {
        // 若浮层为缓存队列队尾元素，则替换
        if (index !== -1) {
          alloc.splice(index,1);
        }
        // 若浮层不在缓存队列中则进队
        alloc.push(anchor);
        // 更新遮罩匹配浮层
        Shade.anchor = anchor;
      }
    }
  },
  /**
   * 遮罩随着浮层的删除的变动
   * @param anchor
   */
  hide: function (anchor){
    Shade.alloc = Shade.alloc.filter(function (item){
      return anchor !== item;
    });

    var length = Shade.alloc.length;

    // 若删除的浮层为最后一层，则遮罩销毁，否则遮罩与上一浮层匹配
    if(!length) {
      Shade.node.remove();
      Shade.anchor = null;
    } else {
      anchor = Shade.alloc[length-1];
      Shade.zIndex(anchor.zIndex);
      Shade.attach(anchor);
    }
  }
};

module.exports = Shade;
