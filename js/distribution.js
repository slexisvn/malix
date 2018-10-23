var lb = document.getElementsByTagName('label');
if (LN === 'vi') {
  let _vi = ['Mật độ xác suất bình thường', 'Phân phối tích lũy bình thường', 'Phân phối tích lũy bình thường nghịch đảo', 'Xác suất nhị thức', 'Phân phối tích lũy nhị thức', 'Xác suất Poisson', 'Phân phối tích lũy Poisson'];
  document.getElementsByClassName('title')[1].innerHTML = 'Phân phối';
  for (let i = 0; i < 7; i++) {
    select.options[i].text = _vi[i]
  }
  lb[2].innerHTML = 'Biên dưới';
  lb[3].innerHTML = 'Biên trên';
  lb[4].innerHTML = 'Giá trị xác suất';
}
$.getScript('../js/algebra.js', function() {
  $.getScript('../js/calculus.js', function() {
    const Z_MAX = 6;

    function poz(z) {
      let y, x, w;
      if (z == 0.0) {
        x = 0.0
      } else {
        y = 0.5 * Math.abs(z);
        if (y > (Z_MAX * 0.5)) {
          x = 1.0
        } else if (y < 1.0) {
          w = y * y;
          x = ((((((((0.000124818987 * w - 0.001075204047) * w + 0.005198775019) * w - 0.019198292004) * w + 0.059054035642) * w - 0.151968751364) * w + 0.319152932694) * w - 0.531923007300) * w + 0.797884560593) * y * 2.0
        } else {
          y -= 2.0;
          x = (((((((((((((-0.000045255659 * y + 0.000152529290) * y - 0.000019538132) * y - 0.000676904986) * y + 0.001390604284) * y - 0.000794620820) * y - 0.002034254874) * y + 0.006549791214) * y - 0.010557625006) * y + 0.011630447319) * y - 0.009279453341) * y + 0.005353579108) * y - 0.002141268741) * y + 0.000535310849) * y + 0.999936657524
        }
      }
      return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5)
    }

    function critz(p) {
      const Z_EPSILON = 0.000001;
      let minz = -Z_MAX;
      let maxz = Z_MAX;
      let zval = 0.0;
      let pval;
      if (p < 0.0) p = 0.0;
      if (p > 1.0) p = 1.0;
      while ((maxz - minz) > Z_EPSILON) {
        pval = poz(zval);
        if (pval > p) {
          maxz = zval
        } else {
          minz = zval
        }
        zval = (maxz + minz) * 0.5
      }
      return (zval)
    }
    let option = 'normal_pd';
    let bool = !0;
    let p, s = '';
    let arr = [];
    normal_cd.style.display = 'none';
    inv_normal.style.display = 'none';
    binomial.style.display = 'none';
    poisson.style.display = 'none';
    btn_list_var.style.display = 'none';
    btn_list_var.onclick = function() {
      if (bool) {
        lb[1].innerHTML = LN === 'vi' ? 'Danh sách dữ liệu' : 'List';
        text_.innerHTML = 'List';
        xs.placeholder = '1 2 3 4 5';
        bool = !1
      } else {
        lb[1].innerHTML = 'x';
        text_.innerHTML = 'Var';
        xs.placeholder = '2';
        bool = !0
      }
      xs.value = ''
    }
    select.onchange = function() {
      option = this.value;
      xs.value = '';
      lb[1].innerHTML = 'X';
      text_.innerHTML = 'Var';
      let class_name = document.getElementsByClassName('hidden');
      for (let i = 0; i < class_name.length; i++) {
        class_name[i].style.display = 'none';
      }
      if (option === 'normal_pd' || option === 'normal_cd' || option === 'inv_normal') {
        normal.style.display = '';
        document.getElementById(option).style.display = ''
      }
      if (option === 'binomial_pd' || option === 'binomial_cd') {
        normal_pd.style.display = '';
        binomial.style.display = '';
        btn_list_var.style.display = '';
      }
      if (option === 'poisson_cd' || option === 'poisson_pd') {
        normal_pd.style.display = '';
        poisson.style.display = '';
        btn_list_var.style.display = '';
      }
    }
    cal.onclick = function() {
      let result = '';
      if (option === 'normal_pd') {
        result = `p &approx; ${nerdamer(`1/${sigma.value}*(1/sqrt(2*pi)*e^(-x^2/2))`).sub('x', `(${xs.value}-${mu.value})/${sigma.value}`).evaluate().text()}`
      }
      if (option === 'normal_cd') {
        result = `p &approx; ${nerdamer('erf(a/sqrt(2))/2-erf(b/sqrt(2))/2').sub('a', `(${upper.value}-${mu.value})/${sigma.value}`).sub('b', `(${lower.value}-${mu.value})/${sigma.value}`).evaluate().text()}`
      }
      if (option === 'inv_normal') {
        p = parseFloat(area.value);
        if (p >= 0 && p <= 1)
          result = `x &approx; ${parseFloat(sigma.value) * critz(p) + parseFloat(mu.value)}`
      }
      if (option === 'binomial_pd') {
        p = parseFloat(p_binomial.value);
        if (p >= 0 && p <= 1) {
          if (xs.placeholder === '2')
            result = `p = ${nerdamer(`nCr(${n.value},${xs.value})*${p}^${xs.value}*(1-${p})^(${n.value}-${xs.value})`).evaluate().text()}`;
          else {
            s = '';
            arr = xs.value.split(' ');
            for (let i = 0; i < arr.length; i++)
              s += `Pr(X = ${arr[i]}) = ${nerdamer(`nCr(${n.value},${arr[i]})*${p}^${arr[i]}*(1-${p})^(${n.value}-${arr[i]})`).evaluate().text()}<br/>`;
            result = s
          }
        }
      }
      if (option === 'binomial_cd') {
        p = parseFloat(p_binomial.value);
        if (p >= 0 && p <= 1) {
          let sum = 0;
          if (xs.placeholder === '2') {
            for (let i = 0; i <= Math.abs(xs.value); i++) {
              sum += parseFloat(nerdamer(`nCr(${n.value},${i})*${p}^${i}*(1-${p})^(${n.value}-${i})`).text())
            }
            result = `p = ${sum}`
          } else {
            s = '';
            arr = xs.value.split(' ');
            for (let i = 0; i < arr.length; i++) {
              sum = 0;
              for (let j = 0; j <= Math.abs(arr[i]); j++) {
                sum += parseFloat(nerdamer(`nCr(${n.value},${j})*${p}^${j}*(1-${p})^(${n.value}-${j})`).text())
              }
              s += `Pr(X = ${arr[i]}) = ${sum}<br/>`
            }
            result = s
          }
        }
      }
      if (option === 'poisson_pd') {
        if (xs.placeholder === '2')
          result = `p &approx; ${nerdamer(`(${lambda.value}^(${xs.value}))/(${xs.value}!)*e^(-${lambda.value})`).evaluate().text()}`;
        else {
          s = '';
          arr = xs.value.split(' ');
          for (let i = 0; i < arr.length; i++)
            s += `Pr(X = ${arr[i]}) = ${nerdamer(`(${lambda.value}^(${arr[i]}))/(${arr[i]}!)*e^(-${lambda.value})`).evaluate().text()}<br/>`;
          result = s
        }
      }
      if (option === 'poisson_cd') {
        if (xs.placeholder === '2')
          result = `p &approx; ${nerdamer(`sum((${lambda.value}^x)/(x!)*e^(-${lambda.value}),x,0,abs(${xs.value}))`).evaluate().text()}`;
        else {
          s = '';
          arr = xs.value.split(' ');
          for (let i = 0; i < arr.length; i++)
            s += `Pr(X = ${arr[i]}) = ${nerdamer(`sum((${lambda.value}^x)/(x!)*e^(-${lambda.value}),x,0,abs(${arr[i]}))`).evaluate().text()}<br/>`;
          result = s
        }
      }
      output.innerHTML = `<span class="katex-display katex">${result}</span>`
    }
  })
})