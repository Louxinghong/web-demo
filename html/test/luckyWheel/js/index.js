var turnplate = {
  restaraunts: [
    { code: 0, text: "一等奖" },
    { code: 1, text: "二等奖" },
    { code: 2, text: "三等奖" },
    { code: 3, text: "四等奖" },
    { code: 4, text: "五等奖" },
    { code: 5, text: "六等奖" },
    { code: 6, text: "七等奖" },
    { code: 7, text: "八等奖" }
  ], //大转盘奖品名称
  colors: ["#9C1EF4", "#FFEF50"], //大转盘奖品区块对应背景颜色
  outsideRadius: 192, //大转盘外圆的半径
  textRadius: 155, //大转盘奖品位置距离圆心的距离
  insideRadius: 68, //大转盘内圆的半径
  startAngle: 0, //开始角度
  bRotate: false, //false:停止;ture:旋转
  prizeCode: "", //获得奖品编号
  lottoTimes: 0,
  lockBtn: false
};

turnplate.colors = turnplate.restaraunts.map(function(n, i) {
  return turnplate.colors[i % 2];
});

var canvas = document.getElementById("wheelcanvas");
draw();
function draw() {
  if (canvas.getContext) {
    //根据奖品个数计算圆周角度
    var arc = Math.PI / (turnplate.restaraunts.length / 2),
      ctx = canvas.getContext("2d"),
      width = 422,
      height = 422,
      pointX = 211,
      pointY = 211;
    //在给定矩形内清空一个矩形
    ctx.clearRect(0, 0, width, height);
    //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
    ctx.strokeStyle = "#FFBE04";
    //font 属性设置或返回画布上文本内容的当前字体属性
    ctx.font = "24px Microsoft YaHei";
    for (var i = 0; i < turnplate.restaraunts.length; i++) {
      var angle = turnplate.startAngle + i * arc;
      console.log(turnplate.colors[i]);
      ctx.fillStyle = turnplate.colors[i];
      ctx.beginPath();
      ctx.arc(
        pointX,
        pointY,
        turnplate.outsideRadius,
        angle,
        angle + arc,
        false
      );
      ctx.arc(pointX, pointY, turnplate.insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      //锁画布(为了保存之前的画布状态)
      ctx.save();

      i % 2 === 0 ? (ctx.fillStyle = "#fff") : (ctx.fillStyle = "#f39802");

      var text = turnplate.restaraunts[i].text,
        line_height = 24,
        splitArray = ["元", "云积分"],
        splitStr = "元";

      //translate方法重新映射画布上的 (0,0) 位置
      ctx.translate(
        pointX + Math.cos(angle + arc / 2) * turnplate.textRadius,
        pointY + Math.sin(angle + arc / 2) * turnplate.textRadius
      );
      //rotate方法旋转当前的绘图
      ctx.rotate(angle + arc / 2 + Math.PI / 2);

      for (var str in splitArray) {
        if (text.indexOf(splitArray[str]) > -1) {
          splitStr = splitArray[str];
          break;
        }
      }
      /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
      if (text.indexOf(splitStr) > 0) {
        var texts = text.split(splitStr);
        for (var j = 0; j < texts.length; j++) {
          ctx.font = j == 0 ? "bold 24px 微软雅黑" : "24px 微软雅黑";
          if (j == 0) {
            ctx.fillText(
              texts[j] + splitStr,
              -ctx.measureText(texts[j] + splitStr).width / 2,
              j * line_height
            );
          } else {
            ctx.fillText(
              texts[j],
              -ctx.measureText(texts[j]).width / 2,
              j * line_height
            );
          }
        }
      } else if (text.indexOf(splitStr) == -1 && text.length > 6) {
        //奖品名称长度超过一定范围
        text = text.substring(0, 6) + "||" + text.substring(6);
        var texts = text.split("||");
        for (var j = 0; j < texts.length; j++) {
          ctx.fillText(
            texts[j],
            -ctx.measureText(texts[j]).width / 2,
            j * line_height
          );
        }
      } else {
        //在画布上绘制填色的文本。文本的默认颜色是黑色
        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      }
      ctx.restore();
    }
  }
}

$("#pointer").click(function() {
  if (turnplate.bRotate) return;
  turnplate.bRotate = !turnplate.bRotate;
  onRotate();
});

function onRotate() {
  var index = 1;
  var code = Math.floor(Math.random() * 8);
  console.log(code);
  for (var i = 0; i < turnplate.restaraunts.length; i++) {
    if (turnplate.restaraunts[i].code === code) {
      index = i + 1;
      break;
    }
  }

  var angles =
    index * (360 / turnplate.restaraunts.length) -
    360 / (turnplate.restaraunts.length * 2);

  if (angles < 270) {
    angles = 270 - angles;
  } else {
    angles = 360 - angles + 270;
  }
  $("#wheelcanvas").rotate({
    angle: 0,
    animateTo: angles + 360 * 5,
    duration: 8000,
    callback: function() {
      alert("恭喜获得" + code + "等奖");
      turnplate.bRotate = !turnplate.bRotate;
    }
  });
}
