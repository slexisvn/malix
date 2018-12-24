if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Giải phương trình, bất phương trình';
  document.getElementsByTagName('label')[1].innerHTML = 'Biểu thức';
}

other_eq_output.style.display = other_approx_output.style.display = 'none';

$.getScript('../js/algebra.js', function() {
  $.getScript('../js/calculus.js', function() {
    $.getScript('../js/solve.js', function() {
      _W_.push('/');
      $('#input').textcomplete([{
        match: /(^|\b)(\w{1,}|\W{1,})$/,
        search(term, callback) {
          callback($.map(_W_, word => word.includes(term) ? word : null))
        },
        replace(word) {
          return word === '/' ? '()/()' : `${word}()`
        }
      }]);

      function toArray(str) {
        return str.replace(/^\[|\]$|\*| /g, '').split(',');
      }

      function findClosingBracket(str) {
        let depth = 1;
        for (let i = str.indexOf('{') + 1, l = str.length; i < l; i++) {
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

      function formatRangeEq(r) {
        let l = r.length;
        let o = {
          d: '',
          p: ''
        };
        if (l === 1) {
          o.d = r[0].d.includes('.') ? `$$x\\approx ${r[0].d}$$` : '';
          o.p = r[0].p !== '' ? `$$x=${r[0].p}$$` : '';
        } else {
          for (let i = 0; i < l; i++) {
            if (r[i].p !== '') {
              o.p += `x_${i + 1}=${r[i].p}\\\\`;
            }
            if (r[i].d !== '') {
              o.d += `x_${i + 1}\\approx ${r[i].d}\\\\`;
            }
          }
          for (x in o) {
            if (o[x] !== '') {
              o[x] = o[x].replace(/\\\\$/, '');
              o[x] = (o[x].match(/x_/g) || []).length === 1 ? `$$${o[x]}$$` : `$$\\left[\\begin{array}{l}${o[x]}\\end{array}\\right.$$`;
            }
          }
        }
        return o;
      }

      function _s_L(num) {
        return LN === 'vi' ? `\\text{C${num > 0 ? 'T' : 'D'}}` : `\\text{Local ${num > 0 ? 'Max' : 'Min'}}`
      }

      function formatRangeE(r, s) {
        if (r.every(x => x.pl === s ? 1 : 0)) {
          return '$$\\mathbb R$$';
        } else {
          if (r.every(x => x.pl !== s ? 1 : 0)) {
            return '$$\\varnothing$$';
          } else {
            let o = [];
            for (let i = 0, l = r.length - 1; i < l; i++) {
              if (r[i].pl === s) {
                o.push({
                  d: `${r[i + 1].isD ? '\\left(' : '\\left['}${r[i + 1].d};${r[i].d}${r[i].isD ? '\\right)' : '\\right]'}`,
                  p: `${r[i + 1].isD ? '\\left(' : '\\left['}${r[i + 1].p};${r[i].p}${r[i].isD ? '\\right)' : '\\right]'}`
                })
              }
            }
            return o
          }
        }
      }

      function formatRangeT(r, s, dbr) {
        if (r.every(x => x.pl !== s ? 1 : 0)) {
          return '$$\\varnothing$$';
        } else {
          let o = [];
          if (r.every(x => x.pl === s ? 1 : 0)) {
            o.push({
              d: '\\mathbb R',
              p: '\\mathbb R'
            });
          } else {
            for (let i = 0, l = r.length - 1; i < l; i++) {
              if (r[i].pl === s) {
                o.push({
                  d: `\\left(${r[i + 1].d};${r[i].d}\\right)`,
                  p: `\\left(${r[i + 1].p};${r[i].p}\\right)`
                });
              }
            }
          }
          let l = dbr.length;
          if (l > 1 || (l === 1 && dbr[0].pl === s)) {
            o[0].d += '\\backslash\\left\\{';
            o[0].p += '\\backslash\\left\\{';
            for (let i = 0; i < l; i++) {
              if (dbr[i].pl === s) {
                o[0].d += dbr[i].d + ',\\:';
                o[0].p += dbr[i].p + ',\\:';
              }
            }
            o[0].d = o[0].d.replace(/,\\:$/, '\\right\\}');
            o[0].p = o[0].p.replace(/,\\:$/, '\\right\\}');
          }
          return o
        }
      }

      function formatIneq(range) {
        if (!/mathbb|varnothing/.test(range[0].d)) {
          let o = {
            d: '$$',
            p: '$$'
          };
          for (let i = range.length - 1; i >= 0; i--) {
            for (x in o) {
              o[x] += `${range[i][x]}\\cup`
            }
          }
          for (x in o) {
            o[x] = o[x].replace(/\\cup$/g, '$$$$')
          }
          return o
        }
        if (range[0].d.includes('mathbb')) {
          return {
            d: `$$${range[0].d}$$`,
            p: `$$${range[0].p}$$`,
          };
        }
        return '';
      }

      $('button').click(function() {
        let operator = $(this).attr('id');
        let IV = input.value;
        if ((operator !== 'eq' && !/[^x\d\W]/g.test(IV)) || operator === 'eq') {
          let __ap;
          let deg = parseInt(nerdamer(`deg(${IV},x)`).toString());
          let eq;
          let approx;
          let ROOT = nerdamer(`solve(${IV},x)`).latex().map(x => toArray(x).filter((v, i, self) => self.indexOf(v) === i || v === '' || v.includes('big')));
          if (operator === 'eq') {
            ROOT = ROOT[0].map((x, i) => {
              return {
                d: !/[^i\d\W]+/.test(x) && x.includes('.') && x.length < 40 ? x : '',
                p: ROOT[1][i].includes('big') ? '' : ROOT[1][i]
              }
            });
            if (ROOT.length) {
              let tmp = formatRangeEq(ROOT);
              eq = tmp.p;
              approx = tmp.d;
            } else {
              eq = `<p align="center">${LN === 'vi' ? 'Không giải được' : 'Can\'t solve'}</p>`
            }
            if (!IV.includes(')/(')) {
              let _L = LN === 'vi' ? 'tại' : 'at';
              // MAX - MIN
              if (deg === 2) {
                let coeff = toArray(nerdamer(`coeffs(${IV},x)`).toString());
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
              if (deg > 2 && !/[^x\d\W]/g.test(IV)) {
                let dy1 = nerdamer(`diff(${IV},x)`).toString();
                let dy2 = nerdamer(`diff(${dy1},x)`).toString();
                let v_dy2 = [];
                let _o_u = '';

                if (deg === 3) {
                  let r_dy1 = nerdamer(`solve(${dy1},x)`);
                  let r__d_dy1 = toArray(r_dy1.toString());
                  let r_l = r__d_dy1.length;
                  if (r_l > 1) {
                    let r__p_dy1 = toArray(r_dy1.toTeX());
                    let _1_r_dy1 = toArray(r_dy1.text());
                    let _o1 = '';
                    for (let i = 0; i < r_l; i++) {
                      if (r__d_dy1[i].includes('i')) {
                        break;
                      } else {
                        v_dy2.push(parseFloat(nerdamer(dy2).sub('x', r__d_dy1[i]).text()));
                        let ___ = nerdamer(IV).sub('x', r__d_dy1[i]).toString();
                        let tmp = nerdamer(___.replace(/sqrt\(([^])\)\^(\w)/g, 'sqrt($1^$2)')).latex();
                        _o_u += `<p align="center">$y_{${_s_L(v_dy2[i])}}=${tmp[1]}$ ${_L} $x=${r__p_dy1[i]}$</p>`;
                        if (tmp[1] !== tmp[0]) {
                          _o1 += `<p align="center">$y_{${_s_L(v_dy2[i])}}=${tmp[0]}$ ${_L} $x=${_1_r_dy1[i]}$</p>`
                        }
                      }
                    }
                    if (_o1 !== '') {
                      __ap = 'block';
                      other_approx_output.innerHTML = _o1;
                    } else {
                      __ap = 'none';
                    }
                    other_approx_output.style.display = __ap;
                  }
                }
                if (deg > 3) {
                  let r_dy1 = toArray(nerdamer(`roots(${dy1},x)`).text());
                  for (let i = 0, r_l = r_dy1.length; i < r_l; i++) {
                    if (!r_dy1[i].includes('i')) {
                      v_dy2.push(parseFloat(nerdamer(dy2).sub('x', r_dy1[i]).text()));
                      if (v_dy2[i]) {
                        _o_u += `<p align="center">$y_{${_s_L(v_dy2[i])}}=${nerdamer(IV).sub('x', r_dy1[i]).text()}$ ${_L} $x=${r_dy1[i]}$</p>`
                      }
                    }
                  }
                  other_approx_output.style.display = 'none';
                }
                if (_o_u === '') {
                  _o_u = `<p align="center">${LN === 'vi' ? 'Không có cực trị' : 'No Local Max/Min'}</p>`;

                } else {
                  let gx = nerdamer(`divide(${IV},${dy1})`).toTeX();
                  _o_u += `$$g(x)=${gx.substring(gx.indexOf('{') + 1, findClosingBracket(gx))}$$`;
                }
                other_eq_output.innerHTML = _o_u;
              }
              other_eq_output.style.display = deg === 2 || (deg > 2 && !/[^x\d\W]/g.test(IV)) ? 'block' : 'none';
            }
          } else {
            other_eq_output.style.display = other_approx_output.style.display = 'none';
            ROOT = ROOT.map(x => x.filter(v => !v.includes('i') && v !== ''));
            let dbr = [];
            let result;
            if (IV.includes(')/(')) {
              let reg = /\(([^\)]*)\)\/\(([^\)]*)\)/g;
              let _D = IV.replace(reg, '$2');
              let dy_n = nerdamer(`diff(${IV.replace(reg, '$1')},x)`).toString();
              let dy_d = nerdamer(`diff(${_D},x)`).toString();
              let D =  nerdamer(`solve(${_D},x)`).latex().map(x => toArray(x).filter((v, i, self) => self.indexOf(v) === i && !v.includes('i') && v !== ''));
              ROOT = [...ROOT[0].map((x, i) => {
                return {
                  d: parseFloat(x),
                  p: ROOT[1][i],
                  isDBR: nerdamer(dy_n).sub('x', x).text() === '0' ? 1 : 0,
                  isD: 0
                }
              }), ...D[0].map((x, i) => {
                return {
                  d: parseFloat(x),
                  p: D[1][i],
                  isDBR: nerdamer(dy_d).sub('x', x).text() === '0' ? 1 : 0,
                  isD: 1
                }
              })].sort((a, b) => b.d - a.d);
            } else {
              let dy = nerdamer(`diff(${IV},x)`).toString();
              ROOT = ROOT[0].map((x, i) => {
                return {
                  d: parseFloat(x),
                  p: ROOT[1][i],
                  isDBR: nerdamer(dy).sub('x', x).text() === '0' ? 1 : 0,
                  isD: 0
                }
              }).sort((a, b) => b.d - a.d);
            }
            ROOT.unshift({
              d: '+\\infty',
              p: '+\\infty',
              isDBR: 0,
              isD: 1,
              pl: (IV.match(/\(-|^-/g) || []).length !== 1 ? '+' : '-'
            });
            ROOT.push({
              d: '-\\infty',
              p: '-\\infty',
              isDBR: 0,
              isD: 1,
              pl: ROOT[0].pl
            });
            for (let i = 1, l = ROOT.length - 1; i < l; i++) {
              ROOT[i].pl = ROOT[i].isDBR ? ROOT[i - 1].pl : (ROOT[i - 1].pl === '+' ? '-' : '+')
            }
            for (let i = ROOT.length - 1; i >= 0; i--) {
              if (ROOT[i].isDBR) {
                dbr.push(ROOT.splice(i, 1)[0]);
              }
            }
            switch (operator) {
              case 'ge':
                result = formatRangeE(ROOT, '+');
                break;
              case 'le':
                result = formatRangeE(ROOT, '-');
                break;
              case 'gt':
                result = formatRangeT(ROOT, '+', dbr);
                break;
              case 'lt':
                result = formatRangeT(ROOT, '-', dbr);
                break;
            }
            if (Array.isArray(result)) {
              let tmp = formatIneq(result);
              eq = tmp.p;
              approx = tmp.d;
            } else {
              eq = result;
              approx = '';
            }
          }
          if (eq !== '' && !eq.includes('undefined')) {
            __ap = 'block';
            eq_output.innerHTML = eq.replace(/,$/g, '');
          } else {
            __ap = 'none';
          }
          eq_output.style.display = __ap;
          if (approx !== '' && eq !== approx) {
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
        }
      })
    })
  })
})