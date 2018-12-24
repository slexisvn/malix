if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Khai triển lượng giác';
  document.getElementsByTagName('label')[1].innerHTML = 'cos(nx), sin(nx), tan(nx) hoặc cos(x)<sup>n</sup>, sin(x)<sup>n</sup>';
}
$('#inputDiffer').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    callback($.map(['cos(x)^', 'sin(x)^', 'cos(', 'sin(', 'tan('], word => word.includes(term) ? word : null))
  },
  replace(word) {
    return word.includes('^') ? word : `${word}x)`;
  }
}]);

inputDiffer.onfocus = function() {
  let a = this.value;
  if (a.includes('(x)') && !a.includes('^')) {
    this.selectionStart = this.selectionEnd = a.indexOf('(x)') + 1
  }
}

cal.onclick = function() {
  let IV = inputDiffer.value;
  let n;
  let result = '';
  let result2 = '';
  if (IV.includes('^')) {
    if (IV.includes('cos')) {
      n = +IV.replace('cos(x)^', '');
    } else {
      n = +IV.replace('sin(x)^', '');
    }
    if (n % 2) {
      if (IV.includes('cos')) {
        result = `1/${2 ** (n - 1)}*(cos(${n}x)`;
        for (let i = 1; i < n / 2; i++) {
          result += `+${binom(n, i)}cos(${n - 2 * i}x)`;
        }
        result += ')';
      }
      if (IV.includes('sin')) {
        result = `(${(-1) ** ((n - n % 2) / 2)})/(${2 ** (n - 1)})*(sin(${n}x)`
        for (let i = 1; i < n / 2; i++) {
          result += `+${(-1) ** i * binom(n, i)}sin(${n - 2 * i}x)`;
        }
        result += ')'
      }
    } else {
      if (IV.includes('cos')) {
        result = `1/(${2 ** (n - 1)})*(cos(${n}x)`
        for (let i = 1; i < n / 2; i++) {
          result += `+${binom(n, i)}cos(${n - 2 * i}x)`;
        }
        result += `)+${binom(n, n / 2)}/${2 ** n}`
      }
      if (IV.includes('sin')) {
        result = `(${(-1) ** (n / 2)})/(${2 ** (n - 1)})*(cos(${n}x)`
        for (let i = 1; i < n / 2; i++) {
          result = `+${(-1) ** i * binom(n, i)}cos(${n - 2 * i}x)`;
        }
        result += `)+${binom(n, n / 2)}/${2 ** n}`
      }
    }
  } else {
    n = +IV.substring(4, IV.indexOf('x'));

    if (IV.includes('sin')) {
      for (let k = 0; k <= (n - 1) / 2; k++) {
        result += `${(-1) ** k * binom(n, 2 * k + 1)}cos(x)^${n - 2 * k - 1}sin(x)^${2 * k + 1}+`;
      }
    }

    if (IV.includes('cos')) {

      for (let k = 0; k <= n / 2; k++) {
        result += `${(-1) ** k * binom(n, 2 * k)}cos(x)^${n - 2 * k}sin(x)^${2 * k}+`
      }

      for (let k = 0; k <= n / 2; k++) {
        result2 += `${((-1) ** k * n * (2 ** (n - 1 - 2 * k)) * (Math2.factorial(n - k) / (Math2.factorial(k) * Math2.factorial(n - 2 * k)))) / (n - k)}cos(x)^${n - 2 * k}+`;
      }
      result2 = `\\\\ \\\\ ${nerdamer(result2.replace(/\+$/, '')).toTeX()}`
    }
    if (IV.includes('tan')) {
      result = '(';
      for (let k = 0; k <= (n - 1) / 2; k++) {
        result += `${(-1) ** k * binom(n, 2 * k + 1)}tan(x)^${2 * k + 1}+`;
      }
      result = `${result.replace(/\+$/, '')})/(`
      for (let k = 0; k <= n / 2; k++) {
        result += `${(-1) ** k * binom(n, 2 * k)}tan(x)^${2 * k}+`;
      }
      result = `${result.replace(/\+$/, '')})`
    }
  }
  output.innerHTML = katex.renderToString(`\\begin{gathered}${nerdamer(result.replace(/\+$/, '')).toTeX() + result2}\\end{gathered}`, {
    displayMode: true
  })
}