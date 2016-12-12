/**
 * Created by Administrator on 2016/11/10.
 */
//通过元素获取其相关元素
  function Node(){

  }
  module.exports = new Node();
  Node.prototype.getTagChildNodes = function (node){ //get元素的子元素中的标签元素，按顺序排列
    if (!node) {
      // throw new Error("The element does not exist.");
      return false;
    } else {
      var childNodes = [];
      var len = node.childNodes.length;
      for (var i = 0; i < len; i++) {
        childNodes[i] = node.childNodes[i];
      }
      for (i = 0; i < len; i++) {
        if (childNodes[i].nodeType === 3) {// && !/\S/.test(listItem[i].nodeValue
          childNodes.splice(i, 1);
          len--;
        }
      }
    }
    if (childNodes.length) {
      return childNodes;
    } else {
      // throw new Error("This element hasn't a tagNode child.")
      return false;
    }
  };
  Node.prototype.getParentNode = function (node){ //get元素的父元素
    if (!node.parentNode) {
      // throw  new Error("The element hasn't parent node");
      return false
    } else {
      var parentNode = node.parentNode;
    }
    return parentNode;
  };
  Node.prototype.getFirstChildNode = function (node){ //get元素的标签子元素中的第一个子元素
    var childNodes = this.getTagChildNodes(node);
    return childNodes[0];
  };
  Node.prototype.getLastChildNode = function (node){ //get元素的标签子元素中个最后一个子元素
    var childNodes = this.getTagChildNodes(node);
    return childNodes[childNodes.length - 1];
  };
  Node.prototype.getAllSibling = function (node){ //get元素的所有同辈元素（包括自身）
    var parentNode = this.getParentNode(node);
    var siblingNodes;
    siblingNodes = this.getTagChildNodes(parentNode);
    return siblingNodes;
  };
  Node.prototype.getAllSiblingWithoutSelf = function (node){ //get元素的所有同辈元素（不包括自身）
    var parentNode = this.getParentNode(node);
    var siblingNodes;
    siblingNodes = this.getTagChildNodes(parentNode);
    siblingNodes.forEach(function (item, index, array){
      if (item == node) {
        array.splice(i, 1);
      }
    });
    return siblingNodes;
  };
  Node.prototype.getPrevSiblingNode = function (node){ //get元素的同辈元素中的前一个（在同一个父元素下）
    var siblingNodes = this.getAllSibling(node);
    var num;
    siblingNodes.forEach(function (item, index, array){
      if (item == node) {
        num = index;
      }
    });
    if (num === 0) {
      return false;
    } else {
      return siblingNodes[num - 1];
    }
  };
  Node.prototype.getNextSiblingNode = function (node){ //get元素的同辈元素中的后一个（在同一个父元素下）
    var siblingNodes = this.getAllSibling(node);
    var num;
    siblingNodes.forEach(function (item, index, array){
      if (item == node) {
        num = index;
      }
    });
    if (num === (siblingNodes.length - 1)) {
      return false;
    } else {
      return siblingNodes[num + 1];
    }
  };
  Node.prototype.getIndexOfParent = function (node){
    var nodes = this.getAllSibling(node);
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
      if (nodes[i] == node) {
        return i;
      }
    }
  };
  Node.prototype.css = function (elem, attr, value){
    var css, ret, style;
    style = elem.style;
    var rnumpx = /^-?\d+(?:px)?$/i,
      rnum = /^-?\d/;
    if (window.getComputedStyle) {
      css = getComputedStyle(elem, null);
      ret = css[attr];
    } else if (document.documentElement.currentStyle) {
      css = elem.currentStyle;
      ret = css[attr];
    }

    if (!rnumpx.test(ret) && rnum.test(ret)) {
      var left = style.left;
      style.left = attr === "fontSize" ? "lem" : (ret || 0);
      ret = parseInt(style.pixelLeft + 'px');
      style.left = left;
    }
    if(rnum.test(ret)) {
      ret = parseInt(ret);
    }
    if (arguments.length === 2) {
      return ret;
    }
    if (arguments.length == 3) {
      elem.style.cssText += "; " + attr + " : " + value;
    }
  };
  Node.prototype.toPixe = function (value){
    return value+'px';
  };
