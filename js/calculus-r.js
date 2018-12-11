if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Giải tích';
  for (let i = 0; i < 3; i++) {
    select_deg.options[i].text = `Đạo hàm bậc ${i + 1}`;
  }
  let lb = document.getElementsByTagName('label');
  lb[1].innerHTML = 'Biểu thức';
  lb[2].innerHTML = 'Theo';
  lb[3].innerHTML = 'Tại';
  lb[4].innerHTML = 'Cận dưới';
  lb[5].innerHTML = 'Cận trên';
}
$.getScript('../js/algebra.js', function() {
  $.getScript('../js/calculus.js', function() {

    $('#input').textcomplete([{
      match: /(^|\b)(\w{1,})$/,
      search: function(term, callback) {
        var words = ['cos', 'sin', 'tan', 'cot', 'ln', 'sqrt', 'asin', 'acos', 'atan'];
        callback($.map(words, function(word) {
          return word.indexOf(term) === 0 ? word : null;
        }));
      },
      replace: function(word) {
        return `${word}()`
      }
    }]);

    let option = select.value;

    $('.defint_area, #select_deg-button').hide();

    $('#select').on('change', function() {
      option = $(this).val();
      if (option === 't') {
        $('#select_deg-button, .at_area').hide();
        $('.defint_area').show();
      }
      if (option === 'l' || option === 'e') {
        $('.defint_area, #select_deg-button').hide();
        $('.at_area').show();
      }
      if (option === 'i') {
        $('.defint_area, #select_deg-button, .at_area').hide();
      }
      if (option === 'd') {
        $('.defint_area').hide();
        $('#select_deg-button, .at_area').show();
      }
    });

    cal.onclick = function() {
      let Input = input.value;
      let result = '';
      let b = at.value;
      let v = variable.value;
      if (option === 'l') {
        if (b.includes('oo')) {
          if (b === '+oo') {
            b = '10^9';
          }
          if (b === '-oo') {
            b = '-10^9';
          }
        } else {
          if (b.search(/\+|-/g) > -1) {
            b += '10^(-9)';
          } else {
            b += '+10^(-9)';
          }
        }
        let num = parseFloat(nerdamer(Input).sub(v, b).evaluate().text());
        if (num > 100000000.0) {
          result = '+\\infty';
        } else if (num < -100000000.0) {
          result = '-\\infty';
        } else {
          if (num.toExponential().toString().includes('e-')) {
            result = '0';
          } else {
            result = `\\approx ${num}`;
          }
        }
      }

      if (option === 'd') {
        result = nerdamer(`diff(${Input},${v},${select_deg.value})`);
        if (b === '') {
          result = result.toTeX();
        } else {
          result = result.sub(v, b);
          let approx = `\\approx ${result.evaluate().text()}`;
          result = result.toTeX();
          if (approx.includes('.')) {
            result += approx;
          }
        }
      }

      if (option === 'i') {
        result = nerdamer(`integrate(${Input},${v})`).toTeX();
        if (!result.includes('int')) {
          result += '+C';
        } else {
          result = '';
        }
      }

      if (option === 't') {
        result = nerdamer(`defint(${Input},${from.value},${to.value},${v})`);
        let approx_result = result.evaluate().text();
        result = result.toTeX();
        if (!approx_result.includes('*')) {
          if (+result.substr(7, result.indexOf('}{') - 7) > 1000 || result.includes('int')) {
            result = `\\approx ${approx_result}`;
          } else {
            result += `\\approx ${approx_result}`;
          }
        }
      }

      if (option === 'e') {
        result = '';
        if (b === '') {
          b = '0'
        }
        for (let i = 0; i < 10; i++) {
          result += i ? `${nerdamer(`diff(${Input},${v},${i})/fact(${i})*(b-${b})^${i}`).sub(v, b).toString()}+` : `${nerdamer(Input).sub(v, b).toString()}+`;
        }

        result = `...\\:${nerdamer(result.replace(/\+$/g, '').replace(/b/g, v)).toTeX()}`;
      }

      output.innerHTML = katex.renderToString(result.replace(/\\cdot(?= \\| [a-z])/g, '').replace(/log/g, 'ln'), {
        displayMode: true
      });

    }
  })
})