if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Giải phương trình, bất phương trình';
  document.getElementsByTagName('label')[1].innerHTML = 'Biểu thức';
}

$.getScript('../js/algebra.js', function() {
  $.getScript('../js/calculus.js', function() {
    $.getScript('../js/solve.js', function() {
      $('#input').textcomplete([{
        match: /(^|\b)(\w{1,}|\W{1,})$/,
        search(term, callback) {
          let words = ['cos', 'sin', 'tan', 'sqrt', 'asin', 'acos', 'atan', 'ln', '/'];
          callback($.map(words, word => word.indexOf(term) === 0 ? word : null))
        },
        replace(word) {
          if (word === '/') {
            return '()/()'
          } else {
            return `${word}()`
          }
        }
      }]);

      function findClosingBracket(str) {
        let depth = 1;
        for (let i = str.indexOf('{') + 1; i < str.length; i++) {
          switch (str[i]) {
            case '{':
              depth++;
              break;
            case '}':
              if (--depth == 0) {
                return i;
              }
              break;
          }
        }
        return -1
      }

      function sort(decimal, pretty) {
        let d;
        let p;
        for (let k = 0; k < decimal.length - 1; k++) {
          for (let i = k + 1; i < decimal.length; i++) {
            if (decimal[k] < decimal[i]) {
              d = decimal[k];
              decimal[k] = decimal[i];
              decimal[i] = d;
              p = pretty[k];
              pretty[k] = pretty[i];
              pretty[i] = p
            }
          }
        }
      }

      function formatEq(decimal, pretty) {
        let o = '';
        for (let i = 0; i < pretty.length; i++) {
          if (checkFrac(pretty[i], 0)) {
            o += `\\approx ${decimal[i]}`
          } else {
            o += `=${pretty[i]}`;
            if (isNaN(pretty[i]) && decimal[i] !== 'i' && decimal[i] !== '-i' && !decimal[i].includes('(')) {
              o += `\\approx ${decimal[i]}`
            }
          }
          o += ','
        }
        o = o.replace(/,$/g, '');
        if ((o.match(/=|\\approx/g) || []).length !== 1) {
          return `$$\\left[\\begin{array}{l}x${o.replace(/,/g, '\\\\x')}\\end{array}\\right.$$`
        } else {
          return `$$x${o}$$`
        }
      }

      function deleteImagineRoots(decimal, pretty) {
        for (let i = decimal.length - 1; i >= 0; i--) {
          if (decimal[i].includes('i')) {
            decimal.splice(i, 1);
            pretty.splice(i, 1);
          }
        }
      }

      function formatEOfRationalFunc(original_decimal, decimal, pretty, sign_table, sign) {
        let d = '';
        let p = '';
        let o_decimal = [];
        let o_pretty = [];
        for (let i = 0; i < pretty.length - 1; i++) {
          if (sign_table.charAt(i) === sign) {
            if (original_decimal.includes(decimal[i + 1].toString()) || decimal[i + 1] === -50) {
              d = p = '\\left('
            } else {
              d = p = '\\left['
            }
            d += `${decimal[i + 1]};${decimal[i]}`;
            p += `${pretty[i + 1]};${pretty[i]}`;
            if (original_decimal.includes(decimal[i].toString()) || decimal[i] === 50) {
              d += '\\right)';
              p += '\\right)'
            } else {
              d += '\\right]';
              p += '\\right]'
            }
            o_decimal.push(d)
            o_pretty.push(p);
            d = p = ''
          }
        }
        return [o_decimal, o_pretty]
      }

      function formatEOfPoly(decimal, pretty, sign_table, sign) {
        let d = '';
        let p = '';
        let o_decimal = [];
        let o_pretty = [];
        for (let i = 0; i < pretty.length - 1; i++) {
          if (sign_table.charAt(i) === sign) {
            d = p = decimal[i + 1] === -50 ? '\\left(' : '\\left[';
            d += `${decimal[i + 1]};${decimal[i]}`;
            p += `${pretty[i + 1]};${pretty[i]}`;
            o_decimal.push(d + (decimal[i] === 50 ? '\\right)' : '\\right]'));
            o_pretty.push(p + (decimal[i] === 50 ? '\\right)' : '\\right]'));
            d = p = ''
          }
        }
        return [o_decimal, o_pretty]
      }

      function formatT(decimal, pretty, sign_table, sign) {
        let o_decimal = [];
        let o_pretty = [];
        for (let i = 0; i < pretty.length - 1; i++) {
          if (sign_table.charAt(i) === sign) {
            o_decimal.push(`\\left(${decimal[i + 1]};${decimal[i]}\\right)`)
            o_pretty.push(`\\left(${pretty[i + 1]};${pretty[i]}\\right)`);
          }
        }
        return [o_decimal, o_pretty]
      }

      function checkDot(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].includes('.')) {
            return true
          }
        }
        return false
      }

      function formatIneq(decimal, pretty) {
        let o = '$$x\\in';
        for (let i = pretty.length - 1; i >= 0; i--) {
          o += `${pretty[i]}\\cup`
        }
        if (checkDot(decimal)) {
          o += '$$\\approx';
          for (let i = decimal.length - 1; i >= 0; i--) {
            o += `${decimal[i].replace('-50;', '-\\infty;').replace(';50', ';+\\infty')}\\cup`;
          }
        }
        return `${o.replace(/\\cup(?=\$\$\\approx)|\\cup$/g, '$$$$')}`
      }

      function noSolutionIneq(sign_of_A, operator) {
        switch (operator) {
          case 'ge':
          case 'gt':
            return sign_of_A === 1 ? '<p align="center">Bất phương trình vô nghiệm</p>' : '<p align="center">Bất phương trình nghiệm đúng với mọi $x\\in\\mathbb R$</p>'
            break;
          case 'le':
          case 'lt':
            return sign_of_A === 1 ? '<p align="center">Bất phương trình nghiệm đúng với mọi $x\\in\\mathbb R$</p>' : '<p align="center">Bất phương trình vô nghiệm</p>'
            break;
        }
      }

      $('button').click(function() {
        $('#other_area').hide();
        let operator = $(this).attr('id');
        let Input = input.value;
        let N;
        if (Input.includes(')/(')) {
          N = nerdamer(`solve(${Input.replace(/\(([^\)]*)\)\/\(([^\)]*)\)/g, '$1')},x)`);
        } else {
          N = nerdamer(`solve(${Input},x)`)
        }
        let arr_decimal_n = N.evaluate().text().replace(/\[|\]|\*/g, '').split(',');
        let arr_pretty_n = N.toTeX().replace(/\[|\]/g, '').split(',');
        let result = '';
        let deg = parseInt(nerdamer(`deg(${Input},x)`).toString());

        if (operator === 'eq') {
          if (N.toString() === '[]') {
            result = `<p align="center">${LN === 'vi' ? 'Không giải được' : 'Can\'t solve'}</p>`
          } else {
            result = formatEq(arr_decimal_n, arr_pretty_n);

            if (!Input.includes(')/(')) {
              if (deg > 1 && deg < 5) {
                $('#other_area').show();
              }
              // MAX - MIN
              if (deg === 2) {
                let coeffs = nerdamer(`coeffs(${Input},x)`).text().replace(/\[|\]/g, '').split(',');
                let delta = nerdamer(`(${coeffs[1]})^2-4*(${coeffs[2]})*(${coeffs[0]})`);
                other_output.innerHTML = `<p align="center">$${coeffs[2].charAt(0) === '-' ? '\\max' : '\\min'} y=${nerdamer(`-${delta}/(4*(${coeffs[2]}))`).toTeX()}$ ${LN === 'vi' ? 'tại' : 'at'} $x=${nerdamer(`-${coeffs[1]}/(2*(${coeffs[2]}))`).toTeX()}$</p>`;
              }
              //LOCAL MAX/MIN
              if (deg === 3 || deg === 4) {
                let dy1 = nerdamer(`diff(${Input},x)`).toString();
                let roots_of_dy1 = nerdamer(`solve(${dy1},x)`);
                let roots_decimal_of_dy1 = roots_of_dy1.text().replace(/\[|\]/g, '').split(',');
                let roots_pretty_of_dy1 = roots_of_dy1.toTeX().replace(/\[|\]/g, '').split(',');
                let dy2 = nerdamer(`diff(${dy1},x)`);
                let value_of_dy2 = [];
                let other_result = '';
                for (let i = 0; i < roots_decimal_of_dy1.length; i++) {
                  if (roots_decimal_of_dy1[i].includes('i')) {
                    if (deg === 3) {
                      break;
                    }
                  } else {
                    value_of_dy2[i] = parseFloat(nerdamer(dy2).sub('x', roots_decimal_of_dy1[i]).evaluate().text());
                    if (value_of_dy2[i] !== 0) {
                      other_result += `<p align="center">$y_{${LN === 'vi' ? `\\text{C${
                        char = value_of_dy2[i] > 0 ? 'T' : 'D'
                      }}` : `\\text{Local ${
                        char = value_of_dy2[i] > 0 ? 'Max' : 'Min'
                      }}`}}=${nerdamer(Input).sub('x', roots_decimal_of_dy1[i]).toTeX()}$ ${LN === 'vi' ? 'tại' : 'at'} $x=${roots_pretty_of_dy1[i]}$</p>`
                    }
                  }
                }
                if (other_result === '') {
                  other_result = `<p align="center">${LN === 'vi' ? 'Không có cực trị' : 'No Local Max/Min'}</p>`
                } else {
                  let gx = nerdamer(`divide(${Input},${dy1})`).toTeX();
                  other_result += `$$g(x)=${gx.substring(gx.indexOf('{') + 1, findClosingBracket(gx))}$$`;
                }
                other_output.innerHTML = other_result.replace(/\\cdot(?= \\| [a-z])/g, '');
              }
            }
          }
        } else {
          let temp;
          let sign_table;
          let sign_of_A = (Input.match(/\(-|^-/g) || []).length;
          if (sign_of_A === 1) {
            sign_table = '-+-+-+-+-'
          } else {
            sign_table = '+-+-+-+-+'
          }
          deleteImagineRoots(arr_decimal_n, arr_pretty_n);
          if (Input.includes(')/(')) {
            let D = nerdamer(`solve(${Input.replace(/\(([^\)]*)\)\/\(([^\)]*)\)/g, '$2')},x)`);
            let arr_decimal_d = D.evaluate().text().replace(/\[|\]|\*/g, '').split(',');
            let arr_pretty_d = D.toTeX().replace(/\[|\]/g, '').split(',');
            deleteImagineRoots(arr_decimal_d, arr_pretty_d);
            if (arr_decimal_d.length || arr_decimal_n.length) {
              let arr_decimal = [50, ...arr_decimal_n.map(parseFloat), ...arr_decimal_d.map(parseFloat), -50];
              let arr_pretty = ['+\\infty', ...arr_pretty_n, ...arr_pretty_d, '-\\infty'];
              sort(arr_decimal, arr_pretty);
              switch (operator) {
                case 'ge':
                  temp = formatEOfRationalFunc(arr_decimal_d, arr_decimal, arr_pretty, sign_table, '+')
                  break;
                case 'le':
                  temp = formatEOfRationalFunc(arr_decimal_d, arr_decimal, arr_pretty, sign_table, '-')
                  break;
                case 'gt':
                  temp = formatT(arr_decimal, arr_pretty, sign_table, '+')
                  break;
                case 'lt':
                  temp = formatT(arr_decimal, arr_pretty, sign_table, '-')
                  break;
              }
              arr_decimal = temp[0];
              arr_pretty = temp[1];
              result = formatIneq(arr_decimal, arr_pretty)
            } else {
              result = noSolutionIneq(sign_of_A, operator);
            }
          } else {
            if (deg > 1 && deg < 5) {
              if (arr_decimal_n.length) {
                arr_decimal_n = [50, ...arr_decimal_n.map(parseFloat), -50];
                arr_pretty_n = ['+\\infty', ...arr_pretty_n, '-\\infty'];
                sort(arr_decimal_n, arr_pretty_n);
                switch (operator) {
                  case 'ge':
                    temp = formatEOfPoly(arr_decimal_n, arr_pretty_n, sign_table, '+')
                    break;
                  case 'le':
                    temp = formatEOfPoly(arr_decimal_n, arr_pretty_n, sign_table, '-')
                    break;
                  case 'gt':
                    temp = formatT(arr_decimal_n, arr_pretty_n, sign_table, '+')
                    break;
                  case 'lt':
                    temp = formatT(arr_decimal_n, arr_pretty_n, sign_table, '-')
                    break;
                }
                arr_decimal_n = temp[0];
                arr_pretty_n = temp[1];
                result = formatIneq(arr_decimal_n, arr_pretty_n)
              } else {
                result = noSolutionIneq(sign_of_A, operator);
              }
            }
          }
        }
        output.innerHTML = result.replace(/,$|\\cdot(?= \\| [a-z])/g, '');
        renderMathInElement(document.getElementById("math"), { delimiters: [{ left: "$$", right: "$$", display: !0 }, { left: "$", right: "$", display: !1 }] })
      })
    })
  })
})