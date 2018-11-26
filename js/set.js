if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Tập hợp';
  select.options[0].text = 'Nhập các tập hợp';
  select.options[1].text = 'Nhập các khoảng';
  select.options[2].text = 'Tính toán';
  let lb = document.getElementsByTagName('label');
  let ASCII = ['A', 'B', 'C', 'D']
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
    callback($.map(['itvA', 'itvB', 'itvC', 'itvD', 'setA', 'setB', 'setC', 'setD', 'union', 'intersection', 'complement', 'difference', 'k_combinations'], word => word.indexOf(term) === 0 ? word : null))
  },
  replace(word) {
    return word.includes('set') || word.includes('itv') ? word : `${word}()`
  }
}]);

function k_cbnts(set, k) {
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
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

function k_combinations(set_obj, k_str) {
  let set = JSON.parse(set_obj.toString());
  let k = parseInt(k_str);
  return _.parse(JSON.stringify(k_cbnts(set, k)))
}

function range(start, end) {
  if (start !== '') {
    let s = parseFloat(start.replace('oo', '50'));
    let e = parseFloat(end.replace('oo', '50'));
    return ([...Array(1 + e - s).keys()].map(v => s + v)).toString()
  }
  return
}

function _s(a) {
  return a.toString().replace(/\[|\]/g, '').split(',');
}

function union(a, b) {
  return _.parse(`[${[...new Set([..._s(a), ..._s(b)])].toString()}]`);
}

function intersection(a, b) {
  let A = _s(a);
  let B = new Set(_s(b));
  return _.parse(`[${[...new Set(A.filter(x => B.has(x)))].toString()}]`)
}

function difference(a, b) {
  let A = _s(a);
  let B = new Set(_s(b));
  return _.parse(`[${[...new Set(A.filter(x => !B.has(x)))].toString()}]`)
}

function complement(a, b) {
  return _.parse(`union(difference(${a}, ${b}), difference(${b}, ${a}))`);
}

function _r(str) {
  return str.replace('[', '\\{').replace(']', '\\}');
}

nerdamer.register([{
  name: 'union',
  numargs: 2,
  visible: !0,
  build: function() {
    return union
  }
}, {
  name: 'intersection',
  numargs: 2,
  visible: !0,
  build: function() {
    return intersection
  }
}, {
  name: 'difference',
  numargs: 2,
  visible: !0,
  build: function() {
    return difference
  }
}, {
  name: 'complement',
  numargs: 2,
  visible: !0,
  build: function() {
    return complement
  }
}, {
  name: 'k_combinations',
  numargs: 2,
  visible: !0,
  build: function() {
    return k_combinations
  }
}]);

cal.onclick = function() {
  let Input = input.value;
  nerdamer.clearVars();
  if (Input.includes('set')) {
    nerdamer.setVar('setA', `[${a0.value.replace(/ /g, ', ')}]`);
    nerdamer.setVar('setB', `[${b0.value.replace(/ /g, ', ')}]`);
    nerdamer.setVar('setC', `[${c0.value.replace(/ /g, ', ')}]`);
    nerdamer.setVar('setD', `[${d0.value.replace(/ /g, ', ')}]`);
  }

  if (Input.includes('itv')) {
    nerdamer.setVar('itvA', `[${range(i01.value, i02.value)}]`);
    nerdamer.setVar('itvB', `[${range(i11.value, i12.value)}]`);
    nerdamer.setVar('itvC', `[${range(i21.value, i22.value)}]`);
    nerdamer.setVar('itvD', `[${range(i31.value, i32.value)}]`);
  }
  let result = nerdamer(`sort(${Input})`).toString();
  if (Input.includes('k_combinations')) {
    let arr = JSON.parse(result);
    result = '\\begin{array}{l}';
    let l = arr.length;
    for (let i = 0; i < l; i++) {
      result += _r(JSON.stringify(arr[i])) + (i < l - 1 ? '\\\\' : '');
    }
    result += '\\end{array}';
  } else {
    if (Input.includes('set')) {
      result = result === '[]' ? '\\varnothing' : _r(result);
    }

    if (Input.includes('itv')) {
      if (result !== '[]') {
        let arr = JSON.parse(result);
        let s = arr[0].toString().replace('50', '\\infty');
        let e = arr[arr.length - 1].toString().replace('50', '+\\infty');
        let arr_num = [];
        arr = [];
        for (let i = 0; i < 4; i++) {
          if (document.getElementById(`i${i}0`).value === '(') {
            arr.push('k');
          }
          if (document.getElementById(`i${i}0`).value === '[') {
            arr.push('d');
          }
          if (document.getElementById(`i${i}3`).value === ')') {
            arr.push('k');
          }
          if (document.getElementById(`i${i}3`).value === ']') {
            arr.push('d');
          }
          if (document.getElementById(`i${i}1`).value !== '') {
            arr_num.push(document.getElementById(`i${i}1`).value);
            arr_num.push(document.getElementById(`i${i}2`).value);
          }
        }
        result = s === e ? '\\varnothing' : s === '-\\infty' && e === '+\\infty' ? result = '\\mathbb R' : result = `${arr[arr_num.indexOf(s)] === 'd' ? '[' : '('}${s}, ${e}${arr[arr_num.indexOf(e)] === 'd' ? ']' : ')'}`
      } else {
        result = '\\varnothing'
      }
    }
  }

  output.innerHTML = katex.renderToString(result, {
    displayMode: !0
  })
}