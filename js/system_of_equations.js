if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Hệ phương trình tuyến tính';
  document.getElementsByTagName('label')[1].innerHTML = 'Số ẩn';
}

function create() {
  let numOfUnknowns = '';
  let option = select.value;
  for (let i = 0; i < option; i++) {
    for (let j = 0; j <= option; j++)
      numOfUnknowns += `<input type="text" data-role="none" class="input" id="a${i}${j}" /> &nbsp;`;
    if (i < option - 1)
      numOfUnknowns += '<br>';
  }
  input.innerHTML = numOfUnknowns;
}

create(); //init

select.onchange = function() {
  create();
}

cal.onclick = function() {
  option = select.value;
  let matA = 'matrix(';
  let matB = 'matrix(';
  for (let i = 0; i < option; i++) {
    matA += '[';
    for (let j = 0; j < option; j++) {
      matA += document.getElementById(`a${i}${j}`).value;
      if (j < option - 1) {
        matA += ',';
      }
    }
    matA += ']';
    if (i < option - 1) {
      matA += ',';
    }
  }
  matA += ')';
  for (let i = 0; i < option; i++) {
    matB += `[${document.getElementById(`a${i}${option}`).value}]`;
    if (i < option - 1)
      matB += ',';
  }
  matB += ')';
  let result = nerdamer(`invert(${matA})*${matB}`).toTeX().replace(/bmatrix/g, 'cases').replace('cases}', 'cases} x_1 = ');
  let arr = result.split('\\cr');
  result = arr[0];

  for (let i = 1; i < option; i++) {
    result += `\\cr x_${i + 1}=${arr[i]}`;
  }
  output.innerHTML = katex.renderToString(result.replace(/,$|\\cdot(?= \\| [a-z])/g, ''), {
    displayMode: true
  });
}