/**
 * Created by Administrator on 2016/11/10.
 */
//通过元素获取其相关元素
function GetNode(node){
  this.node = node;
}
GetNode.prototype = {
  getNode: function (){//get元素自身
    return this.node;
  },
  getTagChildNodes: function (){ //get元素的子元素中的标签元素，按顺序排列
    if (!this.node) {
      // throw new Error("The element does not exist.");
      return false;
    } else {
      var childNodes = [];
      var len = this.node.childNodes.length;
      for (var i = 0; i < len; i++) {
        childNodes[i] = this.node.childNodes[i];
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
  },
  getParentNode: function (){ //get元素的父元素
    if (!this.node.parentNode) {
      // throw  new Error("The element hasn't parent node");
      return false
    } else {
      var parentNode = this.node.parentNode;
    }
    return parentNode;
  },
  getFirstChildNode: function (){ //get元素的标签子元素中的第一个子元素
    var childNodes = this.getTagChildNodes(this.node);
    return childNodes[0];
  },
  getLastChildNode: function (){ //get元素的标签子元素中个最后一个子元素
    var childNodes = this.getTagChildNodes(this.node);
    return childNodes[childNodes.length - 1];
  },
  getAllSibling: function (){ //get元素的所有同辈元素（包括自身）
    var parentNode = new GetNode(this.getParentNode());
    var siblingNodes;
    siblingNodes = parentNode.getTagChildNodes();
    return siblingNodes;
  },
  getAllSiblingWithoutSelf: function (){ //get元素的所有同辈元素（不包括自身）
    var node = this.getNode();
    var parentNode = new GetNode(this.getParentNode());
    var siblingNodes;
    siblingNodes = parentNode.getTagChildNodes();
    siblingNodes.forEach(function (item, index, array){
      if (item == node) {
        array.splice(i,1);
      }
    });
    return siblingNodes;
  },
  getPrevSiblingNode: function (){ //get元素的同辈元素中的前一个（在同一个父元素下）
    var node = this.getNode();
    var siblingNodes = this.getAllSibling();
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
  },
  getNextSiblingNode: function (){ //get元素的同辈元素中的后一个（在同一个父元素下）
    var node = this.getNode();
    var siblingNodes = this.getAllSibling();
    var num;
    siblingNodes.forEach(function (item, index, array){
      if (item == node) {
        num = index;
      }
    });
    if (num === (siblingNodes.length -1)) {
      return false;
    } else {
      return siblingNodes[num + 1];
    }
  }
};
