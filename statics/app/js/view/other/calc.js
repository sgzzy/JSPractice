/**
 * Created by Administrator on 2016/11/30.
 */
var node = require('node'),
    util = require('util');
var text = document.getElementsByClassName('f-text')[0],
    formula = document.getElementById('formula'),
    a = document.getElementsByTagName('a');
var len = a.length,
    i = 0;
    // operator = [],//存储运算符
    // number = [];//存储从outcome转换过来的数值
text.value = '0';
function calc(){
  for (; i < len; i++)
    util.addHandler(a[i], 'click', click)
}
calc();
function click(event){
  event = util.getEvent(event);
  var oThis = this;
  var char = oThis.innerHTML;
  switch (char) {
    case '0' : //点击数字0，判断此时的数字是否为0，若为0，则此次操作无效
    case '1' : //点击非0数字，打印到临时输出框
    case '2' :
    case '3' :
    case '4' :
    case '5' :
    case '6' :
    case '7' :
    case '8' :
    case '9' :
      inputNumber(char);
      break;
    case '+' : //点击运算符，判断是否为第一次点击运算符，如不是，则先运算之前的表达式，若是，则存储运算符
    case '-' :
    case '*' :
    case '/' :
    case '%' :
      inputOperator(char);
      point = false;
      break;
    case '=' ://判断是否有运算符，如没有则直接输出所打印数字，若有则计算后再输出
      calculate();
      point = false;
      break;
    case '.' :
      inputPoint(char);
      break;
    case 'c':
      clear();
      break;
  }
}
function isOperator(a){
  return a == '+' || a == '-' || a == '*' || a == '/' || a == '%';
}

var equal = false;
function inputNumber(char){
  if (equal) {
    formula.value = text.value;
    text.value = char;
    equal = false;
  } else if (text.value == '0' || isOperator(text.value)) {
    text.value = char;
  } else {
    text.value += char;
  }
}
var point = false;
function inputPoint(char){
  if (equal) {
    formula.value = '';
    text.value = char;
    point = true;
    equal = false;
  }
  if (!point) {
    text.value += char;
    point = true;
  } else {
    return false;
  }
}
function clear(){
  equal = false;
  point = false;
  text.value = '0';
  formula.value = '';
}
function inputOperator(char){
  if(equal) {
    equal = false;
  }
  if (isOperator(text.value)) {
    text.value = char;
    formula.value = formula.value.substr(0, formula.value.length - 1);
    formula.value += char;
    // operator[operator.length - 1] = char;
  } else {
    formula.value += text.value;
    // number.push(parseFloat(text.value));
    text.value = char;
    formula.value += char;
    // operator.push(char);
  }
}
function  calculate(){
  if(!isOperator(text.value)) {
    formula.value += text.value;
  } else {
    formula.value = formula.value.substr(0, formula.value.length - 1);
  }
  var str = formula.value;
  formula.value = '';
  point = false;
  equal = true;
  var result = new Function('return ' + str);
  text.value = result();

}
/*
function calculate(){
  if(!isOperator(text.value)) {
    number.push(parseFloat(text.value));
  }
  var j1 = [];
  var j2 = [];
  var o1 = [];
  var result = number[0];
  if (number.length == operator.length) {
    operator.pop();
  } else {
    while (operator.length) {
      var num = number.shift();
      var char = operator.shift();
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
        j2[1] = number.shift();
        result = ca(char, j2);
        number.unshift(result);
      }
    }
    if (o1.length == 1) {
      j1[1] = number.shift();
      result = ca(o1[0],j1);
    }
    text.value = result;
    equal = true;
    number = [];
    operator = [];
    formula.value = '';
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
}
*/
