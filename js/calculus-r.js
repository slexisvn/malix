if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Giải tích';
  let lb = document.getElementsByTagName('label');
  let _vi = ['Giới hạn', 'Đạo hàm', 'Nguyên hàm', 'Tích phân', 'Khai triển Taylor', 'Biểu thức', 'Theo', 'Tại', 'Cận dưới', 'Cận trên'];
  for (let i = 0; i < 5; i++) {
    select.options[i].text = _vi[i];
    lb[i + 1].innerHTML = _vi[i + 5];
  }
  for (let i = 0; i < 3; i++) {
    nth_diff.options[i].text = `Đạo hàm bậc ${i + 1}`;
  }
}
$.getScript('../js/algebra.js', function() {
  $.getScript('../js/calculus.js', function() {

    $('#input').textcomplete([{
      match: /(^|\b)(\w{1,})$/,
      search: function(term, callback) {
        callback($.map(_W_, word => word.includes(term) ? word : null));
      },
      replace: function(word) {
        return [`${word}(`, ')']
      }
    }]);

    let option = select.value;

    $('.defint_area, #nth_diff-button').hide();

    $('#select').on('change', function() {
      option = $(this).val();
      if (option === 't') {
        $('#nth_diff-button, .at_area').hide();
        $('.defint_area').show();
      }
      if (option === 'l' || option === 'e') {
        $('.defint_area, #nth_diff-button').hide();
        $('.at_area').show();
      }
      if (option === 'i') {
        $('.defint_area, #nth_diff-button, .at_area').hide();
      }
      if (option === 'd') {
        $('.defint_area').hide();
        $('#nth_diff-button, .at_area').show();
      }
    });

    calc.onclick = function() {
      let IV = input.value;
      let I;
      let eq;
      let approx = '';
      let AV = at.value.replace('oo', 'Infinity');
      let VV = variable.value;
      if (option === 'l') {
        I = nerdamer(`limit(${IV},${VV},${AV})`).latex();
        approx = I[0];
        eq = I[1];
      }

      if (option === 'd') {
        let diff = nerdamer(`diff(${IV},${VV},${nth_diff.value})`);
        if (AV === '') {
          eq = diff.toTeX();
        } else {
          I = diff.sub(VV, AV).latex();
          approx = I[0];
          eq = I[1];
        }
      }

      if (option === 'i') {
        eq = nerdamer(`integrate(${IV},${VV})`).toTeX();
        eq = !eq.includes('int') ? `${eq}+C` : eq;
      }

      if (option === 't') {
        I = nerdamer(`defint(${IV},${from.value},${to.value},${VV})`).latex();
        if (I[1].includes('int')) {
          eq = I[0];
          approx = ''
        } else {
          approx = I[0];
          eq = I[1];
        } 
      }

      if (option === 'e') {
        approx = eq = '';
        if (AV === '') {
          AV = '0'
        }
        for (let i = 0; i < 10; i++) {
          eq += i ? `${nerdamer(`diff(${IV},${VV},${i})/fact(${i})*(b-${AV})^${i}`).sub(VV, AV).toString()}+` : `${nerdamer(IV).sub(VV, AV).toString()}+`;
        }

        eq = `...\\:${nerdamer(eq.replace(/\+$/g, '').replace(/b/g, VV)).toTeX()}`;
      }

      if (eq !== 'big') {
        eq_output.style.display = 'block';
        eq_output.innerHTML = katex.renderToString(eq, {
          displayMode: true
        });
      } else {
        eq_output.style.display = 'none';
      }

      if (approx.includes('.')) {
        happrox_output.style.display = 'block';
        happrox_output.innerHTML = katex.renderToString(approx.replace(/\*/g, ''), {
          displayMode: true
        })
      } else {
        happrox_output.style.display = 'none';
      }
    }
  })
})