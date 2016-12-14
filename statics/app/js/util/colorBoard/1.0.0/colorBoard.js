/**
 * Created by Administrator on 2016/12/8.
 */
function ColorBoard(obj){
  var context = this;
  context.ctx = obj.ctx;
  context.width = obj.width;
  context.height = obj.height;
  context.imageData = context.ctx.createImageData(context.width,context.height);
}

module.exports = ColorBoard;

ColorBoard.prototype = {
  /**
   * setDate
   * @param imageData
   * @param {Number} x
   * @param {Number} y
   * @param {Array} value
   */
  setData: function (imageData, x, y, value){
    imageData.data[(y * (imageData.width * 4) + (x * 4)) + 0] = value[0];
    imageData.data[(y * (imageData.width * 4) + (x * 4)) + 1] = value[1];
    imageData.data[(y * (imageData.width * 4) + (x * 4)) + 2] = value[2];
    imageData.data[(y * (imageData.width * 4) + (x * 4)) + 3] = value[3];
  },

  /**
   *
   * @param imageDate
   */
  drawImage: function (){
    var context = this;
    var i, j, pixel, rgb;
    var radius = context.width/200;
    var angle = -Math.PI/180;
    for (i = 100; i >= 0; i--) {
      for (j = 0; j < 360; j++) {
        pixel = context.hsvToRgb(j,i/100,1);
        rgb = 'RGB(' + Math.floor(pixel.r) + ',' + Math.floor(pixel.g) + ',' + Math.floor(pixel.b) + ')';
        if(i == 0) {
          context.drawColor(1,j*angle,rgb);
        } else {
          context.drawColor(i*radius,j*angle,rgb);
        }
      }
    }
  },
  /**
   *
   * @param r
   * @param startAngle
   * @param rgb
   */
  drawColor: function (r,startAngle, rgb){
    var context = this;
    var ctx = context.ctx;
    var radius = context.width/2;
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.fillStyle = rgb;
    ctx.arc(radius, radius, r, startAngle, startAngle-Math.PI/180, true );
    ctx.fill();
    ctx.closePath();
  },
  drawLight: function (h, s){
    var context = this;
    var imageData = context.imageData;
    var i, j, pixel;
    for (i = 0; i < 360; i++) {
      for (j = 0; j < 40; j++) {
        pixel = context.hsvToRgb(h, s, (360 - i) / 360);
        context.setData(imageData, j, i, [
          Math.ceil(pixel.r),
          Math.ceil(pixel.g),
          Math.ceil(pixel.b),
          255
        ]);
      }
    }
    context.ctx.putImageData(imageData, 0, 0);
  },
  /**
   * HSVToRGB
   * @param h
   * @param s
   * @param v
   * @returns {*}
   */
  hsvToRgb: function (h, s, v){
    var i;
    var f, p, q, t;
    var r, g, b;
    if (s == 0) {
      v = Math.floor(v * 255);
      return {
        r: v,
        g: v,
        b: v
      };
    }
    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p = v * ( 1 - s );
    q = v * ( 1 - s * f );
    t = v * ( 1 - s * ( 1 - f ) );
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      default:
        r = v;
        g = p;
        b = q;
        break;
    }
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  },
  /**
   * colorHex
   * @param rgb
   * @returns {string}
   */
  colorHex: function (rgb){
    var that = rgb;
    var regR = /^(rgb|RGB)/;
    var regI = /(?:\(|\)|rgb|RGB)*/g;
    var hex = '#';
    var i;
    if (regR.test(that)) {
      var rgbN = that.replace(regI, '').split(',');
      for (i = 0; i < rgbN.length; i++) {
        var num = Number(rgbN[i]);
        if (num < 0 || num > 255) {
          throw new RangeError('The RGB number is out of range.');
        } else {
          var strHex = num.toString(16);
          strHex = Number(num) < 16 ? '0' + strHex : strHex;
        }
        hex += strHex;
      }
      if (hex.length != 7) {
        console.log(hex.length);
        throw new RangeError('The RGB numbers is not three.');
      } else {
        return hex;
      }
    }
  },
  /**
   * colorRgb
   * @param hex
   * @returns {string}
   */
  colorRgb: function (hex){
    var that = hex.toLowerCase();
    var reg = /^#([0-9a-f]{3}|[0-9a-f]{6})$/;
    var rgb = 'RGB(';
    var i;
    if (that && reg.test(that)) {
      var hexN = that.replace('#', '');
      if (hexN.length == 3) {
        hexN = hexN.split('');
        for (i = 0; i < 3; i++) {
          hexN[i] += hexN[i];
        }
      } else if (hexN.length == 6) {
        hexN = hexN.match(/[0-9a-f]{2}/g);
      }
      for (i = 0; i < 3; i++) {
        hexN[i] = parseInt('0x' + hexN[i], 10);
      }
      rgb += hexN[0] + ', ' + hexN[1] + ', ' + hexN[2] + ')';
      return rgb;
    } else {
      throw new Error('The colorHex\'s  format is warn.');
    }
  },

  /**
   *
   * @param r
   * @param g
   * @param b
   * @returns {{h: *, s: *, v: (number|*)}}
   */
  rgbToHsv: function (r,g,b){
    r = parseFloat(r+1)/256;
    g= parseFloat(g+1)/256;
    b = parseFloat(b+1)/256;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h,s,v;
    v = max;
    switch (max) {
      case min:
        h = 0;
        break;
      case r:
        h = g < b ? (60 * ((g - b)/(max - min)) + 360) : (60 * ((g-b)/(max - min)));
        break;
      case g:
        h = 60*(b - r)/(max - min) + 120;
        break;
      case b:
        h = 60*(r-g)/(max - min) + 240;
        break;
    }
    if (max == 0) {
      s = 0
    } else {
      s = 1- min/max;
    }
    return {
      h: h,
      s: s,
      v: v
    }
  },
  toHSV: function (x,y,r,v){
    var h,s;
    h = Math.floor(Math.asin(x/r)*360/(2*Math.PI));
  }
};
