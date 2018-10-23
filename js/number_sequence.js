if (LN === 'vi') {
  document.getElementsByTagName('label')[1].innerHTML = document.getElementsByClassName('title')[1].innerHTML = 'Dãy số';
}
$.getScript('../js/algebra.js', function() {
  $.getScript('../js/calculus.js', function() {
    let option = select.value;
    select.onchange = function() {
      option = this.value;
      let lb = document.getElementsByTagName('label')[1];
      switch (option) {
        case 'u':
          lb.innerHTML = LN === 'vi' ? 'Dãy số' : 'Number sequence';
          input.placeholder = '1 2 3 4 5';
          break;
        case 's':
          lb.innerHTML = LN === 'vi' ? 'Công thức tổng quát của dãy số' : 'General term of the number sequence';
          input.placeholder = '2n+1';
          break;
        case 'o':
          lb.innerHTML = LN === 'vi' ? 'Hàm' : 'Function';
          input.placeholder = 'farey(3)';
          break;
      }
    }

    $('#input').on('input', function() {
      if (option === 'o') {
        $('#input').textcomplete([{
          match: /(^|\b)(\w{1,})$/,
          search: function(term, callback) {
            let words = ['fib', 'farey', 'lucas'];
            callback($.map(words, function(word) {
              return word.indexOf(term) === 0 ? word : null
            }))
          },
          replace: function(word) {
            return `${word}()`
          }
        }])
      }
    });

    cal.onclick = function() {
      let Input = input.value;
      if (option === 'u') {
        let arr = Input.split(' ');
        let result;
        if (arr.length === 5) {
          result = '(A_1/24)*(x-2)*(x-3)*(x-4)*(x-5)+(A_2/(-6))*(x-1)*(x-3)*(x-4)*(x-5)+(A_3/4)*(x-1)*(x-2)*(x-4)*(x-5)+(A_4/(-6))*(x-1)*(x-2)*(x-3)*(x-5)+(A_5/24)*(x-1)*(x-2)*(x-3)*(x-4)';
          for (let i = 0; i < 5; i++) {
            result = result.replace(`A_${i + 1}`, arr[i])
          }
        }
        if (arr.length === 4) {
          result = '(A_1/(-6))*(x-2)*(x-3)*(x-4)+(A_2/2)*(x-1)*(x-3)*(x-4)+(A_3/(-2))*(x-1)*(x-2)*(x-4)+(A_4/6)*(x-1)*(x-2)*(x-3)';
          for (let i = 0; i < 4; i++) {
            result = result.replace(`A_${i + 1}`, arr[i])
          }
        }
        output.innerHTML = katex.renderToString(`u_n=  ${nerdamer(`expand(${result})`).toTeX().replace(/x/g, 'n').replace(/\\cdot(?= \\| [a-z])/g, '')}`, {
          displayMode: !0
        })
      }
      if (option === 'o') {
        let number = parseInt(Input.replace(/(\w*)\(([^\)]*)\)/g, '$2'));
        if (Input.includes('farey')) {
          output.innerHTML = katex.renderToString(farey(number).toString(), {
            displayMode: !0
          })
        }
        if (Input.includes('fib')) {
          output.innerHTML = katex.renderToString(fib(number).toString(), {
            displayMode: !0
          })
        }
        if (Input.includes('lucas')) {
          output.innerHTML = katex.renderToString(lucas(number).toString(), {
            displayMode: !0
          })
        }
      }
      if (option === 's') {
        let lcm = uoc_chung(Input);
        let sum = parseInt(tong(Input, lcm));
        if (check_num(sum)) {
          sum *= 2;
          lcm += '*2'
        }
        output.innerHTML = katex.renderToString(`S_n=${nerdamer(`(${phan_tich_100(sum)})/(${lcm})`).toTeX().replace(/x/g, 'n').replace(/\\cdot(?= \\| [a-z])/g, '')}`, {
          displayMode: !0
        })
      }
    }

    function fib(n) {
      return n === 1 ? 1 : n === 2 ? 1 : fib(n - 1) + fib(n - 2)
    }

    function lucas(n) {
      return n === 0 ? 2 : n === 1 ? 1 : lucas(n - 1) + lucas(n - 2)
    }

    function farey(n) {
      let i, q, v, x, y, l, m, k, a = [],
        b = [],
        c = [],
        d = [],
        out = '';
      q = v = 2;
      a[0] = 0;
      a[1] = b[0] = b[1] = 1;
      for (k = 2; k <= n; k++) {
        i = 0;
        while (a[i] != 1 || b[i] != 1) {
          if (b[i] + b[i + 1] == v) {
            x = a[i] + a[i + 1];
            y = b[i] + b[i + 1];
            m = i + 1;
            for (l = 0; l <= m - 1; l++) {
              c[l] = a[l];
              d[l] = b[l]
            }
            c[l] = x;
            d[l] = y;
            for (l = m; l <= q; l++) {
              c[l + 1] = a[l];
              d[l + 1] = b[l]
            }
            for (l = 0; l <= q + 1; l++) {
              a[l] = c[l];
              b[l] = d[l]
            }
            q++
          }
          i++
        }
        v++
      }
      for (k = 0; k < q - 1; k++) {
        out += `\\dfrac{${a[k]}}{${b[k]}},`;
      }
      out += `\\dfrac{${a[q - 1]}}{${b[q - 1]}}`;
      return out
    }

    function nguyen_ham(str) {
      return nerdamer(`integrate(${str},n)`).text('fractions')
    }

    function uoc_chung(str) {
      str = nguyen_ham(str);
      let a = '';
      for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === '/') {
          a += str.charAt(i + 1);
          a += (i < str.length - 10) ? ',' : ''
        }
      }
      if (a === '') {
        return '1'
      }
      return nerdamer(`lcm(1,${a.replace(/,$/, '')})`).text('fractions')
    }

    function tong(str, lcm) {
      return nerdamer(`${lcm}*sum(${str},n,1,100)`).text('fractions')
    }

    function check_num(num) {
      let str = num.toString();
      if (parseInt(str.substr(str.length - 2, 2)) >= 50) {
        return !0
      }
    }

    function phan_tich_100(num) {
      let digits = [];
      let n = 0;
      let tam = num;
      let str = '';
      while (tam) {
        digits[n] = tam % 100;
        tam = (tam - digits[n]) / 100;
        n++
      }
      n--;
      let bool = !1;
      if (digits[n] >= 90) {
        digits.push(1);
        num -= 100 ** (n + 1);
        bool = !0
      }
      for (let i = (bool) ? n - 1 : n; i >= 0; i--) {
        if (digits[i]) {
          digits[i] = (num - (num % (100 ** i))) / (100 ** i);
          if (parseInt(num.toString().charAt(1)) >= 5) {
            if (digits[i] > 0) {
              digits[i]++
            } else {
              digits[i]--
            }
          }
          num -= digits[i] * (100 ** i)
        }
      }
      for (let i = n; i >= 0; i--) {
        str += `${digits[i]}x^${i}+`
      }
      return str.replace(/\+-/g, '-').replace(/\+$/g, '')
    }
  })
})