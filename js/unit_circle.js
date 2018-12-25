var w, h, ratio, i, s, el, g, div, dragQ, game, my = {};

function circleunitMain() {
  w = 750;
  h = 420;
  my.sinClr = "#44dd44";
  my.cosClr = "#FF5722";
  my.tanClr = "#2196F3";
  el = document.getElementById('canvasId');
  el.style.paddingBottom = '50px';
  ratio = 2;
  el.width = w * ratio;
  el.height = h * ratio;
  el.style.width = w + "px";
  el.style.height = h + "px";
  g = el.getContext("2d");
  g.setTransform(ratio, 0, 0, ratio, 0, 0);
  circleX = 190;
  circleY = 250;
  circleRadius = 130;
  my.graphX = 380;
  angle = 1.;
  my.quadQ = true;
  my.degQ = false;
  angles = [
    [0, 0, 1, "1,0", 1],
    [30, 1, 6, "+3+1", 1],
    [45, 1, 4, "+2+2", 1],
    [60, 1, 3, "+1+3", 1],
    [90, 1, 2, "0,1", 2],
    [120, 2, 3, "-1+3", 2],
    [135, 3, 4, "-2+2", 2],
    [150, 5, 6, "-3+1", 2],
    [180, 1, 1, "-1,0", 3],
    [210, 7, 6, "-3-1", 3],
    [225, 5, 4, "-2-2", 3],
    [240, 4, 3, "-1-3", 3],
    [270, 3, 2, "0,-1", 4],
    [300, 5, 3, "+1-3", 4],
    [315, 7, 4, "+2-2", 4],
    [330, 11, 6, "+3-1", 4],
    [360, 2, 1, "", 4]
  ];
  my.quadrants = [
    ["I", 1, 1],
    ["II", -1, 1],
    ["III", -1, -1],
    ["IV", 1, -1]
  ]
  el.addEventListener('touchmove', ontouchmove, false);
  el.addEventListener('mousemove', onmousemove, false);
  update();
}

function onmousemove(e) {
  var rect = el.getBoundingClientRect();
  var x0 = (e.clientX - rect.left);
  var y0 = (e.clientY - rect.top);
  if (x0 < my.graphX) {
    angle = Math.atan2(-(y0 - circleY), x0 - circleX);
    if (angle < 0) angle += 2 * Math.PI;
  } else {
    angle = (x0 - my.graphX) / 180 * Math.PI;
  }
  update();
};

function ontouchmove(evt) {
  var touch = evt.targetTouches[0];
  evt.clientX = touch.clientX;
  evt.clientY = touch.clientY;
  evt.touchQ = true;
  onmousemove(evt);
  evt.preventDefault();
};

function toggleDeg() {
  my.degQ = my.degQ ? false : true;
  update();
}

function update() {
  g.clearRect(0, 0, el.width, el.height);
  drawAngle();
  drawRing();
  drawCoords();
  drawQuadrants();
  drawAngles();
  drawGraph();
}

function doAngle() {
  angle += 0.01;
  if (angle > 1) clearInterval(id);
  drawAngle();
}

function drawQuadrants() {
  for (var i = 0; i < 4; i++) {
    g.font = "29px Arial";
    g.textAlign = "center";
    g.fillStyle = "#aaaaaa";
    g.fillText(my.quadrants[i][0], circleX + my.quadrants[i][1] * 50, circleY - my.quadrants[i][2] * 50);
  }
}

function drawAngle() {
  var cirClr = "#ff00ff";
  var lowClr = "#aaaaaa";
  angleSnap = Math.floor(angleDeg(angle, true));
  angle = angleSnap * Math.PI / 180.;
  cX = Math.cos(angle) * circleRadius;
  cY = -Math.sin(angle) * circleRadius;
  tanLen = -Math.tan(angle) * circleRadius;
  var fs = [to3Dig(Math.sin(angle)), to3Dig(Math.cos(angle)), to3Dig(Math.tan(angle))];
  if (angleSnap % 90 == 0) {
    switch (angleSnap) {
      case 0:
        fs = [0, 1, 0];
        break;
      case 90:
        fs = [1, 0, LN === 'vi' ? 'không xác định' : 'undefined'];
        break;
      case 180:
        fs = [0, -1, 0];
        break;
      case 270:
        fs = [-1, 0, LN === 'vi' ? 'không xác định' : 'undefined'];
        break;
      case 360:
        fs = [0, 1, 0];
        break;
      default:
    }
  }
  var angDisplay = "";
  if (!my.degQ) {
    angDisplay = to3Dig(angle);
  } else {
    angDisplay = angleSnap + "°";
  }
  g.font = "16px Arial";
  g.textAlign = "center";
  g.fillStyle = my.sinClr;
  g.fillText("sin(" + angDisplay + ") = " + fs[0], circleX, 20, w);
  g.fillStyle = my.cosClr;
  g.fillText("cos(" + angDisplay + ") = " + fs[1], circleX, 45, w);
  g.fillStyle = my.tanClr;
  g.fillText("tan(" + angDisplay + ") = " + fs[2], circleX, 70, w);
  g.lineJoin = "round";
  g.beginPath();
  g.lineWidth = 2;
  g.strokeStyle = lowClr;
  g.moveTo(circleX, circleY);
  g.lineTo(circleX + cX, circleY + cY);
  g.stroke();
  g.beginPath();
  g.lineWidth = 1;
  g.strokeStyle = cirClr;
  g.moveTo(circleX, circleY + circleRadius + 10);
  g.lineTo(circleX, circleY - circleRadius - 10);
  g.moveTo(circleX + circleRadius + 10, circleY);
  g.lineTo(circleX - circleRadius - 10, circleY);
  g.stroke();
  HiGraphics.lineStyle(2, lowClr, 1);
  switch (angleSnap) {
    case 90:
      HiGraphics.drawBox(g, circleX, circleY - 25, 25, 0);
      break;
    case 360:
      HiGraphics.drawArc(g, circleX, circleY, 30, 0, Math.PI * 2);
      break;
    default:
      HiGraphics.drawArc(g, circleX, circleY, 30, -angle, 0);
  }
  g.beginPath();
  g.lineWidth = 2;
  g.strokeStyle = my.cosClr;
  g.moveTo(circleX, circleY);
  g.lineTo(circleX + cX, circleY);
  g.stroke();
  g.closePath();
  g.fillStyle = my.sinClr;
  g.fillText(fs[0], circleX + cX + 5, circleY + cY / 2);
  g.fillStyle = my.cosClr;
  g.fillText(fs[1], circleX + cX / 2, circleY);
  g.beginPath();
  g.lineWidth = 2;
  g.strokeStyle = my.sinClr;
  g.moveTo(circleX + cX, circleY);
  g.lineTo(circleX + cX, circleY + cY);
  g.stroke();
  g.closePath();
  g.beginPath();
  g.lineWidth = 2;
  g.strokeStyle = my.tanClr;
  g.moveTo(circleX + cX, circleY + cY);
  g.lineTo(circleX + cX - tanLen * Math.sin(angle), circleY);
  g.stroke();
  g.closePath();
}

function drawGraph() {
  var stt = {
    x: my.graphX,
    y: circleY
  };
  g.fillStyle = '#303030';
  g.fillRect(stt.x, stt.y - circleRadius * 2, 360, circleRadius * 4);
  g.lineWidth = 1;
  var refX = angle * 180 / Math.PI;
  g.strokeStyle = '#fff';
  for (i = 0; i <= 360; i += 90) {
    g.strokeStyle = '#454040';
    g.beginPath();
    g.moveTo(stt.x + i, circleY - circleRadius * 2);
    g.lineTo(stt.x + i, circleY + circleRadius * 2);
    g.stroke();
    if (my.degQ) {
      g.fillStyle = "#fff";
      g.font = "15px Arial";
      g.textAlign = "center";
      g.fillText(i + "°", my.graphX + i, circleY + 20);
    } else {
      for (var j = 0; j < angles.length; j++) {
        if (angles[j][0] == i) {
          numer = angles[j][1];
          denom = angles[j][2];
          if (numer == "1") numer = ""
          if (numer != "0") numer += "π";
          if (denom == "1") {
            g.fillStyle = "#fff";
            g.font = "15px Arial";
            g.textAlign = "center";
            g.fillText(numer, my.graphX + i, circleY + 20);
          } else {
            drawFrac(g, true, numer, denom, my.graphX + i, circleY + 20)
          }
        }
      }
    }
  }
  for (i = -1; i <= 1; i++) {
    g.beginPath();
    g.moveTo(stt.x + 0, circleY + circleRadius * i);
    g.lineTo(stt.x + 360, circleY + circleRadius * i);
    g.stroke();
  }
  var funcs = [Math.sin, Math.cos, Math.tan];
  var clrs = [my.sinClr, my.cosClr, my.tanClr];
  g.strokeStyle = '#fff';
  g.beginPath();
  g.moveTo(stt.x + refX, circleY - circleRadius * 2);
  g.lineTo(stt.x + refX, circleY + circleRadius * 2);
  g.stroke();
  if (my.quadQ) {
    for (var i = 0; i < 4; i++) {
      g.font = "29px Arial";
      g.textAlign = "center";
      g.fillStyle = "#aaaaaa";
      g.fillText(my.quadrants[i][0], my.graphX + i * 90 + 45, circleY - 10);
    }
  }
  for (var t = 0; t < 3; t++) {
    g.fillStyle = clrs[t];
    g.strokeStyle = clrs[t];
    var refY = funcs[t](refX * Math.PI / 180.) * circleRadius;
    g.beginPath();
    g.arc(stt.x + refX, stt.y - refY, 3, 0, 2 * Math.PI);
    g.stroke();
    g.font = "16px Arial";
    g.textAlign = "left";
    var lbl = to3Dig(funcs[t](refX * Math.PI / 180.));
    g.fillText(lbl, stt.x + refX + 10, stt.y - refY + 5);
    g.beginPath();
    var sttQ = true;
    for (i = 0; i <= 360; i++) {
      var pt = {
        x: stt.x + i,
        y: stt.y
      }
      var ang = i * Math.PI / 180.;
      pt.y -= funcs[t](ang) * circleRadius;
      if (pt.y < 0 || pt.y > 600) {
        sttQ = true;
        continue;
      }
      if (i == refX) {}
      if (sttQ) {
        g.moveTo(pt.x, pt.y);
      } else {
        g.lineTo(pt.x, pt.y);
      }
      sttQ = false;
    }
    g.stroke();
  }
}

function angleDeg(angleRad, snap90sQ) {
  var angle = angleRad * 180. / Math.PI;
  if (snap90sQ) {
    if (angle <= 1 || angle >= 359)
      angle = 360;
    if (angle >= 89 && angle < 92)
      angle = 90;
    if (angle >= 179 && angle < 182)
      angle = 180;
    if (angle >= 269 && angle < 272)
      angle = 270;
  }
  return angle;
}

function angleName(angleRad) {
  s = "";
  var angDeg = angleDeg(angleRad, true);
  angDeg = Math.floor(angDeg);
  if (angDeg < 90) {
    s = "Acute Angle";
  }
  if (angDeg == 90) {
    s = "Right Angle";
  }
  if (angDeg > 90) {
    s = "Obtuse Angle";
  }
  if (angDeg == 180) {
    s = "Straight Angle";
  }
  if (angDeg > 180) {
    s = "Reflex Angle";
  }
  if (angDeg == 360) {
    s = "Full Rotation";
  }
  return s;
}

function drawRing() {
  HiGraphics.lineStyle(2, "#ff00ff", 1);
  HiGraphics.drawCircle(g, circleX, circleY, circleRadius);
}

function drawCoords() {
  for (i = 0; i < angles.length; i++) {
    var quadrant = angles[i][4];
    var angle = Math.PI * angles[i][1] / angles[i][2];
    var deg = angles[i][0];
    var majorQ = (deg % 90 == 0);
    if (i < angles.length - 1) {
      var angX = Math.cos(angle) * (circleRadius);
      var angY = -Math.sin(angle) * (circleRadius);
      g.fillStyle = "#fff";
      g.beginPath()
      g.arc(circleX + angX, circleY + angY, 3, 0, 2 * Math.PI);
      g.fill();
      var angX = Math.cos(angle) * (circleRadius + 22);
      var angY = -Math.sin(angle) * (circleRadius + 22);
      var coordCode = angles[i][3];
      if (majorQ) {
        g.fillStyle = "#fff";
        g.font = "15px Arial";
        g.textAlign = "center";
        g.fillText(coordCode, circleX + angX, circleY + angY);
      } else {
        currX = circleX + angX;
        currY = circleY + angY;
        switch (quadrant) {
          case 1:
            currX -= 15;
            break;
          case 2:
            currX -= 35;
            break;
          case 3:
            currX -= 55;
            break;
          case 4:
            currX -= 5;
            break;
        }
        g.fillStyle = "#fff";
        g.font = "15px Arial";
        g.textAlign = "center";
        g.fillText("(", currX, currY);
        currX += 10;
        for (var j = 0; j < 2; j++) {
          if (j > 0) {
            g.font = "15px Arial";
            g.fillText(",", currX, currY);
            currX += 12;
          }
          var pmStr = coordCode.charAt(j * 2);
          var plusQ = true;
          if (pmStr == "-") {
            plusQ = false;
            currX += 10;
          }
          var typStr = coordCode.charAt(1 + j * 2);
          var wid = 0;
          switch (typStr) {
            case "1":
              drawFrac(g, plusQ, "1", "2", currX, currY - 3)
              wid = 12;
              break;
            case "2":
              drawFrac(g, plusQ, "√2", "2", currX, currY - 3)
              wid = 12;
              break;
            case "3":
              drawFrac(g, plusQ, "√3", "2", currX, currY - 3)
              wid = 12;
              break;
            default:
          }
          currX += wid;
        }
        g.font = "15px Arial";
        g.fillText(")", currX, circleY + angY);
      }
    }
  }
}

function drawAngles() {
  for (i = 0; i < angles.length; i++) {
    var quadrant = angles[i][4];
    var angle = Math.PI * angles[i][1] / angles[i][2];
    var deg = angles[i][0];
    var majorQ = (deg % 90 == 0);
    if (i < angles.length - 1) {
      var angX = Math.cos(angle) * (circleRadius);
      var angY = -Math.sin(angle) * (circleRadius);
      g.fillStyle = "#fff";
      g.beginPath()
      g.arc(circleX + angX, circleY + angY, 3, 0, 2 * Math.PI);
      g.fill();
      var angX = Math.cos(angle) * (circleRadius - 22);
      var angY = -Math.sin(angle) * (circleRadius - 22);
      if (my.degQ) {
        g.fillStyle = "#fff";
        g.font = "15px Arial";
        g.textAlign = "center";
        g.fillText(deg.toString() + "°", circleX + angX, circleY + angY + 5);
      } else {
        numer = angles[i][1];
        denom = angles[i][2];
        if (numer == "1") numer = ""
        if (numer != "0") numer += "π";
        if (denom == "1") {
          g.fillStyle = "#fff";
          g.font = "15px Arial";
          g.textAlign = "center";
          g.fillText(numer, circleX + angX, circleY + angY);
        } else {
          drawFrac(g, true, numer, denom, circleX + angX, circleY + angY)
        }
      }
    }
  }
}

function drawFrac(g, plusQ, numer, denom, xp, yp) {
  g.fillStyle = "#fff";
  g.font = "17px Arial";
  g.textAlign = "center";
  if (plusQ) {} else {
    g.fillText("-", xp - 14, yp + 4);
  }
  g.font = "12px Arial";
  var up = 3
  var dn = 12
  g.fillText(numer, xp, yp - up);
  g.fillText(denom, xp, yp + dn);
  g.strokeStyle = "#fff";
  g.beginPath()
  g.lineWidth = 1;
  g.moveTo(xp - 8, yp)
  g.lineTo(xp + 8, yp)
  g.stroke()
}

function to3Dig(x) {
  return Math.floor(x * 1000 + 0.5) / 1000
}

function hiGraphics() {
  lineWidth = 5;
  lineJoin = "round";
  strokeStyle = "#333";
}
hiGraphics.prototype.lineStyle = function(width, clr, opacity) {
  lineWidth = width;
  lineJoin = "round";
  strokeStyle = clr;
};
hiGraphics.prototype.stt = function() {
  g.beginPath();
  g.lineWidth = lineWidth;
  g.lineJoin = lineJoin;
  g.strokeStyle = strokeStyle;
};
hiGraphics.prototype.drawCircle = function(g, circleX, circleY, circleRadius) {
  this.stt();
  g.fillStyle = "#FF0000";
  g.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
  g.stroke();
  return true;
};

hiGraphics.prototype.drawArc = function(g, midX, midY, radius, fromAngle, toAngle) {
  this.stt();
  g.arc(midX, midY, radius, fromAngle, toAngle);
  g.stroke();
};
hiGraphics.prototype.drawBox = function(g, midX, midY, radius, angle) {
  this.stt();
  var pts = [
    [0, 0],
    [Math.cos(angle), Math.sin(angle)],
    [Math.cos(angle) + Math.cos(angle + Math.PI / 2), Math.sin(angle) + Math.sin(angle + Math.PI / 2)],
    [Math.cos(angle + Math.PI / 2), Math.sin(angle + Math.PI / 2)],
    [0, 0]
  ];
  for (var i = 0; i < pts.length; i++) {
    if (i == 0) {
      g.moveTo(midX + radius * pts[i][0], midY + radius * pts[i][1]);
    } else {
      g.lineTo(midX + radius * pts[i][0], midY + radius * pts[i][1]);
    }
  }
  g.stroke();
};
var HiGraphics = new hiGraphics();
circleunitMain();

if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Vòng tròn lượng giác';
}

update();

select.onchange = function() {
  toggleDeg()
}