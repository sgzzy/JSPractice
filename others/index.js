/**
 * Created by Administrator on 2016/11/14.
 */
require.config({
    paths : {
      "node" : "getnode",
      "css" : "getcss",
      "util" : "eventUtil"
    }
  }
);
window.onload = function (){
  var click = document.getElementsByClassName("lesson");
  var list = document.getElementsByClassName("list");
  var len = list.length,
    i;
  for (i = 0; i < len; i++) {
    EventUtil.addHadler(click[i], "click", onclick
    );
  }
  function onclick(){
    console.log(this);
    var node = new GetNode(this);
    var target = node.getTagChildNodes()[1];
    var css = new GetCss();
    var height = css.css(target, "height");
    var len1 = (new GetNode(target)).getTagChildNodes().length;
    console.log("begin: " + this.className);
    if (this.className == "lesson active") {
      css.css(target, "height", 0);
      setTimeout(function (){
        node.node.className = "lesson";
      },500);
    } else if (this.className == "lesson") {
      this.className = "lesson active";
      var active = document.getElementsByClassName("active");
      if (active[1]) {
        setTimeout(function (){
          height = 29 * len1 + 29;
          css.css(target, "height", height);
          setTimeout(function (){
            height -= 29;
            css.css(target, "height", height);
          }, 500);
        }, 500);
      } else if (active[0] && !active[1]) {
        height = 29 * len1 + 29;
        css.css(target, "height", height);
        setTimeout(function (){
          height -= 29;
          css.css(target, "height", height);
        }, 500);
      }
      if (active.length == 2) {
        if (active[0] == this) {
          var target1 = (new GetNode(active[1])).getTagChildNodes()[1];
          css.css(target1, "height", 0);
          setTimeout(function (){
            active[1].className = "lesson";
          },500);
        } else if (active[1] == this) {
          var target2 = (new GetNode(active[0])).getTagChildNodes()[1];
          css.css(target2, "height", 0);
          setTimeout(function (){
            active[0].className = "lesson";
          },500);
        }
      }
    }
    console.log("end: " + this.className);
  }
};
