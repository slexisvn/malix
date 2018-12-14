if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Hệ phương trình tuyến tính';
  document.getElementsByTagName('label')[1].innerHTML = 'Số ẩn';
}

function create() {
  let numOfUnknowns = '';
  let option = select.value;
  for (let i = 0; i < option; i++) {
    for (let j = 0; j <= option; j++) {
      numOfUnknowns += `<input type="text" data-role="none" class="input" id="a${i}${j}" /> &nbsp;`;
    }
    numOfUnknowns += i < option - 1 ? '<br>' : ''
  }
  input.innerHTML = numOfUnknowns;
}

function checkDecimal(str) {
  return parseFloat(str) % 1 ? true : false;
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
      matA += document.getElementById(`a${i}${j}`).value + (j < option - 1 ? ',' : '');
    }
    matA += ']' + (i < option - 1 ? ',' : '');
  }
  matA += ')';
  for (let i = 0; i < option; i++) {
    matB += `[${document.getElementById(`a${i}${option}`).value}]${i < option - 1 ? ',' : ''}`;
  }
  matB += ')';
  let I = nerdamer(`invert(${matA})*${matB}`).latex();
  let eq = I[1].replace(/bmatrix/g, 'cases').replace('cases}', 'cases} x_1 = ');
  let arr = eq.split('\\cr');
  eq = arr[0];
  for (let i = 1; i < option; i++) {
    eq += `\\cr x_${i + 1}=${arr[i]}`;
  }
  eq_output.innerHTML = katex.renderToString(eq.replace(/,$/g, ''), {
    displayMode: true
  });

  arr = I[0].replace(/matrix\(|\[|\]|\)$/g, '').split(',');
  for (let i = 0; i < option; i++) {
    arr[i] = nerdamer(arr[i]).toDecimal();
  }
  if (!arr.some(isNaN) && arr.some(checkDecimal)) {
    let approx = `\\begin{cases}x_1=${arr[0]}`;
    for (let i = 1; i < option; i++) {
      approx += `\\cr x_${i + 1}=${arr[i]}`;
    }
    approx += '\\end{cases}'
    approx_output.style.display = 'block';
    approx_output.innerHTML = katex.renderToString(approx, {
      displayMode: true
    })
  } else {
    approx_output.style.display = 'none';
  }
}