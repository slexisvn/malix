$(document).on('pageinit', function() {
 $('#main_input, #input').on('focus', function() {
    if ($(this).val().includes('()')) {
      $(this).setCursorPosition($(this).val().indexOf('()') + 1)
    }
  });
});

$('.mfb-component__button--child').click(function() {
  $('.mfb-component--br').attr('data-mfb-state', 'close');
});

$('#search').css({
  'overflow': 'auto',
  'height': `${$(window).innerHeight() - 80}px`
});

$('#recurring_output, #mixed_output, #main_approx_output').hide();

var LN = navigator.language.substr(0, 2);

if (LN === 'vi') {
	let _vi = ['Đổi đơn vị', 'Giải phương trình, bất phương trình', 'Hệ phương trình tuyến tính', 'Đa thức', 'Vẽ đồ thị', 'Giải tích', 'Ma trận', 'Vector', 'Phân phối', 'Thống kê', 'Dãy số', 'Khai triển lượng giác', 'Tập hợp', 'Vòng tròn lượng giác', 'Bàn tính'];
	for (let i = 0; i < 15; i++) {
		search.getElementsByTagName('a')[i].childNodes[0].nodeValue = _vi[i];
	}
	search.dataset.filterPlaceholder = 'Tìm công cụ';
	document.getElementsByClassName('title')[0].innerHTML = 'Phép tính thường';
	document.getElementsByTagName('label')[0].innerHTML = 'Biểu thức';
	document.getElementsByClassName('mfb-component__button--child')[1].href = 'pages/doc-vi.html';
}

var ASCII = ['A', 'B', 'C', 'D'];
var _W_ = ['abs', 'sqrt', 'nthroot', 'ln', 'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'sec', 'csc', 'cot', 'asec', 'acsc', 'acot', 'cosh', 'sinh', 'tanh', 'sech', 'csch', 'coth', 'acosh', 'asinh', 'atanh', 'asech', 'acsch', 'acoth'];

$('#main_input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    callback($.map([..._W_, ...['approxratio', 'log', 'log10', 'mod', 'pfactor', 'min', 'max', 'floor', 'ceil', 'fact', 'dfactorial', 'nCr', 'nPr', 'round', 'divisors', 'sign', 'Si', 'Ci', 'Ei', 'Shi', 'Chi', 'rect', 'step', 'sinc', 'tri', 'erf', 'gamma', 'beta', 'zeta', 'bernoulliN', 'bell', 'stirling1', 'stirling2', 'catalan', 'eulerN', 'arg', 'imagpart', 'realpart', 'conjugate', 'polarform', 'rectform']], word => word.includes(term) ? word : null));
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
var Matrix = core.Matrix;
var MATH = core.Utils.importFunctions();

function divisors(num) {
  let divisors = new Vector();
  num = num > 0 ? num : -num
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.elements.push(new Symbol(i))
    }
  }
  return divisors
}

function approxratio(a, decimal) {
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
  return _.parse(`(gamma(${x})*gamma(${y}))/gamma(${x}+${y})`)
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
  return _.parse(B.replace(/\+$/, ''))
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
        return _.parse(`(-1)^${n + 1}*(bernoulliN(${xNum})*(2*pi)^(${xNum}))/(2*${Math2.factorial(xNum)})`)
      }
    } else {
      if (xNum % 2) {
        let n = -xNum;
        return _.parse(`(-1)^${n}*(bernoulliN(${n + 1})/${n + 1})`)
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
    return _.parse(`i*(${e.replace(/\+$/, '')})`)
  }
}

function nCr(n, k) {
  return _.parse(binom(n, k))
}

function nPr(n, k) {
  return _.parse(Math2.factorial(n) / Math2.factorial(n - k))
}

function __exp_(str) {
  return /e\+|e-/.test(str) ? `${str.replace(/e\+|e-/g, '\\times10^{')}}` : str;
}

nerdamer.register([{
  name: 'nCr',
  numargs: 2,
  visible: !0,
  build: function() {
    return nCr
  }
}, {
  name: 'nPr',
  numargs: 2,
  visible: !0,
  build: function() {
    return nPr
  }
}, {
  name: 'divisors',
  numargs: 1,
  visible: !0,
  build: function() {
    return divisors
  }
}, {
  name: 'approxratio',
  numargs: 2,
  visible: !0,
  build: function() {
    return approxratio
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
    return bernoulliN
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



main_input.oninput = function() {
  let IV = this.value;
  let option = main_select.value;

  IV = option === 'D' ? IV.replace(/([^a])(cos|sin|tan|sec|csc|cot|cosh|sinh|tanh|sech|csch|coth)\(([^\)]*)\)/g, '$1$2((pi/180)*$3)').replace(/(acos|asin|atan|asec|acsc|acot|acosh|asinh|atanh|asech|acsch|acoth)/g, '(180/pi)*$1') : option === 'G' ? IV.replace(/([^a])(cos|sin|tan|sec|csc|cot|cosh|sinh|tanh|sech|csch|coth)\(([^\)]*)\)/g, '$1$2((pi/200)*$3)').replace(/(acos|asin|atan|asec|acsc|acot|acosh|asinh|atanh|asech|acsch|acoth)/g, '(200/pi)*$1') : IV;

  let I = nerdamer(IV).latex();
  let eq = I[1];
  let approx = I[0];
  let __ap;
  if (IV.includes('pfactor')) {
    eq = eq.replace(/\\right\)\\left\(/g, '\\times').replace(/\\left\(|\\right\)/g, '')
  }
  if (/floor|ceil|!|fact|dfactorial/.test(IV) && !IV.includes('pfactor') || eq === '') {
    eq = approx;
  }
  if (/.|i/g.test(approx) && eq !== approx) {
    main_approx_output.style.display = 'block';
    main_approx_output.innerHTML = katex.renderToString(approx.replace(/\*/g, ''), {
      displayMode: !0
    });
    if ((eq.match(/frac/g) || []).length === 1 && !/[a-z]/g.test(IV)) {
      let mixed = nerdamer(approx).text('mixed');
      if (mixed !== '') {
        __ap = 'block';
        mixed_output.innerHTML = katex.renderToString(mixed, {
          displayMode: !0
        })
      } else {
        __ap = 'none';
      }
      mixed_output.style.display = __ap;
      let recurring = nerdamer(approx).text('recurring');
      if (recurring !== '') {
        __ap = 'block';
        recurring_output.innerHTML = katex.renderToString(recurring, {
          displayMode: !0
        })
      } else {
        __ap = 'none'
      }
      recurring_output.style.display = __ap;
    }
  } else {
    recurring_output.style.display = mixed_output.style.display = main_approx_output.style.display = 'none';
  }
  if (!isNaN(eq)) {
    eq = eq.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&\\:');
  }
  main_eq_output.innerHTML = katex.renderToString(__exp_(eq.replace('Infinity', '\\infty')), {
    displayMode: !0
  });
}