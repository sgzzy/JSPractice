/**
 * Created by Administrator on 2016/12/5.
 */
function runtime(){
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  var millionSeconds = time.getMilliseconds();// 01
  console.log('Hours: ' + hours + ' Minutes: ' + minutes + ' Seconds: ' + seconds + ' MilliSeconds: ' + millionSeconds);
  var disp = (new Date()).getMilliseconds();
  setTimeout(runtime, 1000-disp);
}
runtime();
