if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Ma trận';
  let lb = document.getElementsByTagName('label');
  for (let i = 1; i < 9; i++) {
    lb[i].innerHTML = i % 2 ? 'Số dòng' : 'Số cột';
  }
  lb[9].innerHTML = 'Biểu thức';
  select.options[0].text = 'Ma trận A';
  select.options[1].text = 'Ma trận B';
  select.options[2].text = 'Ma trận C';
  select.options[3].text = 'Ma trận D';
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

$('.hide').hide();

$('#select').on('change', function() {
  $('.content').hide();
  $(`#${$(this).val()}`).show();
});

$('#input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    let words = ['determinant', 'invert', 'imatrix', 'transpose', 'matA', 'matB', 'matC', 'hilbert', 'adjunct'];
    callback($.map(words, word => word.indexOf(term) === 0 ? word : null));
  },
  replace(word) {
    return word === 'matA' || word === 'matB' || word === 'matC' ? word : `${word}()`;
  }
}]);

var matA, matB, matC, matD;
//init
matA_input.innerHTML = `<input type="text" data-role="none" class="input" id="a00" />`;
matB_input.innerHTML = `<input type="text" data-role="none" class="input" id="b00" />`;
matC_input.innerHTML = `<input type="text" data-role="none" class="input" id="c00" />`;
matD_input.innerHTML = `<input type="text" data-role="none" class="input" id="d00" />`;

$('#matA_rows, #matA_cols').on('change', function() {
  matA = '';
  let row = $('#matA_rows').val();
  let col = $('#matA_cols').val();
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matA += `<input type="text" data-role="none" class="input" id="a${i}${j}" /> &nbsp;`;
    }
    if (i < row - 1) {
      matA += '<br />';
    }
  }
  matA_input.innerHTML = matA;
});

$('#matB_rows, #matB_cols').on('change', function() {
  matB = '';
  let row = $('#matB_rows').val();
  let col = $('#matB_cols').val();
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matB += `<input type="text" data-role="none" class="input" id="b${i}${j}" /> &nbsp;`;
    }
    if (i < row - 1) {
      matB += '<br />';
    }
  }
  matB_input.innerHTML = matB;
});

$('#matC_rows, #matC_cols').on('change', function() {
  matC = '';
  let row = $('#matC_rows').val();
  let col = $('#matC_cols').val();
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matC += `<input type="text" data-role="none" class="input" id="c${i}${j}" /> &nbsp;`;
    }
    if (i < row - 1) {
      matC += '<br />';
    }
  }
  matC_input.innerHTML = matC;
});

$('#matD_rows, #matD_cols').on('change', function() {
  matD = '';
  let row = $('#matD_rows').val();
  let col = $('#matD_cols').val();
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matD += `<input type="text" data-role="none" class="input" id="d${i}${j}" /> &nbsp;`;
    }
    if (i < row - 1) {
      matD += '<br />';
    }
  }
  matD_input.innerHTML = matD;
});

cal.onclick = function() {
  matA = matB = matC = matD = 'matrix(';
  for (let i = 0; i < matA_rows.value; i++) {
    matA += '[';
    for (let j = 0; j < matA_cols.value; j++) {
      matA += document.getElementById(`a${i}${j}`).value;
      if (j < matA_cols.value - 1) {
        matA += ',';
      }
    }
    matA += ']';
    if (i < matA_rows.value - 1) {
      matA += ',';
    }
  }
  matA += ')';

  for (let i = 0; i < matB_rows.value; i++) {
    matB += '[';
    for (let j = 0; j < matB_cols.value; j++) {
      matB += document.getElementById(`b${i}${j}`).value;
      if (j < matB_cols.value - 1) {
        matB += ',';
      }
    }
    matB += ']';
    if (i < matB_rows.value - 1)
      matB += ',';
  }
  matB += ')';

  for (let i = 0; i < matC_rows.value; i++) {
    matC += '[';
    for (let j = 0; j < matC_cols.value; j++) {
      matC += document.getElementById(`c${i}${j}`).value;
      if (j < matC_cols.value - 1) {
        matC += ',';
      }
    }
    matC += ']';
    if (i < matC_rows.value - 1)
      matC += ',';
  }
  matC += ')';

  for (let i = 0; i < matD_rows.value; i++) {
    matD += '[';
    for (let j = 0; j < matD_cols.value; j++) {
      matD += document.getElementById(`d${i}${j}`).value;
      if (j < matD_cols.value - 1) {
        matD += ',';
      }
    }
    matD += ']';
    if (i < matD_rows.value - 1)
      matD += ',';
  }
  matD += ')';

  nerdamer.clearVars();
  nerdamer.setVar('matA', matA);
  nerdamer.setVar('matB', matB);
  nerdamer.setVar('matC', matC);
  nerdamer.setVar('matD', matD);

  output.innerHTML = katex.renderToString(nerdamer(input.value).toTeX().replace(/,$|\\cdot(?= \\| [a-z])/g, ''), {
    displayMode: true
  });
}