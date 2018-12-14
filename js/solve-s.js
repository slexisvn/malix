if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Giải phương trình, bất phương trình';
  document.getElementsByTagName('label')[1].innerHTML = 'Biểu thức';
}

other_eq_output.style.display = other_approx_output.style.display = 'none';

$.getScript('../js/algebra.js', function() {
  $.getScript('../js/calculus.js', function() {
    $.getScript('../js/solve.js', function() {
      $('#input').textcomplete([{
        match: /(^|\b)(\w{1,}|\W{1,})$/,
        search(term, callback) {
          callback($.map(_W_, word => word.indexOf(term) === 0 ? word : null))
        },
        replace(word) {
          return word === '/' ? '()/()' : `${word}()`
        }
      }]);

      function __2_a(str) {
        return [...new Set(str.replace(/^\[|\]$|\*/g, '').split(','))];
      }

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

      function checkEmpty(str) {
        return str === '' ? true : false
      }

      function __formatEq__p(p) {
        let l = p.length;
        let t = p.map(x => x.replace(/\D/g, ''));
        if (l === 1 && p[0] !== '') {
          return `$$x=${p[0]}$$`;
        } else {
          if (t.filter(checkEmpty).length === l) {
            return '';
          } else {
            let o = '';
            for (let i = 0; i < l; i++) {
              if (t[i] !== '') {
                o += `x_${i + 1}=${p[i]}\\\\`;
              }
            }
            o = o.replace(/\\\\$/, '');
            return (o.match(/x_/g) || []).length === 1 ? `$$${o}$$` : `$$\\left[\\begin{array}{l}${o}\\end{array}\\right.$$`;
          }
        }
      }

      function __formatEq__d(d) {
        let l = d.length;
        let t = d.map(x => x.includes('sqrt') && x.length ? '' : x);
        if (l === 1 && d[0].includes('.')) {
          return `$$x\\approx ${d[0]}$$`;
        } else {
          if (t.filter(checkEmpty).length === l) {
            return '';
          } else {
            let o = '';
            for (let i = 0; i < l; i++) {
              if (t[i] !== '' && parseFloat(d[i]) % 1) {
                o += `x_${i + 1}\\approx ${__exp_(d[i])}\\\\`;
              }
            }
            o = o.replace(/\\\\$/, '');
            return (o.match(/x_/g) || []).length === 1 ? `$$${o}$$` : `$$\\left[\\begin{array}{l}${o}\\end{array}\\right.$$`;
          }
        }
      }

      function _s_L(num) {
        return LN === 'vi' ? `\\text{C${num > 0 ? 'T' : 'D'}}` : `\\text{Local ${num > 0 ? 'Max' : 'Min'}}`
      }

      $('button').click(function() {
        let operator = $(this).attr('id');
        let IV = input.value;
        let deg = parseInt(nerdamer(`deg(${IV},x)`).toString());
        let eq;
        let approx;
        let N;
        let __ap;
        if (deg > 2 && !/[^x\d\W]/g.test(IV)) {
          N = nerdamer(`roots(${IV},x)`).latex();
        } else {
          if (IV.includes(')/(')) {
            N = nerdamer(`solve(${IV.replace(/\(([^\)]*)\)\/\(([^\)]*)\)/g, '$1')},x)`).latex();
          } else {
            N = nerdamer(`solve(${IV},x)`).latex();
          }
        }
        let _d__n = __2_a(N[0]);
        let _p__n = __2_a(N[1]);

        if (operator === 'eq') {
          if (N[1] === '[]' && N[0] === '[]') {
            eq = `<p align="center">${LN === 'vi' ? 'Không giải được' : 'Can\'t solve'}</p>`
          } else {
            eq = __formatEq__p(_p__n);
            approx = __formatEq__d(_d__n);
          }
          if (IV.includes(')/(')) {
            __ap = 'none';
          } else {
            let _L = LN === 'vi' ? 'tại' : 'at';
            // MAX - MIN
            if (deg === 2) {
              let coeff = __2_a(nerdamer(`coeffs(${IV},x)`).toString());
              let delta = nerdamer(`(${coeff[1]})^2-4*(${coeff[2]})*(${coeff[0]})`).toString();
              let __y_o = nerdamer(`-${delta}/(4*(${coeff[2]}))`).latex();
              let __x_o = nerdamer(`-${coeff[1]}/(2*(${coeff[2]}))`).latex();
              let _o__ = coeff[2].charAt(0) === '-' ? '\\max' : '\\min';
              if (!/[^x\d\W]/g.test(IV) && __y_o[0] !== __y_o[1]) {
                __ap = 'block';
                other_approx_output.innerHTML = `<p align="center">$${_o__} y=${__y_o[0]}$ ${_L} $x=${__x_o[0]}$</p>`;
              } else {
                __ap = 'none';
              }
              other_approx_output.style.display = __ap;
              other_eq_output.innerHTML = `<p align="center">$${_o__} y=${__y_o[1]}$ ${_L} $x=${__x_o[1]}$</p>`;
            }

            //LOCAL MAX/MIN
            if (deg > 2) {
              let dy1 = nerdamer(`diff(${IV},x)`).toString();
              let dy2 = nerdamer(`diff(${dy1},x)`).toString();
              let v_dy2 = [];
              let _o_u = '';

              if (deg === 3) {
                let r_dy1 = nerdamer(`solve(${dy1},x)`);
                let r__d_dy1 = __2_a(r_dy1.toString());
                let r_l = r__d_dy1.length;
                if (r_l > 1) {
                  let r__p_dy1 = __2_a(r_dy1.toTeX());
                  let _1_r_dy1 = !/[^x\d\W]/g.test(IV) ? __2_a(r_dy1.text()) : [];
                  let _o1 = '';
                  for (let i = 0; i < r_l; i++) {
                    if (r__d_dy1[i].includes('i')) {
                      break;
                    } else {
                      v_dy2.push(parseFloat(nerdamer(dy2).sub('x', r__d_dy1[i]).text()));
                      let ___ = nerdamer(IV).sub('x', r__d_dy1[i]).toString();
                      let tmp = nerdamer(___.replace(/sqrt\(([^])\)\^(\w)/g, 'sqrt($1^$2)')).latex();
                      _o_u += `<p align="center">$y_{${_s_L(v_dy2[i])}}=${tmp[1]}$ ${_L} $x=${r__p_dy1[i]}$</p>`;
                      if (!/[^x\d\W]/g.test(IV) && tmp[1] !== tmp[0]) {
                        _o1 += `<p align="center">$y_{${_s_L(v_dy2[i])}}=${tmp[0]}$ ${_L} $x=${_1_r_dy1[i]}$</p>`
                      }
                    }
                  }
                  if (_o1 !== '' && !/[^x\d\W]/g.test(IV)) {
                    __ap = 'block';
                    other_approx_output.innerHTML = _o1;
                  } else {
                    __ap = 'none';
                  }
                  other_approx_output.style.display = __ap;
                }
              }
              if (deg > 3) {
                let r_dy1 = __2_a(nerdamer(`roots(${dy1},x)`).text());
                for (let i = 0, r_l = r_dy1.length; i < r_l; i++) {
                  if (!r_dy1[i].includes('i')) {
                    v_dy2.push(parseFloat(nerdamer(dy2).sub('x', r_dy1[i]).text()));
                    if (v_dy2[i]) {
                      _o_u += `<p align="center">$y_{${_s_L(v_dy2[i])}}=${nerdamer(IV).sub('x', r_dy1[i]).text()}$ ${_L} $x=${r_dy1[i]}$</p>`
                    }
                  }
                }
              }
              if (_o_u === '') {
                _o_u = `<p align="center">${LN === 'vi' ? 'Không có cực trị' : 'No Local Max/Min'}</p>`;

              } else {
                let gx = nerdamer(`divide(${IV},${dy1})`).toTeX();
                _o_u += `$$g(x)=${gx.substring(gx.indexOf('{') + 1, findClosingBracket(gx))}$$`;
              }
              other_eq_output.innerHTML = _o_u;
            }
          }
          other_eq_output.style.display = deg > 1 ? 'block' : 'none';
        }
        if (eq !== '') {
          __ap = 'block';
          eq_output.innerHTML = eq.replace(/,$/g, '');
        } else {
          __ap = 'none';
        }
        eq_output.style.display = __ap;
        if (approx !== '' && N[1].replace(/ /g, '') !== N[0].replace(/\*/g, '') && approx !== undefined) {
          __ap = 'block';
          approx_output.innerHTML = approx;
        } else {
          __ap = 'none';
        }
        approx_output.style.display = __ap;
        renderMathInElement(document.getElementById("math"), {
          delimiters: [{
            left: "$$",
            right: "$$",
            display: !0
          }, {
            left: "$",
            right: "$",
            display: !1
          }]
        })
      })
    })
  })
})