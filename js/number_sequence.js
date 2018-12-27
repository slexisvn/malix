if (LN === 'vi') {
  document.getElementsByTagName('label')[1].innerHTML = document.getElementsByClassName('title')[1].innerHTML = 'Dãy số';
  let _vi = ['Công thức tổng quát', 'Công thức tổng tổng quát', 'Dãy số đặc biệt'];
  for (let i = 0; i < 3; i++) {
    select.options[i].text = _vi[i];
  }
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
            callback($.map(['fib', 'farey', 'lucas'], (word) => word.includes(term) ? word : null))
          },
          replace: function(word) {
            return [`${word}(`, ')']
          }
        }])
      }
    });

    cal.onclick = function() {
      let IV = input.value;
      if (option === 'u') {
        let arr = IV.split(' ');
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
        output.innerHTML = katex.renderToString(`u_n=  ${nerdamer(`expand(${result})`).toTeX().replace(/x/g, 'n')}`, {
          displayMode: !0
        })
      }
      if (option === 'o') {
        let number = parseInt(IV.replace(/(\w*)\(([^\)]*)\)/g, '$2'));
        if (IV.includes('farey')) {
          output.innerHTML = katex.renderToString(farey(number).toString(), {
            displayMode: !0
          })
        }
        if (IV.includes('fib')) {
          output.innerHTML = katex.renderToString(fib(number).toString(), {
            displayMode: !0
          })
        }
        if (IV.includes('lucas')) {
          output.innerHTML = katex.renderToString(lucas(number).toString(), {
            displayMode: !0
          })
        }
      }
      if (option === 's') {
        /* https://drive.google.com/file/d/1Qft7UpyxRs632HR9D2-VkPW2tAohVHvx/view */
        let lcm = uoc_chung(IV);
        let sum = parseInt(nerdamer(`${lcm}*sum(${IV},n,1,100)`).toString());
        if (check_num(sum)) {
          sum *= 2;
          lcm += '*2'
        }
        output.innerHTML = katex.renderToString(`S_n=${nerdamer(`expand((${phan_tich_100(sum)})/(${lcm}))`).toTeX().replace(/x/g, 'n')}`, {
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
      let a = 0;
      let b = 1;
      let c = 1;
      let d = n;
      let descending = false;
      let result = '';
      let k = 0;
      let tmp_a = 0;
      let tmp_b = 0;
      if (descending) {
        a = 1;
        c = n - 1;
      }
      result = `\\frac{${a}}{${b}},\\:`;
      while ((c <= n && !descending) || (a > 0 && descending)) {
        k = parseInt((n + b) / d);
        tmp_a = a;
        tmp_b = b;
        a = c;
        b = d;
        c = k * c - tmp_a;
        d = k * d - tmp_b;
        result += `\\frac{${a}}{${b}},\\:`;
      }
      return result.replace(/,\\:$/g, '');
    }

    function uoc_chung(str) {
      let arr = nerdamer(`integrate(${str},n)`).text('fractions').match(/\d(?=\))/g);
      return arr ? nerdamer(`lcm(1,${arr.join(',')})`).text('fractions') : '1';
    }

    function check_num(num) {
      let str = num.toString();
      if (parseInt(str.substr(str.length - 2, 2)) >= 50) {
        return true
      }
      return false
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
      return str.replace(/\+$/g, '')
    }
  })
})