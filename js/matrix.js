if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Ma trận';
  let lb = document.getElementsByTagName('label');
  for (let i = 1; i < 9; i++) {
    lb[i].innerHTML = i % 2 ? 'Số dòng' : 'Số cột';
  }
  lb[9].innerHTML = 'Biểu thức';
  for (let i = 0; i < 4; i++) {
    select.options[i].text = 'Ma trận ' + ASCII[i];
  }
  select.options[4].text = 'Tính toán';
}

function hilbert(n) {
  let m = new Matrix();
  for (let i = 0; i < n; i++) {
    m.elements.push([]);
    for (let j = 0; j < n; j++) {
      m.set(i, j, new Symbol(1 / (i + j + 1)));
    }
  }
  return m;
}

function adjunct(m) {
  return _.multiply(MATH.determinant(m), MATH.invert(m));
}

nerdamer.register([{
  name: 'hilbert',
  numargs: 1,
  visible: true,
  build: function() {
    return hilbert;
  }
}, {
  name: 'adjunct',
  numargs: 1,
  visible: true,
  build: function() {
    return adjunct;
  }
}]);

$('#input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    callback($.map(['determinant', 'invert', 'imatrix', 'transpose', 'matA', 'matB', 'matC', 'hilbert', 'adjunct'], word => word.includes(term) ? word : null));
  },
  replace(word) {
    return ASCII.includes(word.replace('mat', '')) ? word : [`${word}(`, ')'];
  }
}]);

for (let i = 0; i < 4; i++) {
  $(`#mat${ASCII[i]}_input`).html(`<input type="text" data-role="none" class="input" id="${ASCII[i]}00" />`);
}

$('select').on('change', function() {
  let _ID = $(this).attr('id');
  if (_ID !== 'select') {
    let __ii = _ID.replace(/mat|_|cols|rows/g, '');
    let row = parseInt($(`#mat${__ii}_rows`).val());
    let col = parseInt($(`#mat${__ii}_cols`).val());
    let _o__ = '';
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        _o__ += `<input type="text" data-role="none" class="input" id="${__ii}${i}${j}" /> &nbsp;`;
      }
      if (i < row - 1) {
        _o__ += '<br />';
      }
    }
    $(`#mat${__ii}_input`).html(_o__);
  } else {
    $('.content').addClass('hide');
    $(`#${$(this).val()}`).removeClass('hide');
  }
});

$('#cal').click(function() {
  nerdamer.clearVars();
  let mat = {
    A: 'matrix(',
    B: 'matrix(',
    C: 'matrix(',
    D: 'matrix('
  };
  let IV = input.value;
  for (let c = 0; c < 4; c++) {
    if (IV.includes(ASCII[c])) {
      let col = $(`#mat${ASCII[c]}_cols`).val();
      let row = $(`#mat${ASCII[c]}_rows`).val();
      for (let i = 0; i < row; i++) {
        mat[ASCII[c]] += '[';
        for (let j = 0; j < col; j++) {
          mat[ASCII[c]] += $(`#${ASCII[c]}${i}${j}`).val();
          if (j < col - 1) {
            mat[ASCII[c]] += ',';
          }
        }
        mat[ASCII[c]] += ']';
        if (i < row - 1) {
          mat[ASCII[c]] += ',';
        }
      }
      nerdamer.setVar(`mat${ASCII[c]}`, mat[ASCII[c]] + ')');
    }
  }
  output.innerHTML = katex.renderToString(nerdamer(IV).toTeX(), {
    displayMode: true
  });
})