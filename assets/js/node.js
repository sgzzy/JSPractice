/**
 * Created by Administrator on 2016/11/10.
 */
  //通过元素获取其相关元素
define(function (){
      var getTagChildNodes = function (node){ //get元素的子元素中的标签元素，按顺序排列
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
      var getParentNode = function (node){ //get元素的父元素
        if (!node.parentNode) {
          // throw  new Error("The element hasn't parent node");
          return false
        } else {
          var parentNode = node.parentNode;
        }
        return parentNode;
      };
      var getFirstChildNode = function (node){ //get元素的标签子元素中的第一个子元素
        var childNodes = getTagChildNodes(node);
        return childNodes[0];
      };
      var getLastChildNode = function (node){ //get元素的标签子元素中个最后一个子元素
        var childNodes = getTagChildNodes(node);
        return childNodes[childNodes.length - 1];
      };
      var getAllSibling = function (node){ //get元素的所有同辈元素（包括自身）
        var parentNode = getParentNode(node);
        var siblingNodes;
        siblingNodes = getTagChildNodes(parentNode);
        return siblingNodes;
      };
      var getAllSiblingWithoutSelf = function (node){ //get元素的所有同辈元素（不包括自身）
        var parentNode = getParentNode(node);
        var siblingNodes;
        siblingNodes = getTagChildNodes(parentNode);
        siblingNodes.forEach(function (item, index, array){
          if (item == node) {
            array.splice(i, 1);
          }
        });
        return siblingNodes;
      };
      var getPrevSiblingNode = function (node){ //get元素的同辈元素中的前一个（在同一个父元素下）
        var siblingNodes = getAllSibling(node);
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
      var getNextSiblingNode = function (node){ //get元素的同辈元素中的后一个（在同一个父元素下）
        var siblingNodes = getAllSibling(node);
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
    return {
      getTagChildNodes : getTagChildNodes,
      getParentNode : getParentNode,
      getFirstChildNode : getFirstChildNode,
      getLastChildNode : getLastChildNode,
      getAllSibling : getAllSibling,
      getAllSiblingWithoutSelf : getAllSiblingWithoutSelf,
      getPrevSiblingNode : getPrevSiblingNode,
      getNextSiblingNode : getNextSiblingNode
    };
});
