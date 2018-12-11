"undefined"!=typeof module&&(nerdamer=require("./nerdamer.core.js"),require("./Calculus"),require("./Algebra")),function(){var t=nerdamer.getCore(),e=t.PARSER,i=t.Symbol,n=t.Utils.format,s=t.Utils.isVector,r=t.groups.S,a=(t.groups.EX,t.groups.CP),o=t.groups.CB,l=t.groups.FN;t.Settings.Laplace_integration_depth=40,i.prototype.findFunction=function(t){if(this.group===l&&this.fname===t)return this.clone();var e;if(this.symbols)for(var i in this.symbols)if(e=this.symbols[i].findFunction(t))break;return e};var u=t.Extra={version:"1.4.1",LaPlace:{transform:function(s,a,c){a=a.toString();var p,m=(s=i.unwrapSQRT(s,!0)).stripVar(a),d=s.group;if((s=e.divide(s,m.clone())).isConstant()||!s.contains(a,!0))p=e.parse(n("({0})/({1})",s,c));else if(d===r&&t.Utils.isInt(s.power)){var f=String(s.power);p=e.parse(n("factorial({0})/({1})^({0}+1)",f,c))}else if(s.group===r&&s.power.equals(.5))p=e.parse(n("sqrt(pi)/(2*({0})^(3/2))",c));else if(s.isComposite())p=new i(0),s.each(function(t){p=e.add(p,u.LaPlace.transform(t,a,c))},!0);else if(!s.isE()||s.power.group!==r&&s.power.group!==o){if(s.group!==l||-1===["sin","cos","sinh","cosh"].indexOf(s.fname)||s.args[0].group!==r&&s.args[0].group!==o){var v=t.Settings.integration_depth<t.Settings.Laplace_integration_depth;if(v){var g=t.Settings.integration_depth;t.Settings.integration_depth=t.Settings.Laplace_integration_depth}t.Utils.block("PARSE2NUMBER",function(){var n=a,r=s.sub(a,n),o=e.parse("e^(-"+c+"*"+n+")*"+r);(p=t.Calculus.integrate(o,n)).hasIntegral()&&e.error("Unable to compute transform"),p=p.sub(a,0),p=(p=e.expand(e.multiply(p,new i(-1)))).sub(n,a)},!1),p=t.Utils.block("PARSE2NUMBER",function(){return e.parse(p)},!0),v&&(t.Settings.integration_depth=g)}else{b=s.args[0].stripVar(a);switch(s.fname){case"sin":p=e.parse(n("({0})/(({1})^2+({0})^2)",b,c));break;case"cos":p=e.parse(n("({1})/(({1})^2+({0})^2)",b,c));break;case"sinh":p=e.parse(n("({0})/(({1})^2-({0})^2)",b,c));break;case"cosh":p=e.parse(n("({1})/(({1})^2-({0})^2)",b,c))}}}else{var b=s.power.stripVar(a);p=e.parse(n("1/(({1})-({0}))",b,c))}return e.multiply(p,m)},inverse:function(s,l,u){return t.Utils.block("POSITIVE_MULTIPLIERS",function(){if(s.group===r||s.group===o||s.group===a){var c,p,m,d,f,v,g,b,S,w=function(){(d=e.multiply(d,c)).multiplier=d.multiplier.multiply(s.multiplier),d=e.divide(d,f.a)};if(v=s.multiplier.clone(),s.toUnitMultiplier(),c=s.getNum(),(p=s.getDenom().toUnitMultiplier()).group===a?(g=p.power.clone(),p.toLinear()):g=new t.Frac(1),m=l.toString(),f=t.Utils.decompose_fn(p,m,!0),t.Utils.decompose_fn(e.expand(c.clone()),m,!0),c.multiplier=c.multiplier.multiply(v),(p.group===r||p.group===o)&&f.x.value===m&&f.b.equals(0)&&t.Utils.isInt(f.x.power))S=f.x.power-1,b=t.Math2.factorial(S),d=e.divide(e.pow(u,new i(S)),new i(b)),w();else if(p.group===a&&g.equals(1)){if(f.x.isLinear()&&!c.contains(m))u=e.divide(u,f.a.clone()),d=e.pow(new i("e"),e.multiply(u,f.b.negate())),w();else if(f.x.group===r&&f.x.power.equals(2))if(c.contains(m)){var q=new i(1);if(c.group===o){var h=new i(1);c.each(function(t){t.contains(m)?h=e.multiply(h,t):q=e.multiply(q,t)}),c=h}var y,x,U,_,L,V,E,M,P,C,F=t.Utils.decompose_fn(c,m,!0);if(y=F.a,x=F.b,U=y.containsFunction("sin"),L=y.containsFunction("cos"),_=x.containsFunction("cos"),V=x.containsFunction("sin"),F.x.value===m&&F.x.isLinear()&&!(U&&_||L||V))d=e.parse(n("(({1})*cos((sqrt(({2})*({3}))*({0}))/({2})))/({2})",u,F.a,f.a,f.b));else if(U&&_)if(E=y.findFunction("sin"),M=x.findFunction("cos"),E.args[0].equals(M.args[0])&&!E.args[0].contains(m))R=e.divide(x,M.toUnitMultiplier()).toString(),P=E.args[0].toString(),k=f.b,C=e.divide(y,E.toUnitMultiplier()),D="(({1})*({2})*cos({3})*sin(sqrt({4})*({0})))/sqrt({4})+({1})*sin({3})*({5})*cos(sqrt({4})*({0}))",d=e.parse(n(D,u,q,R,P,k,C))}else d=e.parse(n("(({1})*sin((sqrt(({2})*({3}))*({0}))/({2})))/sqrt(({2})*({3}))",u,c,f.a,f.b))}else if(f.x.power.num&&f.x.power.num.equals(3)&&f.x.power.den.equals(2)&&c.contains("sqrt(pi)")&&!c.contains(m)&&c.isLinear()){var R=e.divide(c.clone(),e.parse("sqrt(pi)"));d=e.parse(n("(2*({2})*sqrt({0}))/({1})",u,f.a,R,c))}else if(g.equals(2)&&f.x.power.equals(2)){var k,D;if(c.contains(m))if((F=t.Utils.decompose_fn(e.expand(c.clone()),m,!0)).x.isComposite()){var I=[],A=c.collectSymbols(function(e){e=i.unwrapPARENS(e);var n=t.Utils.decompose_fn(e,m,!0);return n.symbol=e,n}).sort(function(t,e){var i;return i=t.x.value!==m?0:t.x.power,(e.x.value!==m?0:e.x.power)-i});q=new i(-1);for(var N=0;N<A.length;N++){var z=A[N];z.x.value===m?I.push(z):q=e.multiply(q,z.symbol)}I[0].x.power.equals(2)&&I[1].x.power.equals(1)&&I[1].b.equals(0)&&!I[0].b.equals(0)&&(R=I[0].a.negate(),D="-(({1})*({2})*({5})*({0})*sin((sqrt(({4})*({5}))*({0}))/({4})))/(2*({4})^2*sqrt(({4})*({5})))-(({1})*({3})*({0})*sin((sqrt(({4})*({5}))*({0}))/({4})))/(2*({4})*sqrt(({4})*({5})))+(({1})*({2})*cos((sqrt(({4})*({5}))*({0}))/({4})))/({4})^2",d=e.parse(n(D,u,q,R,I[0].b,f.a,f.b)))}else F.x.isLinear()?(q=e.divide(F.a,new i(2)),D="(({1})*({0})*sin((sqrt(({2})*({3}))*({0}))/({2})))/(({2})*sqrt(({2})*({3})))",d=e.parse(n(D,u,q,f.a,f.b))):F.x.power.equals(2)&&(F.b.equals(0)?(q=e.divide(F.a,new i(2)),D="(({1})*sin((sqrt(({2})*({3}))*({0}))/({2})))/(({2})*sqrt(({2})*({3})))+(({1})*({0})*cos((sqrt(({2})*({3}))*({0}))/({2})))/({2})^2",d=e.parse(n(D,u,q,f.a,f.b))):(q=e.divide(F.a,new i(2)),k=F.b.negate(),D="-((({2})*({4})-2*({1})*({3}))*sin((sqrt(({2})*({3}))*({0}))/({2})))/(2*({2})*({3})*sqrt(({2})*({3})))+(({4})*({0})*cos((sqrt(({2})*({3}))*({0}))/({2})))/(2*({2})*({3}))+(({1})*({0})*cos((sqrt(({2})*({3}))*({0}))/({2})))/({2})^2",d=e.parse(n(D,u,q,f.a,f.b,k))));else q=e.divide(c,new i(2)),D="(({1})*sin((sqrt(({2})*({3}))*({0}))/({2})))/(({3})*sqrt(({2})*({3})))-(({1})*({0})*cos((sqrt(({2})*({3}))*({0}))/({2})))/(({2})*({3}))",d=e.parse(n(D,u,q,f.a,f.b))}}return d||(d=e.symfunction("ilt",arguments)),d},!0)}},Statistics:{frequencyMap:function(t){for(var e={},i=0,n=t.length;i<n;i++){var s=t[i].toString();e[s]||(e[s]=0),e[s]++}return e},sort:function(t){return t.sort(function(t,i){return t.isConstant()&&i.isConstant()||e.error("Unable to sort! All values must be numeric"),t.multiplier.subtract(i.multiplier)})},count:function(t){return new i(t.length)},sum:function(t,n){for(var s=new i(0),r=0,a=t.length;r<a;r++){var o=t[r].clone();s=n?e.add(e.pow(e.subtract(o,n.clone()),new i(2)),s):e.add(o,s)}return s},mean:function(){var t=[].slice.call(arguments);return s(t[0])?u.Statistics.mean.apply(this,t[0].elements):e.divide(u.Statistics.sum(t),u.Statistics.count(t))},median:function(){var i,n=[].slice.call(arguments);if(s(n[0]))return u.Statistics.median.apply(this,n[0].elements);try{var r=u.Statistics.sort(n),a=n.length;if(t.Utils.even(a)){var o=a/2;i=u.Statistics.mean(r[o-1],r[o])}else i=r[Math.floor(a/2)]}catch(t){i=e.symfunction("median",n)}return i},mode:function(){var i,n=[].slice.call(arguments);if(s(n[0]))return u.Statistics.mode.apply(this,n[0].elements);var r,a=u.Statistics.frequencyMap(n),o=[],l=0,c=0,p=[];if(1===t.Utils.keys(a).length)return n[0];for(var m in a){var d=a[m],f=0===l;f&&(r=d),f||d>o[1]?(o[0]=m,o[1]=d):d===o[1]&&p.push(m),d===r&&c++,l++}return p.length>0?(p.push(o[0]),i=e.symfunction("mode",p.sort())):i=c===l?e.symfunction("mode",n):e.parse(o[0]),i},gVariance:function(t,i){var n=u.Statistics.mean.apply(u.Statistics,i),s=u.Statistics.sum(i,n);return e.multiply(t,s)},variance:function(){var t=[].slice.call(arguments);if(s(t[0]))return u.Statistics.variance.apply(this,t[0].elements);var n=e.divide(new i(1),u.Statistics.count(t));return u.Statistics.gVariance(n,t)},sampleVariance:function(){var t=[].slice.call(arguments);if(s(t[0]))return u.Statistics.sampleVariance.apply(this,t[0].elements);var n=e.divide(new i(1),e.subtract(u.Statistics.count(t),new i(1)));return u.Statistics.gVariance(n,t)},standardDeviation:function(){var t=[].slice.call(arguments);return s(t[0])?u.Statistics.standardDeviation.apply(this,t[0].elements):e.pow(u.Statistics.variance.apply(u.Statistics,t),new i(.5))},sampleStandardDeviation:function(){var t=[].slice.call(arguments);return s(t[0])?u.Statistics.sampleStandardDeviation.apply(this,t[0].elements):e.pow(u.Statistics.sampleVariance.apply(u.Statistics,t),new i(.5))},zScore:function(t,i,n){return e.divide(e.subtract(t,i),n)}},Units:{table:{foot:"12 inch",meter:"100 cm",decimeter:"10 cm"}}};nerdamer.register([{name:"laplace",visible:!0,numargs:3,build:function(){return u.LaPlace.transform}},{name:"ilt",visible:!0,numargs:3,build:function(){return u.LaPlace.inverse}},{name:"mean",visible:!0,numargs:-1,build:function(){return u.Statistics.mean}},{name:"median",visible:!0,numargs:-1,build:function(){return u.Statistics.median}},{name:"mode",visible:!0,numargs:-1,build:function(){return u.Statistics.mode}},{name:"smpvar",visible:!0,numargs:-1,build:function(){return u.Statistics.sampleVariance}},{name:"variance",visible:!0,numargs:-1,build:function(){return u.Statistics.variance}},{name:"smpstdev",visible:!0,numargs:-1,build:function(){return u.Statistics.sampleStandardDeviation}},{name:"stdev",visible:!0,numargs:-1,build:function(){return u.Statistics.standardDeviation}},{name:"zscore",visible:!0,numargs:3,build:function(){return u.Statistics.zScore}}]),nerdamer.api()}();

if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Thống kê';
  document.getElementById('btn-freq').innerHTML = document.getElementsByTagName('label')[3].innerHTML = 'Tần số';
  document.getElementsByTagName('label')[4].innerHTML = 'PHÂN PHỐI CHUẨN';
  select.options[0].text = '1-Biến';
}

var option = select.value;
var val = [
  [0.50000, 0.50399, 0.50798, 0.51197, 0.51595, 0.51994, 0.52392, 0.52790, 0.53188, 0.53586],
  [0.53983, 0.54380, 0.54776, 0.55172, 0.55567, 0.55966, 0.56360, 0.56749, 0.57142, 0.57535],
  [0.57926, 0.58317, 0.58706, 0.59095, 0.59483, 0.59871, 0.60257, 0.60642, 0.61026, 0.61409],
  [0.61791, 0.62172, 0.62552, 0.62930, 0.63307, 0.63683, 0.64058, 0.64431, 0.64803, 0.65173],
  [0.65542, 0.65910, 0.66276, 0.66640, 0.67003, 0.67364, 0.67724, 0.68082, 0.68439, 0.68793],
  [0.69146, 0.69497, 0.69847, 0.70194, 0.70540, 0.70884, 0.71226, 0.71566, 0.71904, 0.72240],
  [0.72575, 0.72907, 0.73237, 0.73565, 0.73891, 0.74215, 0.74537, 0.74857, 0.75175, 0.75490],
  [0.75804, 0.76115, 0.76424, 0.76730, 0.77035, 0.77337, 0.77637, 0.77935, 0.78230, 0.78524],
  [0.78814, 0.79103, 0.79389, 0.79673, 0.79955, 0.80234, 0.80511, 0.80785, 0.81057, 0.81327],
  [0.81594, 0.81859, 0.82121, 0.82381, 0.82639, 0.82894, 0.83147, 0.83398, 0.83646, 0.83891],
  [0.84134, 0.84375, 0.84614, 0.84849, 0.85083, 0.85314, 0.85543, 0.85769, 0.85993, 0.86214],
  [0.86433, 0.86650, 0.86864, 0.87076, 0.87286, 0.87493, 0.87698, 0.87900, 0.88100, 0.88298],
  [0.88493, 0.88686, 0.88877, 0.89065, 0.89251, 0.89435, 0.89617, 0.89796, 0.89973, 0.90147],
  [0.90320, 0.90490, 0.90658, 0.90824, 0.90988, 0.91149, 0.91308, 0.91466, 0.91621, 0.91774],
  [0.91924, 0.92073, 0.92220, 0.92364, 0.92507, 0.92647, 0.92785, 0.92922, 0.93056, 0.93189],
  [0.93319, 0.93448, 0.93574, 0.93699, 0.93822, 0.93943, 0.94062, 0.94179, 0.94295, 0.94408],
  [0.94520, 0.94630, 0.94738, 0.94845, 0.94950, 0.95053, 0.95154, 0.95254, 0.95352, 0.95449],
  [0.95543, 0.95637, 0.95728, 0.95818, 0.95907, 0.95994, 0.96080, 0.96164, 0.96246, 0.96327],
  [0.96407, 0.96485, 0.96562, 0.96638, 0.96712, 0.96784, 0.96856, 0.96926, 0.96995, 0.97062],
  [0.97128, 0.97193, 0.97257, 0.97320, 0.97381, 0.97441, 0.97500, 0.97558, 0.97615, 0.97670],
  [0.97725, 0.97778, 0.97831, 0.97882, 0.97932, 0.97982, 0.98030, 0.98077, 0.98124, 0.98169],
  [0.98214, 0.98257, 0.98300, 0.98341, 0.98382, 0.98422, 0.98461, 0.98500, 0.98537, 0.98574],
  [0.98610, 0.98645, 0.98679, 0.98713, 0.98745, 0.98778, 0.98809, 0.98840, 0.98870, 0.98899],
  [0.98928, 0.98956, 0.98983, 0.99010, 0.99036, 0.99061, 0.99086, 0.99111, 0.99134, 0.99158],
  [0.99180, 0.99202, 0.99224, 0.99245, 0.99266, 0.99286, 0.99305, 0.99324, 0.99343, 0.99361],
  [0.99379, 0.99396, 0.99413, 0.99430, 0.99446, 0.99461, 0.99477, 0.99492, 0.99506, 0.99520],
  [0.99534, 0.99547, 0.99560, 0.99573, 0.99585, 0.99598, 0.99609, 0.99621, 0.99632, 0.99643],
  [0.99653, 0.99664, 0.99674, 0.99683, 0.99693, 0.99702, 0.99711, 0.99720, 0.99728, 0.99736],
  [0.99744, 0.99752, 0.99760, 0.99767, 0.99774, 0.99781, 0.99788, 0.99795, 0.99801, 0.99807],
  [0.99813, 0.99819, 0.99825, 0.99831, 0.99836, 0.99841, 0.99846, 0.99851, 0.99856, 0.99861],
  [0.99865, 0.99869, 0.99874, 0.99878, 0.99882, 0.99886, 0.99889, 0.99893, 0.99896, 0.99900]
];

var ctx = plotDistr.getContext('2d');
ctx.font="14px Arial";
var lower_limit = -3;
var upper_limit = 3;
var step = 0.001;
var canvas_width = 350;
var canvas_height = 350;
var x_plotting_unit = canvas_width / 8;
var y_plotting_unit = canvas_height * 2;
var lower_offset_from_canvas = 40;
var length_of_xtick = 10;
var mean_in_graph = Math.abs(lower_limit);
var y = [];
var xList = '';

$('#y_area, #reg, #freq_area').hide();

$('#btn-freq').click(function() {
  $('#freq_area').slideToggle('slow');
});

$('#select').on('change', function() {
  option = $(this).val();
  if (option === '1') {
    $('#distr').show();
    $('#y_area, #reg').hide();
  } else {
    $('#distr').hide();
    $('#y_area, #reg').show();
  }
});

function checkMode(str) {
  str = str.replace(/\[|\]/g, '');
  if (str.includes('mode')) {
    let arr = str.replace(/mode\([^\)]*\)/, '@').split(',');
    arr[5] = arr[5].replace(/@/, str.match(/mode\([^\)]*\)/).toString());
    return arr;
  }
  return str.split(',');
}

function basicFunction(str) {
  return checkMode(nerdamer(`vector(mean(${str}), variance(${str}), stdev(${str}), max(${str}), min(${str}), mode(${str}), median(${str}), smpvar(${str}), sqrt(smpvar(${str})))`).evaluate().text())
}

cal.onclick = function() {
  let xArray = xInput.value.split(' ');
  let yList = yInput.value;
  let yArray = yList.split(' ');
  let fList = fInput.value;
  let fArray = fList.split(' ');
  let N = fList !== '' ? nerdamer(fList.replace(/ /, '+')).toString() : xArray.length;

  if (fList !== '') {
    for (let i = 0; i < xArray.length; i++) {
      for (let j = 1; j < parseInt(fArray[i]); j++) {
        xArray.push(xArray[i]);
        if (yList !== '') {
          yArray.push(yArray[i]);
        }
      }
    }
  }

  xList = xArray.toString();

  let XresultList = basicFunction(xList);
  let xMean = XresultList[0];
  let xVariance = XresultList[1];
  let xStdev = XresultList[2];
  let yResult = '';

  if (option === '1') {
    redraw_normal_curve();
    plot_z_score_area(xList)
  } else {

    yList = yArray.toString();

    let YresultList = basicFunction(yList);
    let yMean = YresultList[0];
    let yStdev = YresultList[2];

    yResult = `\\\\ \\\\ \\max(y) & = & ${YresultList[3]} \\\\
          \\min(y) & = & ${YresultList[4]} \\\\
          \\bar x & \\approx & ${xMean} \\\\
          \\text{mode}(y) & = & ${YresultList[5]} \\\\
          \\text{median}(y) & = & ${YresultList[6]} \\\\
          s^2y & \\approx & ${YresultList[7]} \\\\
          sy & \\approx & ${YresultList[8]} \\\\
          \\sigma^2y & \\approx & ${YresultList[1]} \\\\
          \\sigma y & \\approx & ${yStdev}`;

    let Sxy, A, B, R;
    let ln_x = `log(${xList.replace(/,/g, '), log(')})`;
    let ln_y = `log(${yList.replace(/,/g, '), log(')})`;
    let mean_ln_x = nerdamer(`mean(${ln_x})`);
    let mean_ln_y = nerdamer(`mean(${ln_y})`);
    let Sxx_ln = `(${nerdamer(`variance(${ln_x})`)})`;
    let Syy_ln = `(${nerdamer(`variance(${ln_y})`)})`;

    if (option === '2' || option === '3') {
      Sxy = `(${nerdamer(`dot([${xList}], [${yList}])/${N}-${xMean}*${yMean}`)})`;
    }

    if (option === '2') {
      B = nerdamer(`${Sxy}/(${xVariance})`).evaluate().text();
      reg_output.innerHTML = `$$y=A+Bx$$ 
            $$\\begin{array}{l}
              A & = & ${nerdamer(`${yMean}-${B}*${xMean}`).evaluate().text()} \\\\ 
              B & = & ${B} \\\\
              r & = & ${nerdamer(`${Sxy}/((${xStdev})*(${yStdev}))`).evaluate().text()}
            \\end{array}$$`
    }

    if (option === '3') {
      let quad_x = `(${xList.replace(/,/g, ')^2,(')})^2`;
      let mean_quad_x = nerdamer(`mean(${quad_x})`);
      let Sxx_quad = `(${nerdamer(`dot([${xList}], [${quad_x}])/${N}-${xMean}*${mean_quad_x}`)})`;
      let Sx_quad_x_quad = `(${nerdamer(`dot([${quad_x}], [${quad_x}])/${N}-${mean_quad_x}*${mean_quad_x}`)})`;
      let Sx_quad_y = `(${nerdamer(`dot([${quad_x}], [${yList}])/${N}-${mean_quad_x}*${yMean}`)})`;

      B = nerdamer(`(${Sxy}*${Sx_quad_x_quad}-${Sx_quad_y}*${Sxx_quad})/(${xVariance}*${Sx_quad_x_quad}-(${Sxx_quad})^2)`).evaluate().text();
      let C = nerdamer(`(${Sx_quad_y}*${xVariance}-${Sxy}*${Sxx_quad})/(${xVariance}*${Sx_quad_x_quad}-(${Sxx_quad})^2)`).evaluate().text();
      A = nerdamer(`${yMean}-(${B})*(${xMean})-(${C})*(${mean_quad_x})`).evaluate().text();

      let quad = quad_x.split(',');
      let n = [];
      let d = [];
      for (let i = 0; i < xArray.length; i++) {
        n[i] = `(${yArray[i]}-(${A}+${B}*${xArray[i]}+${C}*${quad[i]}))^2`
        d[i] = `(${yArray[i]}-${yMean})^2`
      }
      xList = n.toString();
      yList = d.toString();

      reg_output.innerHTML = `$$y=A+Bx+Cx^2$$
            $$\\begin{array}{l}
              A & = & ${A} \\\\ B & = & ${B} \\\\ C & = & ${C} \\\\
              r & = & ${nerdamer(`sqrt(1-mean(${xList})/mean(${yList}))`).evaluate().text()}
            \\end{array}$$`
    }

    if (option === '4') {
      Sxy = `(${nerdamer(`dot([${ln_x}], [${yList}])/${N}-${mean_ln_x}*${yMean}`)})`;
      B = nerdamer(`${Sxy}/${Sxx_ln}`).evaluate().text();
      reg_output.innerHTML = `$$y=A+B\\ln(x)$$
            $$\\begin{array}{l}
              A & = & ${nerdamer(`${yMean}-(${B})*(${mean_ln_x})`).evaluate().text()} \\\\ B & = & ${B} \\\\
              r & = & ${nerdamer(`${Sxy}/(sqrt(${Sxx_ln})*(${yStdev}))`).evaluate().text()}
            \\end{array}$$`
    }

    if (option === '5' || option === '6') {
      Sxy = `(${nerdamer(`dot([${xList}], [${ln_y}])/${N}-${xMean}*${mean_ln_y}`)})`;
      R = nerdamer(`${Sxy}/((${xStdev})*sqrt(${Syy_ln}))`).evaluate().text()
    }

    if (option === '5') {
      B = nerdamer(`${Sxy}/${xVariance}`).evaluate().text();
      reg_output.innerHTML = `$$y=Ae^{Bx}$$ 
            $$\\begin{array}{l}
              A & = & ${nerdamer(`e^(${mean_ln_y}-(${B})*(${xMean}))`).evaluate().text()} \\\\ B & = & ${B} \\\\ r & = & ${R}
            \\end{array}$$`
    }

    if (option === '6') {
      B = nerdamer(`e^(${Sxy}/${xVariance})`).evaluate().text();
      reg_output.innerHTML = `$$y=AB^x$$ 
            $$\\begin{array}{l}
              A & = & ${nerdamer(`e^(${mean_ln_y}-log(${B})*(${xMean}))`).evaluate().text()} \\\\ B & = & ${B} \\\\ r & = & ${R}
            \\end{array}$$`
    }

    if (option === '7') {
      Sxy = `(${nerdamer(`dot([${ln_x}], [${ln_y}])/${N}-${mean_ln_x}*${mean_ln_y}`)})`;
      B = nerdamer(`${Sxy}/${Sxx_ln}`).evaluate().text();
      reg_output.innerHTML = `$$y=Ax^B$$ 
            $$\\begin{array}{l}
              A & = & ${nerdamer(`e^(${mean_ln_y}-(${B})*(${mean_ln_x}))`).evaluate().text()} \\\\ B & = & ${B} \\\\ 
              r & = & ${nerdamer(`${Sxy}/(sqrt(${Sxx_ln})*sqrt(${Syy_ln}))`).evaluate().text()}
            \\end{array}$$`
    }

    if (option === '8') {
      let inv_x = `1/(${xList.replace(/,/g, '),1/(')})`;
      let mean_inv_x = nerdamer(`mean(${inv_x})`);
      let Sxx_inv = `(${nerdamer(`variance(${inv_x})`)})`;
      Sxy = `(${nerdamer(`dot([${inv_x}], [${yList}])/${N}-${mean_inv_x}*${yMean}`)})`;
      B = nerdamer(`${Sxy}/${Sxx_inv}`).evaluate().text();
      reg_output.innerHTML = `$$y=A+\\frac{B}x$$ 
            $$\\begin{array}{l}
              A & = & ${nerdamer(`${yMean}-(${B})*(${mean_inv_x})`).evaluate().text()} \\\\ B & = & ${B} \\\\ 
              r & = & ${nerdamer(`${Sxy}/(sqrt(${Sxx_inv})*(${yStdev}))`).evaluate().text()}
            \\end{array}$$`
    }
  }
  let result = `$$\\begin{array}{l}
        n & = & ${N} \\\\ \\\\
        \\max(x) & = & ${XresultList[3]} \\\\
        \\min(x) & = & ${XresultList[4]} \\\\
        \\bar x & \\approx & ${xMean} \\\\
        \\text{mode}(x) & = & ${XresultList[5]} \\\\
        \\text{median}(x) & = & ${XresultList[6]} \\\\
        s^2x & \\approx & ${XresultList[7]} \\\\
        sx & \\approx & ${XresultList[8]} \\\\
        \\sigma^2x & \\approx & ${xVariance} \\\\
        \\sigma x & \\approx & ${xStdev}
        ${yResult}
      \\end{array}$$`;

  _output.innerHTML = result;

  renderMathInElement(document.getElementById("math"), { delimiters: [{ left: "$$", right: "$$", display: !0 }, { left: "$", right: "$", display: !1 }] });
}

xx.oninput = function() {
  if (xList !== '') {
    redraw_normal_curve();
    plot_z_score_area(xList);
  }
}

function plot_z_score_area(str) {
  zscore = nerdamer(`zscore(${xx.value}, mean(${str}), stdev(${str}))`).evaluate().text();
  z = parseFloat(zscore);
  abs_z = Math.abs(z)
  ufd = Number(abs_z - (abs_z * 100 % 10) / 100).toFixed(1);
  sec_d = Number(abs_z * 100 % 10).toFixed(0);
  ufd_index = Math.round(ufd * 10);
  if (z >= 0) {
    area_left_of_z = val[ufd_index][sec_d];
    area_right_of_z = 1 - area_left_of_z;
    area_between_0_and_z = area_left_of_z - 0.5
  } else {
    area_left_of_plus_z = val[ufd_index][sec_d];
    area_between_0_and_plus_z = area_left_of_plus_z - 0.5;
    area_left_of_z = 1 - area_between_0_and_plus_z - 0.5;
    area_right_of_z = 1 - area_left_of_z;
    area_between_0_and_z = area_between_0_and_plus_z
  }

  distr_output.innerHTML = katex.renderToString(`\\begin{array}{l}
        \\text{Z-score} & \\approx & ${zscore}\\\\
        \\text{P(z)} & \\approx & ${area_left_of_z}\\\\
        \\text{R(z)} & \\approx & ${area_right_of_z}\\\\
        \\text{Q(z)} & \\approx & ${area_between_0_and_z}
      \\end{array}`, { 
    displayMode: !0 
  });

  ctx.beginPath();
  X_right = (mean_in_graph + z) * x_plotting_unit;
  ctx.moveTo(X_right, canvas_height - lower_offset_from_canvas);
  ctx.lineTo(X_right, 0);
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = '#647f42';
  for (x = lower_limit; x <= z; x += step) {
    yval = (1 / (Math.sqrt(2 * Math.PI))) * ((Math.E ** (-1 * (x ** 2) / 2)));
    X = (x + mean_in_graph) * x_plotting_unit;
    Y = canvas_height - (yval * y_plotting_unit) - lower_offset_from_canvas;
    ctx.rect(X, Y, 0.1, canvas_height - Y - lower_offset_from_canvas)
  }
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = '#42567f';
  for (x = z; x <= upper_limit; x += step) {
    yval = (1 / (Math.sqrt(2 * Math.PI))) * ((Math.E ** (-1 * (x ** 2) / 2)));
    X = (x + mean_in_graph) * x_plotting_unit;
    Y = canvas_height - (yval * y_plotting_unit) - lower_offset_from_canvas;
    ctx.rect(X, Y, 0.1, canvas_height - Y - lower_offset_from_canvas)
  }
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  grd = ctx.createLinearGradient(0, 0, 350, 0);
  grd.addColorStop(1, "#fff");
  if (z > 0) {
    grd.addColorStop(0, "#647f42");
    ctx.fillStyle = grd;
    for (x = 0; x <= z; x += step) {
      yval = (1 / (Math.sqrt(2 * Math.PI))) * ((Math.E ** (-1 * (x ** 2) / 2)));
      X = (x + mean_in_graph) * x_plotting_unit;
      Y = canvas_height - (yval * y_plotting_unit) - lower_offset_from_canvas;
      ctx.rect(X, Y, 0.1, canvas_height - Y - lower_offset_from_canvas)
    }
  } else {
    grd.addColorStop(0, "#42567f");
    ctx.fillStyle = grd;
    for (x = z; x <= 0; x += step) {
      yval = (1 / (Math.sqrt(2 * Math.PI))) * ((Math.E ** (-1 * (x ** 2) / 2)));
      X = (x + mean_in_graph) * x_plotting_unit;
      Y = canvas_height - (yval * y_plotting_unit) - lower_offset_from_canvas;
      ctx.rect(X, Y, 0.1, canvas_height - Y - lower_offset_from_canvas)
    }
  }
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.fillText('P(z)', 20, 20);
  ctx.fillText('Q(z)', 150, 20);
  ctx.fillText('R(z)', 230, 20);
  ctx.fill();
  ctx.closePath()
}

function draw_normal_curve() {
  ctx.clearRect(0, 0, plotDistr.width, plotDistr.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas_height - lower_offset_from_canvas);
  ctx.lineTo(2 * upper_limit * x_plotting_unit, canvas_height - lower_offset_from_canvas);
  for (xtick = lower_limit; xtick <= upper_limit; xtick++) {
    ctx.moveTo((xtick + upper_limit) * x_plotting_unit, canvas_height - lower_offset_from_canvas);
    ctx.lineTo((xtick + upper_limit) * x_plotting_unit, canvas_height - lower_offset_from_canvas + length_of_xtick);
    ctx.fillStyle = '#fff';
    ctx.fillText(xtick, (xtick + upper_limit) * x_plotting_unit - 2, canvas_height - lower_offset_from_canvas + length_of_xtick + 12)
  }
  for (x = lower_limit; x <= upper_limit; x += step) {
    yval = (1 / (Math.sqrt(2 * Math.PI))) * ((Math.E ** (-1 * (x ** 2) / 2)));
    y.push(yval);
    X = (x + mean_in_graph) * x_plotting_unit;
    Y = canvas_height - (yval * y_plotting_unit) - lower_offset_from_canvas;
    ctx.rect(X, Y, 0.1, 0.1)
  }
  ctx.strokeStyle = '#fff';
  ctx.fill();
  ctx.stroke();
  ctx.closePath()
}

function redraw_normal_curve() {
  ctx.clearRect(0, 0, plotDistr.width, plotDistr.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas_height - lower_offset_from_canvas);
  ctx.lineTo(2 * upper_limit * x_plotting_unit, canvas_height - lower_offset_from_canvas);
  for (xtick = lower_limit; xtick <= upper_limit; xtick++) {
    ctx.moveTo((xtick + upper_limit) * x_plotting_unit, canvas_height - lower_offset_from_canvas);
    ctx.lineTo((xtick + upper_limit) * x_plotting_unit, canvas_height - lower_offset_from_canvas + length_of_xtick);
    ctx.fillText(xtick, (xtick + upper_limit) * x_plotting_unit - 2, canvas_height - lower_offset_from_canvas + length_of_xtick + 12)
  }
  for (x = lower_limit, i = 0; x <= upper_limit; x += step, i++) {
    X = (x + mean_in_graph) * x_plotting_unit;
    Y = canvas_height - (y[i] * y_plotting_unit) - lower_offset_from_canvas;
    ctx.rect(X, Y, 0.1, 0.1)
  }
  ctx.stroke();
  ctx.closePath()
}

draw_normal_curve();