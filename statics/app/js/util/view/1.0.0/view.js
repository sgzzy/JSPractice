/**
 * Created by Administrator on 2016/12/2.
 */
function View(){
  this.width = this.height = 0;
}
View.prototype = {
  getViewSizeWithoutScrollbar: function (){//不包含滚动条
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
  },
  getViewSizeWithScrollbar : function (){//包含滚动条
    if (window.innerWidth) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    } else if (document.documentElement.offsetWidth == document.documentElement.clientWidth) {
        this.width = document.documentElement.offsetWidth;
        this.height = document.documentElement.offsetHeight;
    } else {
        this.width = document.documentElement.clientWidth + getScrollWith();
        this.height = document.documentElement.clientHeight + getScrollWith();
    }
  }
};
module.exports = new View();
