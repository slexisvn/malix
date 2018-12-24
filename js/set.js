if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Tập hợp';
  select.options[0].text = 'Nhập các tập hợp';
  select.options[1].text = 'Nhập các khoảng';
  select.options[2].text = 'Tính toán';
  let lb = document.getElementsByTagName('label');
  for (let i = 1; i < 5; i++) {
    lb[i].innerHTML = `Tập hợp ${ASCII[i - 1]}`;
    lb[i + 4].innerHTML = `Khoảng ${ASCII[i - 1]}`;
  }
  lb[9].innerHTML = 'Biểu thức';
}

$('#input_interval_area, #main_area').hide();

$('#select').on('change', function() {
  $('.content').hide();
  $(`#${$(this).val()}`).show()
});

$('#input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    callback($.map(['itvA', 'itvB', 'itvC', 'itvD', 'setA', 'setB', 'setC', 'setD', 'unionS', 'intersecS', 'complS', 'differS', 'unionI', 'intersecI', 'complI', 'differI', 'combK', ], word => word.includes(term) ? word : null))
  },
  replace(word) {
    return word.includes('set') || word.includes('itv') ? word : `${word}()`
  }
}]);

function k_cbnts(set, k) {
  set = [...new Set(set)];
  let i, j, combs, head, tailcombs;
  if (k > set.length || k <= 0) {
    return [];
  }

  if (k == set.length) {
    return [set];
  }

  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  combs = [];

  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i + 1);
    tailcombs = k_cbnts(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push([...head, ...tailcombs[j]]);
    }
  }
  return combs;
}

function combK(set_obj, k_str) {
  let set = JSON.parse(set_obj.toString());
  let k = parseInt(k_str);
  return _.parse(JSON.stringify(k_cbnts(set, k)))
}

function _s(a) {
  return a.toString().replace(/\[|\]/g, '').split(',');
}

function unionS(a, b) {
  return _.parse(`[${[...new Set([..._s(a), ..._s(b)])].toString()}]`);
}

function intersecS(a, b) {
  let A = _s(a);
  let B = new Set(_s(b));
  return _.parse(`[${[...new Set(A.filter(x => B.has(x)))].toString()}]`)
}

function differS(a, b) {
  let A = _s(a);
  let B = new Set(_s(b));
  return _.parse(`[${[...new Set(A.filter(x => !B.has(x)))].toString()}]`)
}

function complS(a, b) {
  return _.parse(`unionS(differS(${a}, ${b}), differS(${b}, ${a}))`);
}

function _r(str) {
  return str.replace('[', '\\{').replace(']', '\\}');
}

function _r_(str) {
  return str.replace(', u,', ']\\cup[').replace(/\[/g, '(').replace(/\]/g, ')').replace(/,/g, ';').replace(' \\infty', '+\\infty');
}

function unionI(a, b) {
  let A = _s(a).map(parseFloat);
  let B = _s(b).map(parseFloat);
  if (A[1] >= B[0]) {
    if (A[0] <= B[0]) {
      return _.parse(`[${A[1] <= B[1] ? `${A[0]},${B[1]}` : `${A[0]},${A[1]}`}]`)
    }

    if (A[0] > B[0]) {
      return _.parse(`[${A[1] <= B[1] ? `${B[0]},${B[1]}` : `${B[0]},${A[1]}`}]`)
    }
  } else {
    return _.parse(`[${A[0]},${A[1]},u,${B[0]},${B[1]}]`)
  }
}

function intersecI(a, b) {
  let A = _s(a).map(parseFloat);
  let B = _s(b).map(parseFloat);
  if (A[1] >= B[0]) {
    if (A[0] <= B[0]) {
      return _.parse(`[${A[1] <= B[1] ? `${B[0]},${A[1]}` : `${B[0]},${B[1]}`}]`)
    }

    if (A[0] > B[0]) {
      return _.parse(`[${A[1] <= B[1] ? `${A[0]},${A[1]}` : `${A[0]},${B[1]}`}]`)
    }
  } else {
    return _.parse('[]');
  }
}

function differI(a, b) {
  let A = _s(a).map(parseFloat);
  let B = _s(b).map(parseFloat);
  if (A[1] >= B[0]) {
    if (A[0] <= B[0]) {
      return _.parse(`[${A[1] <= B[1] ? `${A[0]},${B[0]}` : `${A[0]},${B[0]},u,${B[1]},${A[1]}`}]`)
    }

    if (A[0] > B[0]) {
      return _.parse(`[${A[1] <= B[1] ? '' : `${B[1]},${A[1]}`}]`)
    }
  } else {
    return _.parse(`[${A[0]},${A[1]}]`)
  }
}

function complI(a, b) {
  return _.parse(`unionI(differI(${a}, ${b}), differI(${b}, ${a}))`);
}

function _r__1(id) {
  return document.getElementById(id).value.replace(/ /g, ', ');
}

function _r__2(id) {
  return document.getElementById(id).value.replace('oo', 'Infinity');
}

nerdamer.register([{
  name: 'unionS',
  numargs: 2,
  visible: !0,
  build: function() {
    return unionS
  }
}, {
  name: 'intersecS',
  numargs: 2,
  visible: !0,
  build: function() {
    return intersecS
  }
}, {
  name: 'differS',
  numargs: 2,
  visible: !0,
  build: function() {
    return differS
  }
}, {
  name: 'complS',
  numargs: 2,
  visible: !0,
  build: function() {
    return complS
  }
}, {
  name: 'unionI',
  numargs: 2,
  visible: !0,
  build: function() {
    return unionI
  }
}, {
  name: 'intersecI',
  numargs: 2,
  visible: !0,
  build: function() {
    return intersecI
  }
}, {
  name: 'differI',
  numargs: 2,
  visible: !0,
  build: function() {
    return differI
  }
}, {
  name: 'complI',
  numargs: 2,
  visible: !0,
  build: function() {
    return complI
  }
}, {
  name: 'combK',
  numargs: 2,
  visible: !0,
  build: function() {
    return combK
  }
}]);

cal.onclick = function() {
  let IV = input.value;
  nerdamer.clearVars();
  if (IV.includes('set')) {
    for (let i = 0; i < 4; i++) {
      if (IV.includes(ASCII[i])) {
        nerdamer.setVar(`set${ASCII[i]}`, `[${_r__1(`i${i}`)}]`);
      }
    }
  }

  if (IV.includes('itv')) {
    nerdamer.setVar('R', '[-Infinity, Infinity]');
    for (let i = 0; i < 4; i++) {
      if (IV.includes(ASCII[i])) {
        nerdamer.setVar(`itv${ASCII[i]}`, `[${_r__2(`i${i}1`)}, ${_r__2(`i${i}2`)}]`);
      }
    }
  }
  let result;
  if (IV.includes('combK')) {
    let arr = JSON.parse(nerdamer(IV).toString());
    result = '\\begin{array}{l}';
    for (let i = 0, l = arr.length; i < l; i++) {
      result += _r(JSON.stringify(arr[i])) + (i < l - 1 ? '\\\\' : '');
    }
    result += '\\end{array}';
  } else {
    result = nerdamer(IV).toTeX();
    if (IV.includes('set')) {
      result = result === '[]' ? '\\varnothing' : _r(result);
    }

    if (IV.includes('itv')) {
      result = result === '[-\\infty, \\infty]' ? '\\mathbb R' : result === '[]' || result.includes('NaN') ? '\\varnothing' : _r_(result)
    }
  }

  output.innerHTML = katex.renderToString(result, {
    displayMode: !0
  })
}