function circletriangleMain() {
  w = 300, h = 350, el = document.getElementById("canvasId"), ratio = 2, el.width = 400 * ratio, el.height = 450 * ratio, el.style.width = "300px", el.style.height = "350px", g = el.getContext("2d"), g.setTransform(ratio, 0, 0, ratio, 0, 0), circleX = 190, circleY = 270, circleRadius = 150, angle = 1, coordsQ = !1, quadQ = !1, anglesQ = !1, degQ = !1, angles = [
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
  ], angleBox = new TextBox(g, "Arial", 24, 100, 1, "", 170, 110, !1), angleBox.setClr("#0000ff"), angleTypeBox = new TextBox(g, "Arial", 24, 200, 1, "", 290, 140, !0), el.addEventListener("touchmove", ontouchmove, !1), el.addEventListener("mousemove", onmousemove, !1), update()
}

function onmousemove(e) {
  var t = el.getBoundingClientRect(),
    i = e.clientX - t.left - circleX,
    l = e.clientY - t.top - circleY;
  angle = Math.atan2(-l, i), angle < 0 && (angle += 2 * Math.PI), update()
}

function ontouchmove(e) {
  var t = e.targetTouches[0];
  e.clientX = t.clientX, e.clientY = t.clientY, e.touchQ = !0, onmousemove(e), e.preventDefault()
}

function toggleDeg() {
  degQ ? degQ = !1 : degQ = !0, update()
}

function update() {
  HiGraphics.clear(el), drawAngle(), drawRing(), drawCoords(), drawQuadrants(), drawAngles()
}

function doAngle() {
  angle += .01, angle > 1 && clearInterval(id), drawAngle()
}

function drawQuadrants() {
  for (var e = [
      ["I", 1, 1],
      ["II", -1, 1],
      ["III", -1, -1],
      ["IV", 1, -1]
    ], t = 0; t < 4; t++) g.font = "29px Arial", g.textAlign = "center", g.fillStyle = "#aaaaaa", g.fillText(e[t][0], circleX + 50 * e[t][1], circleY - 50 * e[t][2])
}

function drawAngle() {
  angleSnap = Math.floor(angleDeg(angle, !0)), angle = angleSnap * Math.PI / 180, cX = Math.cos(angle) * circleRadius, cY = -Math.sin(angle) * circleRadius, tanLen = -Math.tan(angle) * circleRadius;
  var e = [to3Dig(Math.sin(angle)), to3Dig(Math.cos(angle)), to3Dig(Math.tan(angle))];
  if (angleSnap % 90 == 0) switch (angleSnap) {
    case 0:
      e = [0, 1, 0];
      break;
    case 90:
      e = [1, 0, LN === 'vi' ? 'không xác định' : 'undefined'];
      break;
    case 180:
      e = [0, -1, 0];
      break;
    case 270:
      e = [-1, 0, LN === 'vi' ? 'không xác định' : 'undefined'];
      break;
    case 360:
      e = [0, 1, 0]
  }
  var t = "";
  switch (t = degQ ? angleSnap + "°" : to3Dig(angle), g.font = "18px Arial", g.textAlign = "center", g.fillStyle = "#44dd44", g.fillText("sin(" + t + ") = " + e[0], w / 2, 20, w), g.fillStyle = "#0000ff", g.fillText("cos(" + t + ") = " + e[1], w / 2, 45, w), g.fillStyle = "#ff4444", g.fillText("tan(" + t + ") = " + e[2], w / 2, 70, w), g.lineJoin = "round", g.beginPath(), g.lineWidth = 2, g.strokeStyle = "#aaaaaa", g.moveTo(circleX, circleY), g.lineTo(circleX + cX, circleY + cY), g.stroke(), g.beginPath(), g.lineWidth = 1, g.strokeStyle = "#ff00ff", g.moveTo(circleX, circleY + circleRadius + 10), g.lineTo(circleX, circleY - circleRadius - 10), g.moveTo(circleX + circleRadius + 10, circleY), g.lineTo(circleX - circleRadius - 10, circleY), g.stroke(), HiGraphics.lineStyle(2, "#aaaaaa", 1), angleSnap) {
    case 90:
      HiGraphics.drawBox(g, circleX, circleY - 25, 25, 0);
      break;
    case 360:
      HiGraphics.drawArc(g, circleX, circleY, 30, 0, 2 * Math.PI);
      break;
    default:
      HiGraphics.drawArc(g, circleX, circleY, 30, -angle, 0)
  }
  g.beginPath(), g.lineWidth = 2, g.strokeStyle = "#0000ff", g.moveTo(circleX, circleY), g.lineTo(circleX + cX, circleY), g.stroke(), g.closePath(), g.fillStyle = "#44dd44", g.fillText(e[0], circleX + cX + 5, circleY + cY / 2), g.fillStyle = "#0000ff", g.fillText(e[1], circleX + cX / 2, circleY), g.beginPath(), g.lineWidth = 2, g.strokeStyle = "#44dd44", g.moveTo(circleX + cX, circleY), g.lineTo(circleX + cX, circleY + cY), g.stroke(), g.closePath(), g.beginPath(), g.lineWidth = 2, g.strokeStyle = "#ff4444", g.moveTo(circleX + cX, circleY + cY), g.lineTo(circleX + cX - tanLen * Math.sin(angle), circleY), g.stroke(), g.closePath()
}

function angleDeg(e, t) {
  var i = 180 * e / Math.PI;
  return t && ((i <= 1 || i >= 359) && (i = 360), i >= 89 && i < 92 && (i = 90), i >= 179 && i < 182 && (i = 180), i >= 269 && i < 272 && (i = 270)), i
}

function drawRing() {
  HiGraphics.lineStyle(2, "#ff00ff", 1), HiGraphics.drawCircle(g, circleX, circleY, circleRadius);
}

function drawCoords() {
  for (i = 0; i < angles.length; i++) {
    var e = angles[i][4],
      t = Math.PI * angles[i][1] / angles[i][2],
      l = angles[i][0] % 90 == 0;
    if (i < angles.length - 1) {
      var c = Math.cos(t) * circleRadius,
        r = -Math.sin(t) * circleRadius;
      g.fillStyle = "#fff", g.beginPath(), g.arc(circleX + c, circleY + r, 3, 0, 2 * Math.PI), g.fill();
      var c = Math.cos(t) * (circleRadius + 22),
        r = -Math.sin(t) * (circleRadius + 22),
        a = angles[i][3];
      if (l) g.fillStyle = "#fff", g.font = "15px Arial", g.textAlign = "center", g.fillText(a, circleX + c, circleY + r);
      else {
        switch (currX = circleX + c, currY = circleY + r, e) {
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
            currX -= 5
        }
        g.fillStyle = "#fff", g.font = "15px Arial", g.textAlign = "center", g.fillText("(", currX, currY), currX += 10;
        for (var n = 0; n < 2; n++) {
          n > 0 && (g.font = "15px Arial", g.fillText(",", currX, currY), currX += 12);
          var o = !0;
          "-" == a.charAt(2 * n) && (o = !1, currX += 10);
          var s = 0;
          switch (a.charAt(1 + 2 * n)) {
            case "1":
              drawFrac(g, o, "1", "2", currX, currY - 3), s = 12;
              break;
            case "2":
              drawFrac(g, o, "√2", "2", currX, currY - 3), s = 12;
              break;
            case "3":
              drawFrac(g, o, "√3", "2", currX, currY - 3), s = 12
          }
          currX += s
        }
        g.font = "15px Arial", g.fillText(")", currX, circleY + r)
      }
    }
  }
}

function drawAngles() {
  for (i = 0; i < angles.length; i++) {
    angles[i][4];
    var e = Math.PI * angles[i][1] / angles[i][2],
      t = angles[i][0];
    if (i < angles.length - 1) {
      var l = Math.cos(e) * circleRadius,
        c = -Math.sin(e) * circleRadius;
      g.fillStyle = "#fff", g.beginPath(), g.arc(circleX + l, circleY + c, 3, 0, 2 * Math.PI), g.fill();
      var l = Math.cos(e) * (circleRadius - 22),
        c = -Math.sin(e) * (circleRadius - 22);
      degQ ? (g.fillStyle = "#fff", g.font = "15px Arial", g.textAlign = "center", g.fillText(t.toString() + "°", circleX + l, circleY + c + 5)) : (numer = angles[i][1], denom = angles[i][2], "1" == numer && (numer = ""), "0" != numer && (numer += "π"), "1" == denom ? (g.fillStyle = "#fff", g.font = "15px Arial", g.textAlign = "center", g.fillText(numer, circleX + l, circleY + c)) : drawFrac(g, !0, numer, denom, circleX + l, circleY + c))
    }
  }
}

function drawFrac(e, t, i, l, c, r) {
  e.fillStyle = "#fff", e.font = "17px Arial", e.textAlign = "center", t || e.fillText("-", c - 14, r + 4), e.font = "12px Arial";
  e.fillText(i, c, r - 3), e.fillText(l, c, r + 12), e.strokeStyle = "#fff", e.beginPath(), e.lineWidth = 1, e.moveTo(c - 8, r), e.lineTo(c + 8, r), e.stroke()
}

function to3Dig(e) {
  return Math.floor(1e3 * e + .5) / 1e3
}

function hiGraphics() {
  lineWidth = 5, lineJoin = "round", strokeStyle = "#333"
}

function TextBox(e, t, i, l, c, r, a, n, o) {
  this.g = e, this.font = t, this.fontSize = i, this.wd = l, this.lines = c, this.txt = r, this.posx = a, this.posy = n, this.clr = "#fff", this.refresh()
}
hiGraphics.prototype.clear = function(e) {
  return g = e.getContext("2d"), g.clearRect(0, 0, e.width, e.height), !0
}, hiGraphics.prototype.lineStyle = function(e, t, i) {
  lineWidth = e, lineJoin = "round", strokeStyle = t
}, hiGraphics.prototype.stt = function() {
  g.beginPath(), g.lineWidth = lineWidth, g.lineJoin = lineJoin, g.strokeStyle = strokeStyle
}, hiGraphics.prototype.drawCircle = function(e, t, i, l) {
  return this.stt(), e.fillStyle = "#FF0000", e.arc(t, i, l, 0, 2 * Math.PI), e.stroke(), !0
}, hiGraphics.prototype.drawCompass = function(e, t, i, l) {
  for (var c = 0; c < 360; c += 15) {
    var r = c * Math.PI / 180;
    c % 90 ? this.lineStyle(1, "#888888", 1) : this.lineStyle(2, "#444444", 1), this.stt();
    var a = t + Math.cos(r) * l,
      n = i - Math.sin(r) * l;
    e.moveTo(a, n), a = t + Math.cos(r) * (l + 15), n = i - Math.sin(r) * (l + 15), e.lineTo(a, n), e.stroke(), a = t + Math.cos(r) * (l + 15 + 14) + 0, n = i - Math.sin(r) * (l + 15 + 14) + 5, e.font = "12px Arial", e.fillText(c + "°", a, n, 100)
  }
}, hiGraphics.prototype.drawArc = function(e, t, i, l, c, r) {
  this.stt(), e.arc(t, i, l, c, r), e.stroke()
}, hiGraphics.prototype.drawBox = function(e, t, i, l, c) {
  this.stt();
  for (var r = [
      [0, 0],
      [Math.cos(c), Math.sin(c)],
      [Math.cos(c) + Math.cos(c + Math.PI / 2), Math.sin(c) + Math.sin(c + Math.PI / 2)],
      [Math.cos(c + Math.PI / 2), Math.sin(c + Math.PI / 2)],
      [0, 0]
    ], a = 0; a < r.length; a++) 0 == a ? e.moveTo(t + l * r[a][0], i + l * r[a][1]) : e.lineTo(t + l * r[a][0], i + l * r[a][1]);
  e.stroke()
};
var HiGraphics = new hiGraphics;
TextBox.prototype.refresh = function() {
  this.g.font = this.fontSize + "px " + this.font, this.g.fillStyle = this.clr, this.g.fillText(this.txt, this.posx, this.posy, this.wd)
}, TextBox.prototype.setText = function(e) {
  this.txt = e, this.refresh()
}, TextBox.prototype.setClr = function(e) {
  this.clr = e
}, circletriangleMain();

if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Vòng tròn lượng giác';
}

update();

select.onchange = function() {
  toggleDeg()
}