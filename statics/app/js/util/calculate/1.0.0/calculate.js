/**
 * Created by Administrator on 2016/12/1.
 */
function Calculate(){
  var context = this;
  context.point = false; // 小数点是否重复
  context.equal = false; // 是否进行了运算
  context.number = [];
  context.operator = [];
}
Calculate.prototype = {
  isOperator: function (char){
    return char == '+' || char == '-' || char == '*' || char == '/' || char == '%';
  },
  inputNumber: function (text, formula, char, context){
    if (context.equal) {
      formula = text;
      text = char;
      context.equal = false;
    } else if (text == '0' || isOperator(text)) {
      text = char;
    } else {
      text += char;
    }
    return {
      text: text,
      formula: formula,
      context: context
    }
  },
  inputPoint: function (text, formula, char, context){
    if (context.equal) {
      formula = '';
      text = char;
      context.point = true;
      context.equal = false;
    }
    if (!context.point) {
      text += char;
      context.point = true;
    } else {

    }
    return {
      text: text,
      formula: formula,
      context: context
    }
  },
  clear: function (context){
    context.equal = false;
    context.point = false;
    text = '0';
    formula = '';
    return {
      text: text,
      formula: formula,
      context: context
    }
  },
  inputOperator : function (text, formula, char, context){
    if (isOperator(text)) {
      text = char;
      formula = formula.substr(0, formula.length - 1);
      formula += char;
      context.operator[operator.length - 1] = char;
    } else {
      formula += text;
      context.number.push(parseFloat(text));
      text = char;
      formula += char;
      context.operator.push(char);
    }
    return {
      text: text,
      formula: formula,
      context: context
    }
  },
  calculate : function (text, formula, context){
    if (!isOperator(text)) {
      context.number.push(parseFloat(text));
    }
    var j1 = [];
    var j2 = [];
    var o1 = [];
    var result = context.number[0];
    if (context.number.length == context.operator.length) {
      context.operator.pop();
    } else {
      while (context.operator.length) {
        var num = context.number.shift();
        var char = context.operator.shift();
        if (char == '+' || char == '-') { //遇到一级运算符
          if (o1.length == 0) { //前面不存在一级运算符,数字和运算符入栈
            j1[0] = num;
            o1[0] = char;
          } else { //前面存在一级运算符，数字入栈并运算，清空数字栈，结果入栈，运算符替换
            j1[1] = num;
            result = ca(o1[0], j1);
            j1.length = 0;
            j1[0] = result;
            o1[0] = char;
          }
        } else { //遇到二级运算符，数字入栈两个，运算符入栈并运算，运算结果进入数字栈
          j2[0] = num;
          j2[1] = context.number.shift();
          result = ca(char, j2);
          context.number.unshift(result);
        }
      }
      if (o1.length == 1) {
        j1[1] = context.number.shift();
        result = ca(o1[0], j1);
      }
      text = result;
      context.equal = true;
      context.number = [];
      context.operator = [];
      formula = '';
    }
    function ca(char, j){
      if (!char || j.length != 2) {
        return false;
      } else {
        switch (char) {
          case '+':
            return j[0] + j[1];
            break;
          case '-':
            return j[0] - j[1];
            break;
          case '*':
            return j[0] * j[1];
            break;
          case '/':
            return j[0] / j[1];
            break;
          case '%':
            return j[0] % j[1];
            break;
        }
      }
    }
    return {
      text: text,
      formula: formula,
      context: context
    }
  }
};
