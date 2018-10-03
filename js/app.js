!function(a,b){"use strict";function c(a,b){for(var c=0,d=a.length;d>c;c++)i=a[c].querySelector("."+r),i.addEventListener(b,f,!1)}function d(a){for(var b=0,c=a.length;c>b;b++)a[b].setAttribute(n,l),a[b].setAttribute(o,q)}function e(a){return b.querySelectorAll("["+n+'="'+a+'"]')}function f(a){for(j=a.target;j&&!j.getAttribute(n);)if(j=j.parentNode,!j)return;k=j.getAttribute(o)===p?q:p,j.setAttribute(o,k)}var g,h,i,j,k,l="click",m="hover",n="data-mfb-toggle",o="data-mfb-state",p="open",q="closed",r="mfb-component__button--main";a.Modernizr&&Modernizr.touch&&(h=e(m),d(h)),g=e(l),c(g,"click")}(window,document)

var ripple=function(){function rippleStart(e){rippleContainer=getRippleContainer(e.target),("0"==rippleContainer.getAttribute("animating")||!rippleContainer.hasAttribute("animating"))&&e.target.className.search(/ripple|button/g)>-1&&(rippleContainer.setAttribute("animating","1"),offsetX="number"==typeof e.offsetX?e.offsetX:e.touches[0].clientX-e.target.getBoundingClientRect().left,offsetY="number"==typeof e.offsetY?e.offsetY:e.touches[0].clientY-e.target.getBoundingClientRect().top,fullCoverRadius=Math.max(Math.sqrt(Math.pow(offsetX,2)+Math.pow(offsetY,2)),Math.sqrt(Math.pow(e.target.clientWidth-offsetX,2)+Math.pow(e.target.clientHeight-offsetY,2)),Math.sqrt(Math.pow(offsetX,2)+Math.pow(e.target.clientHeight-offsetY,2)),Math.sqrt(Math.pow(offsetY,2)+Math.pow(e.target.clientWidth-offsetX,2))),expandTime=e.target.getAttribute("ripple-press-expand-time")||3,rippleContainer.style.transition="transform "+expandTime+"s ease-out, box-shadow 0.1s linear",rippleContainer.style.background=e.target.getAttribute("ripple-color")||"white",rippleContainer.style.opacity=e.target.getAttribute("ripple-opacity")||"0.6",rippleContainer.style.boxShadow=e.target.getAttribute("ripple-shadow")||"none",rippleContainer.style.top=offsetY+"px",rippleContainer.style.left=offsetX+"px",rippleContainer.style.transform="translate(-50%, -50%) scale("+fullCoverRadius/100+")")} function rippleEnd(e){rippleContainer=getRippleContainer(e.target),"1"==rippleContainer.getAttribute("animating")&&(rippleContainer.setAttribute("animating","2"),background=window.getComputedStyle(rippleContainer,null).getPropertyValue("background"),destinationRadius=e.target.clientWidth+e.target.clientHeight,rippleContainer.style.transition="none",expandTime=e.target.getAttribute("ripple-release-expand-time")||.4,rippleContainer.style.transition="transform "+expandTime+"s linear, background "+expandTime+"s linear, opacity "+expandTime+"s ease-in-out",rippleContainer.style.transform="translate(-50%, -50%) scale("+destinationRadius/100+")",rippleContainer.style.background="radial-gradient(transparent 10%, "+background+" 40%)",rippleContainer.style.opacity="0",e.target.dispatchEvent(new CustomEvent("ripple-button-click",{target:e.target})),eval(e.target.getAttribute("onrippleclick")))} function rippleRetrieve(e){rippleContainer=getRippleContainer(e.target),"translate(-50%, -50%) scale(0)"==rippleContainer.style.transform&&rippleContainer.setAttribute("animating","0"),"1"==rippleContainer.getAttribute("animating")&&(rippleContainer.setAttribute("animating","3"),collapseTime=e.target.getAttribute("ripple-leave-collapse-time")||.4,rippleContainer.style.transition="transform "+collapseTime+"s linear, box-shadow "+collapseTime+"s linear",rippleContainer.style.boxShadow="none",rippleContainer.style.transform="translate(-50%, -50%) scale(0)")} function getRippleContainer(e){for(childs=e.childNodes,ii=0;ii<childs.length;ii++)try{if(childs[ii].className.indexOf("rippleContainer")>-1)return childs[ii]}catch(t){} return e}var ripple={registerRipples:function(){for(rippleButtons=document.querySelectorAll(".ripple,.button"),i=0;i<rippleButtons.length;i++)rippleButtons[i].addEventListener("touchstart",function(e){rippleStart(e)},{passive:!0}),rippleButtons[i].addEventListener("touchmove",function(e){if(e.target.hasAttribute("ripple-cancel-on-move"))return void rippleRetrieve(e);try{overEl=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY).className.search(/ripple|button/g)>=0}catch(t){overEl=!1}overEl||rippleRetrieve(e)},{passive:!0}),rippleButtons[i].addEventListener("touchend",function(e){rippleEnd(e)},{passive:!0}),rippleButtons[i].addEventListener("mousedown",function(e){rippleStart(e)},{passive:!0}),rippleButtons[i].addEventListener("mouseup",function(e){rippleEnd(e)},{passive:!0}),rippleButtons[i].addEventListener("mousemove",function(e){!e.target.hasAttribute("ripple-cancel-on-move")||0==e.movementX&&0==e.movementY||rippleRetrieve(e)},{passive:!0}),rippleButtons[i].addEventListener("mouseleave",function(e){rippleRetrieve(e)},{passive:!0}),rippleButtons[i].addEventListener("transitionend",function(e){("2"==e.target.getAttribute("animating")||"3"==e.target.getAttribute("animating"))&&(e.target.style.transition="none",e.target.style.transform="translate(-50%, -50%) scale(0)",e.target.style.boxShadow="none",e.target.setAttribute("animating","0"))},{passive:!0}),getRippleContainer(rippleButtons[i])==rippleButtons[i]&&(rippleButtons[i].innerHTML+='<div class="rippleContainer"></div>')},ripple:function(t){t.className.search(/ripple|button/g)<0||(rect=t.getBoundingClientRect(),e={target:t,offsetX:rect.width/2,offsetY:rect.height/2},rippleStart(e),rippleEnd(e))}};return ripple}();

$(document).on("pageinit", function() {
  ripple.registerRipples();
});

$('div[id*=area]').hide();

$('.mfb-component__button--child').click(function() {
  $('.mfb-component--br').attr('data-mfb-state', 'close');
});

$('#search').css({
  'overflow': 'auto',
  'height': `${window.innerHeight - 80}px`
});

$('#main_input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    let words = ['approxrati', 'abs', 'sqrt', 'mod', 'pfactor', 'min', 'max', 'floor', 'ceil', 'fact', 'dfactorial', 'log', 'log10', 'ln', 'nCr', 'nPr', 'round', 'divisors', 'sign', 'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'sec', 'csc', 'cot', 'asec', 'acsc', 'acot', 'cosh', 'sinh', 'tanh', 'sech', 'csch', 'coth', 'acosh', 'asinh', 'atanh', 'asech', 'acsch', 'acoth', 'Si', 'Ci', 'Ei', 'Shi', 'Chi', 'rect', 'step', 'sinc', 'tri', 'erf', 'gamma', 'beta', 'zeta', 'bernoulliN', 'bell', 'stirling1', 'stirling2', 'catalan', 'eulerN'];
    callback($.map(words, word => word.indexOf(term) === 0 ? word : null));
  },
  replace(word) {
    return `${word}()`;
  }
}]);

var core = nerdamer.getCore();
var _ = core.PARSER;
var Vector = core.Vector;
var Symbol = core.Symbol;
var Math2 = core.Math2;

function checkFrac(str, option) {
  let check_arr = str.split(/\\frac{(\d+)}{(\d+)}/);
  for (let i = 0; i < check_arr.length; i++) {
    if (!isNaN(check_arr[i])) {
      if (parseFloat(check_arr[i]) > 50) {
        return true
      }
    } else {
      if (option) {
        return true
      }
    }
  }
  return false
}

function divisors(num) {
  let divisors = new Vector();
  num = num > 0 ? num : -num
  for (let i = 1; i <= num; i++) {
    if (i) {
      if (num % i === 0) {
        divisors.elements.push(new Symbol(i))
      }
    }
  }
  return divisors
}

function primeFactor(num) {
  let ifactors = Math2.ifactor(num);
  let array = new Vector();
  for (let i in ifactors) {
    for (let j = 1; j <= +ifactors[i]; j++) {
      array.elements.push(new Symbol(i))
    }
  }
  return array
}

function approxrati(a, decimal) {
  let decimalBeforeRepeatLength = 2;
  let power1 = 10 ** decimal.toString().length;
  let num = parseFloat(a.toString() + '.' + decimal.toString());
  let power2 = 10 ** decimalBeforeRepeatLength;
  let finalPower = power1 - power2;
  let decimal1 = num * power1;
  let decimal2 = parseInt(num * power2, 10);
  decimal2 = Math.floor(num * power2);
  let finalDecimal = decimal1 - decimal2;
  return _.parse(`${finalDecimal}/${finalPower}`)
}

function binom(n, k) {
  return Math2.factorial(n) / (Math2.factorial(k) * Math2.factorial(n - k))
}

function gamma(x) {
  let d = Number(x.multiplier.den);
  let n = Number(x.multiplier.num);
  let q = (n - 1) / d;
  if (d === 1) {
    return _.parse(Math2.factorial(x - 1));
  }
  if (d === 2) {
    if (q > 0) {
      return _.parse(`sqrt(pi)*(${Math2.dfactorial(2*q - 1)}/2^${q})`);
    } else {
      q = -q;
      return _.parse(`sqrt(pi)*(-1)^${q}*(2^${q}/${Math2.dfactorial(2*q - 1)})`);
    }
  }
  if (d > 2) {
    return _.parse(Math2.gamma(n / d));
  }
}

function beta(x, y) {
  return _.parse(nerdamer(`(gamma(${x})*gamma(${y}))/gamma(${x}+${y})`))
}

function worpitzky(n, k) {
  let W = '';
  for (let i = 0; i <= k; i++) {
    W += `(-1)^(${i + k})*(${i + 1})^${n}*nCr(${k},${i})+`
  }
  return nerdamer(W.replace(/\+$/, '')).toString()
}

function bernoulliN(n) {
  let B = '';
  for (let i = 0; i <= n; i++) {
    B += `(-1)^${i}*${worpitzky(n, i)}/${i + 1}+`
  }
  return _.parse(nerdamer(B.replace(/\+$/, '')))
}

function approx_zeta(x) {
  let sum2 = 0;
  for (let i = 0; i < 100; i++) {
    let sum1 = 0;
    for (let k = 0; k < i + 1; k++) {
      sum1 += ((-1) ** k) * binom(i, k) * ((k + 1) ** (-x))
    }
    sum2 += sum1 / (2 ** (i + 1))
  }
  return sum2 / (1 - 2 ** (1 - x))
}

function zeta(x) {
  if (x.isInteger()) {
    let xNum = Number(x);
    if (xNum >= 0) {
      if (xNum % 2) {
        if (xNum === 1) {
          return Symbol.infinity()
        } else {
          return _.parse(approx_zeta(xNum))
        }
      } else {
        let n = xNum / 2;
        return _.parse(nerdamer(`(-1)^${n + 1}*(bernoulliN(${xNum})*(2*pi)^(${xNum}))/(2*${Math2.factorial(xNum)})`))
      }
    } else {
      if (xNum % 2) {
        let n = -xNum;
        return _.parse(nerdamer(`(-1)^${n}*(bernoulliN(${n + 1})/${n + 1})`))
      } else {
        return _.parse('0')
      }
    }
  } else {
    return _.parse(approx_zeta(Number(x.multiplier.num) / Number(x.multiplier.den)))
  }
}

function ystirling1(n, k) {
  if (n === 0 && k === 0) {
    return 1
  } else {
    if ((n > 0 && k === 0) || (n === 0 && k > 0) || (k > n)) {
      return 0
    } else {
      return ystirling1(n - 1, k - 1) + (n - 1) * ystirling1(n - 1, k)
    }
  }
}

function stirling1(n, k) {
  return _.parse(ystirling1(n, k));
}

function stirling2(n, k) {
  let sum = 0;
  for (let j = 0; j <= k; j++) {
    sum += ((-1) ** (k - j)) * binom(k, j) * (j ** n)
  }
  return _.parse(sum / Math2.factorial(k))
}

function bell(n) {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += stirling2(n, i);
  }
  return _.parse(sum)
}

function catalan(n) {
  return _.parse(binom(2 * n, n) / (n + 1));
}

function eulerN(n) {
  if (n % 2) {
    return new Symbol(0)
  } else {
    n /= 2;
    let e = '';
    for (let k = 1; k <= 2 * n + 1; k++) {
      for (let j = 0; j <= k; j++) {
        e += `${binom(k, j) * ((-1) ** j) * ((k - 2 * j) ** (2 * n + 1))}/(i^${k}*(${(2 ** k) * k}))+`
      }
    }
    console.log(e);
    return _.parse(`i*(${e.replace(/\+$/, '')})`)
  }
}

nerdamer.register([{
  name: 'divisors',
  numargs: 1,
  visible: !0,
  build: function() {
    return divisors
  }
}, {
  name: 'primeFactor',
  numargs: 1,
  visible: !0,
  build: function() {
    return primeFactor
  }
}, {
  name: 'approxrati',
  numargs: 2,
  visible: !0,
  build: function() {
    return approxrati
  }
}, {
  name: 'gamma',
  numargs: 1,
  visible: !0,
  build: function() {
    return gamma
  }
}, {
  name: 'beta',
  numargs: 2,
  visible: !0,
  build: function() {
    return beta
  }
}, {
  name: 'zeta',
  numargs: 1,
  visible: !0,
  build: function() {
    return zeta
  }
}, {
  name: 'bernoulliN',
  numargs: 1,
  visible: !0,
  build: function() {
    return bell
  }
}, {
  name: 'eulerN',
  numargs: 1,
  visible: !0,
  build: function() {
    return eulerN
  }
}, {
  name: 'bell',
  numargs: 1,
  visible: !0,
  build: function() {
    return bell
  }
}, {
  name: 'stirling1',
  numargs: 2,
  visible: !0,
  build: function() {
    return stirling1
  }
}, {
  name: 'stirling2',
  numargs: 2,
  visible: !0,
  build: function() {
    return stirling2
  }
}, {
  name: 'catalan',
  numargs: 1,
  visible: !0,
  build: function() {
    return catalan
  }
}]);

function frac2Dec(n, d) {
  let pFS = nerdamer(`primeFactor(${d})`).toString().replace(/\[|\]/g, '').split(',').map(parseFloat);
  for (var i = 0; i < pFS.length; i++) {
    if (pFS[i] !== 2 && pFS[i] !== 5) {
      let output = [];
      let ns = [];
      for (var i = 0; i < 20; i++) {
        let temp2 = parseInt(n / d);
        if (ns[n] === undefined) {
          ns[n] = i
        } else {
          return `${output.slice(0, 1).join('')}.${output.slice(1, ns[n]).join('')}(${output.slice(ns[n]).join('')})`
        }
        output.push(temp2);
        var n = n % d;
        n += '0'
      }
      return output
    }
  }
  return '0'
}

main_input.onfocus = function() {
  if (this.value.includes('()')) {
    this.selectionStart = this.selectionEnd = this.value.indexOf('()') + 1
  }
}

main_input.oninput = function() {
  let Input = this.value;
  let option = main_select.value;

  Input = option === 'D' ? Input.replace(/([^a])(cos|sin|tan|sec|csc|cot|cosh|sinh|tanh|sech|csch|coth)\(([^\)]*)\)/g, '$1$2((pi/180)*$3)').replace(/(acos|asin|atan|asec|acsc|acot|acosh|asinh|atanh|asech|acsch|acoth)/g, '(180/pi)*$1') : option === 'G' ? Input.replace(/([^a])(cos|sin|tan|sec|csc|cot|cosh|sinh|tanh|sech|csch|coth)\(([^\)]*)\)/g, '$1$2((pi/200)*$3)').replace(/(acos|asin|atan|asec|acsc|acot|acosh|asinh|atanh|asech|acsch|acoth)/g, '(200/pi)*$1') : Input;

  let I = nerdamer(Input);
  let eq = I.toTeX().replace(/\[|\]/g, '');
  let approx = I.evaluate().text();

  if (Input.includes('pfactor')) {
    eq = eq.replace(/\\cdot/g, '\\times').replace(/\\left\(|\\right\)/g, '')
  }

  if (!isNaN(eq)) {
    eq = eq.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&\\:');
  }

  if (/e\+|e-/.test(eq)) {
    eq = `${eq.replace(/e\+|e/, '\\times10^{')}}`;
  }

  if (approx.includes('.') && !/e\+|e-/.test(approx) && !checkFrac(eq, 0)) {

    approx_area.style.display = '';
    main_approx_output.innerHTML = katex.renderToString(approx.replace(/\*/g, ''), {
      displayMode: !0
    })

    if (!checkFrac(eq, 1)) {

      let frac = eq.replace('}{', '/').replace(/\\frac{|}/g, '').split('/');
      let tu = +frac[0];
      let mau = +frac[1];
      if (tu > mau) {
        mix_area.style.display = '';
        mix_output.innerHTML = katex.renderToString(`${(tu - (tu % mau)) / mau}\\frac{${tu % mau}}{${mau}}`, {
          displayMode: !0
        })
      } else {
        mix_area.style.display = 'none'
      }

      let decimal = frac2Dec(tu, mau);
      if (decimal !== '0') {
        if (decimal.includes('-')) {
          decimal = `-${decimal.replace(/-/g, '')}`
        }
        repeat_area.style.display = '';
        repeat_output.innerHTML = katex.renderToString(decimal, {
          displayMode: !0
        })
      } else {
        repeat_area.style.display = 'none'
      }
    } else {
      repeat_area.style.display = mix_area.style.display = 'none'
    }
  } else {
    repeat_area.style.display = mix_area.style.display = approx_area.style.display = 'none'
  }

  if (/floor|ceil|!|fact|dfactorial/.test(Input) && !Input.includes('pfactor') || checkFrac(eq, 0)) {
    eq = approx;
  }

  main_output.innerHTML = katex.renderToString(eq.replace(/\\cdot/g, ''), {
    displayMode: !0
  });
}