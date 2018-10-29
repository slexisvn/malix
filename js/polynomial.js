if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Đa thức';
  let lb = document.getElementsByTagName('label');
  lb[1].innerHTML = 'Biểu thức';
  lb[3].innerHTML = 'Các giá trị của x';
  lb[4].innerHTML = 'Các giá trị của f';
}

$.getScript('../js/algebra.js', function() {

  function bernoulliP(m) {
    let b1 = ''
    let b2 = '';
    for (let n = 0; n <= m; n++) {
      b2 = '';
      for (let k = 0; k <= n; k++) {
        b2 += `${((-1) ** k) * binom(n, k)}(x+${k})^${m}+`
      }
      b1 += `(${b2.replace(/\+$/, '')})/${n + 1}+`
    }
    return _.parse(b1.replace(/\+$/, ''))
  }

  function eulerP(m) {
    let e1 = ''
    let e2 = '';
    for (let n = 0; n <= m; n++) {
      e2 = '';
      for (let k = 0; k <= n; k++) {
        e2 += `${((-1) ** k) * binom(n, k)}(x+${k})^${m}+`
      }
      e1 += `(${e2.replace(/\+$/, '')})/${2 ** n}+`
    }
    return _.parse(e1.replace(/\+$/, ''))
  }

  function hermite(n) {
    let h = '';
    for (let m = 0; m <= Math.floor(n / 2); m++) {
      h += `(${((-1) ** m) * (2 ** (n - 2 * m))}x^${n - 2 * m})/${Math2.factorial(m) * Math2.factorial(n - 2 * m)}+`
    }
    return _.parse(`${Math2.factorial(n)}*(${h.replace(/\+$/, '')})`)
  }

  function hermiteE(n) {
    let h = '';
    for (let m = 0; m <= Math.floor(n / 2); m++) {
      h += `(${(-1) ** m}x^${n - 2 * m})/${(2 ** m) * Math2.factorial(m) * Math2.factorial(n - 2 * m)}+`
    }
    return _.parse(`${Math2.factorial(n)}*(${h.replace(/\+$/, '')})`)
  }

  function legendre(n) {
    let l = '';
    for (let k = 0; k <= n; k++) {
      l += `${binom(n, k) ** 2}(x-1)^${n - k}(x+1)^${k}+`
    }
    return _.parse(`(${l.replace(/\+$/, '')})/2^${n}`)
  }

  function laguerre(n) {
    let l = '';
    for (let k = 0; k <= n; k++) {
      l += `${binom(n, k) * ((-1) ** k) / Math2.factorial(k)}x^${k}+`
    }
    return _.parse(l.replace(/\+$/, ''))
  }

  function chebyshevT(n) {
    let c = '';
    for (let k = 0; k <= Math.floor(n / 2); k++) {
      c += `${binom(n, 2 * k)}(1-x^(-2))^${k}+`
    }
    return _.parse(`x^${n}*(${c.replace(/\+$/, '')})`)
  }

  function chebyshevU(n) {
    let c = '';
    for (let k = 0; k <= Math.floor(n / 2); k++) {
      c += `${binom(n + 1, 2 * k + 1)}(1-x^(-2))^${k}+`
    }
    return _.parse(`x^${n}*(${c.replace(/\+$/, '')})`)
  }

  nerdamer.register([{
    name: 'laguerre',
    numargs: 1,
    visible: !0,
    build: function() {
      return laguerre
    }
  }, {
    name: 'legendre',
    numargs: 1,
    visible: !0,
    build: function() {
      return legendre
    }
  }, {
    name: 'eulerP',
    numargs: 1,
    visible: !0,
    build: function() {
      return eulerP
    }
  }, {
    name: 'bernoulliP',
    numargs: 1,
    visible: !0,
    build: function() {
      return bernoulliP
    }
  }, {
    name: 'hermite',
    numargs: 1,
    visible: !0,
    build: function() {
      return hermite
    }
  }, {
    name: 'hermiteE',
    numargs: 1,
    visible: !0,
    build: function() {
      return hermiteE
    }
  }, {
    name: 'chebyshevT',
    numargs: 1,
    visible: !0,
    build: function() {
      return chebyshevT
    }
  }, {
    name: 'chebyshevU',
    numargs: 1,
    visible: !0,
    build: function() {
      return chebyshevU
    }
  }]);

  let option = select.value;

  $('#coeff_area, #lagrange_area').hide();

  $('#select').on('change', function() {
    option = $(this).val();
    option === 'c' ? $('#coeff_area').show() : $('#coeff_area').hide();
    if (option === 'p') {
      $('#input').val('()/()');
    }
    if (main_area.style.display === 'none') {
      $('#main_area, #lagrange_area').toggle()
    }
  });

  cal.onclick = function() {
    let Input = input.value;
    let result = '';
    if (main_area.style.display === '') {
      switch (option) {
        case 'e':
          result = nerdamer(`expand(${Input})`).toTeX();
          break;
        case 'f':
          result = nerdamer(`factor(${Input})`).toTeX().replace(/\\left\((\w)\\right\)/g, '$1');
          break;
        case 'c':
          result = nerdamer(`vecget(coeffs(${Input}, x),${degree.value} )`).toTeX();
          break;
        case 'p':
          result = nerdamer(`partfrac(${Input},x)`).toTeX();
          break;
      }
    } else {
      let n = '';
      let d = '';
      let x = xs.value.split(' ');
      let f = fs.value.split(' ');
      for (let i = 0; i < x.length; i++) {
        result += `(${f[i]}*`;
        n = d = '';
        for (let j = 0; j < x.length; j++) {
          if (i !== j) {
            n += `(x-${x[j]})*`;
            d += `(${x[i]}-${x[j]})*`
          }
        }
        n = n.replace(/\*$/g, '');
        d = d.replace(/\*$/g, '');
        result += `${n})/(${d})+`
      }
      result = nerdamer(`expand(${result.replace(/\+$/g, '')})`).toTeX()
    }
    output.innerHTML = katex.renderToString(result.replace(/\\cdot(?= \\| [a-z])/g, ''), {
      displayMode: !0
    })
  }

  $('#input').textcomplete([{
    match: /(^|\b)(\w{1,})$/,
    search: function(term, callback) {
      var words = ['hermite', 'hermiteE', 'legendre', 'laguerre', 'lagrange', 'chebyshevT', 'chebyshevU', 'bernoulliP', 'eulerP'];
      callback($.map(words, function(word) {
        return word.indexOf(term) === 0 ? word : null
      }))
    },
    replace: function(word) {
      if (word !== 'lagrange') {
        return `${word}()`
      } else {
        $('#main_area, #lagrange_area').toggle()
      }
    }
  }]);
})