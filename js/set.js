if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Tập hợp';
  select.options[0].text = 'Nhập các tập hợp';
  select.options[1].text = 'Tính toán';
  let lb = document.getElementsByTagName('label');
  let ASCII = ['A', 'B', 'C', 'D']
  for (let i = 1; i < 5; i++) {
    lb[i].innerHTML = `Tập hợp ${ASCII[i - 1]}`;
  }
  lb[5].innerHTML = 'Biểu thức';
}

$('#select').on('change', function() {
  $('.content').hide();
  $(`#${$(this).val()}`).show()
});

$('#input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    let words = ['setA', 'setB', 'setC', 'setD', 'union', 'intersection', 'complement', 'difference'];
    callback($.map(words, word => word.indexOf(term) === 0 ? word : null))
  },
  replace(word) {
    return word.includes('set') ? word : `${word}()`
  }
}]);

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
}]);

cal.onclick = function() {
  nerdamer.clearVars();
  nerdamer.setVar('setA', `[${a0.value.replace(/ /g, ', ')}]`);
  nerdamer.setVar('setB', `[${b0.value.replace(/ /g, ', ')}]`);
  nerdamer.setVar('setC', `[${c0.value.replace(/ /g, ', ')}]`);
  nerdamer.setVar('setD', `[${d0.value.replace(/ /g, ', ')}]`);
  let result = nerdamer(input.value).toString();
  let o = result === '[]' ? '\\varnothing' : result.replace('[', '\\{').replace(']', '\\}');
  output.innerHTML = katex.renderToString(o, {
    displayMode: !0
  })
}

  