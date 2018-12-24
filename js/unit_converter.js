if (LN === 'vi') {
  let _vi = ['Nhiệt độ', 'Độ dài', 'Khối lượng', 'Diện tích', 'Thể tích', 'Tốc độ', 'Áp suất', 'Lực', 'Năng lượng', 'Sức mạnh', 'Cơ số', 'Hệ thống chữ số'];
  let lb = document.getElementsByTagName('label');
  document.getElementsByClassName('title')[1].innerHTML = 'Đổi đơn vị';
  lb[1].innerHTML = 'Từ';
  lb[2].innerHTML = 'Sang';
  for (let i = 0; i < 12; i++) {
    quantity_select.options[i].text = _vi[i];
  }
}

function check(ele1, ele2, arr) {
  return arr.includes(ele1) && arr.includes(ele2) ? true : false;
}

function num_systems_function(f, t, str) {
  let fw = LN === 'vi' ? 'Số Ả Rập' : 'Arabic numerals';
  let tw = LN === 'vi' ? 'Số La Mã' : 'Roman numerals';
  let result = '';
  let num = 0;
  if (f === fw && t === tw) {
    num = +str;
    while (num >= 1000) {
      num -= 1000;
      result += 'M'
    }
    if (num >= 900) {
      num -= 900;
      result += 'CM'
    }
    if (num >= 500) {
      num -= 500;
      result += 'D'
    }
    if (num >= 400) {
      num -= 400;
      result += 'CD'
    }
    while (num >= 100) {
      num -= 100;
      result += 'C'
    }
    if (num >= 90) {
      num -= 90;
      result += 'XC'
    }
    if (num >= 50) {
      num -= 50;
      result += 'L'
    }
    if (num >= 40) {
      num -= 40;
      result += 'XL'
    }
    while (num >= 10) {
      num -= 10;
      result += 'X'
    }
    if (num >= 9) {
      num -= 9;
      result += 'IX'
    }
    if (num >= 5) {
      num -= 5;
      result += 'V'
    }
    if (num >= 4) {
      num -= 4;
      result += 'IV'
    }
    while (num >= 1) {
      num -= 1;
      result += 'I'
    }
  } else if (f === tw && t === fw) {
    let num_arr = [];
    let err = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === 'I')
        num_arr[i] = 1;
      else if (str.charAt(i) === 'V')
        num_arr[i] = 5;
      else if (str.charAt(i) === 'X')
        num_arr[i] = 10;
      else if (str.charAt(i) === 'L')
        num_arr[i] = 50;
      else if (str.charAt(i) === 'C')
        num_arr[i] = 100;
      else if (str.charAt(i) === 'D')
        num_arr[i] = 500;
      else if (str.charAt(i) === 'M')
        num_arr[i] = 1000;
      else err = 1
    }
    if (err === 0) {
      num = num_arr[str.length - 1];
      for (let i = str.length - 1; i > 0; i--) {
        if (num_arr[i] > num_arr[i - 1])
          num -= num_arr[i - 1];
        else if (num_arr[i] === num_arr[i - 1] || num_arr[i] < num_arr[i - 1])
          num += num_arr[i - 1]
      }
      result = num.toString()
    }
  } else {
    result = str;
  }
  return result;
}

function base_function(f, t, str) {
  let number_array = [2, 8, 10, 16];
  let f_num = number_array[base.indexOf(f)];
  let t_num = number_array[base.indexOf(t)];
  let arr = str.replace(/\W/g, ' ').split(' ');
  let arr_m = [...arr];
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i], f_num).toString();
    str = str.replace(arr_m[i], arr[i])
  }
  str = parseFloat(nerdamer(str).text()).toString(t_num).toUpperCase();
  if (str !== 'NAN') {
    return str;
  }
  return '';
}

var quantity = ['temp', 'length', 'weight', 'area', 'volume', 'speed', 'press', 'force', 'work', 'power', 'base', 'num_systems'];
var temp = ['C', 'F', 'K'];
var unit = {
  length: ['mm', 'cm', 'dm', 'm', 'inch', 'ft', 'yd', 'mile', 'km', 'NM'],
  area: ['mm²', 'cm²', 'dm²', 'm²', 'in²', 'ft²', 'yd²', 'a', 'ha', 'km²', 'acre', 'mile²'],
  weight: ['mg', 'g', 'kg', 'lb (pound)', 'oz', 'oz t', 'grain', 'tonne', 'ton (UK)', 'ton (US)', 'stone (UK)', 'cwt', 'carat'],
  volume: ['ml (cc)', 'cl', 'dl', 'l', 'mm³', 'cm³', 'dm³', 'm³', 'in³', 'ft³', 'yd³', 'gal (UK)', 'gal (US)', 'bbl', 'pt (UK)', 'pt (US)', 'fl oz (US)'],
  speed: ['m/s', 'ft/s', 'km/s', 'm/min', 'ft/min', 'km/min', 'km/h', 'mi/h (mph)', 'knot', 'mach', 'min/km', 'min/mile'],
  press: ['atm', 'Pa', 'hpa (mbar)', 'kPa', 'MPa', 'bar', 'psi (lbf/in²)', 'psf (lbf/ft²)', 'ksi', 'kgf/cm²', 'kgf/m²', 'mmHg (Torr)', 'inchHg', 'mmH₂O', 'cmH₂O', 'inchH₂O', 'mTorr'],
  force: ['N', 'daN', 'kN', 'kgf', 'lbf', 'kip', 'dyn'],
  work: ['J', 'kJ', 'cal', 'kcal(Cal)', 'kW•h', 'kgf•m', 'in•lbf', 'ft•lbf', 'Btu', 'toe'],
  power: ['W', 'kW', 'MW', 'kcal/s', 'kcal/h', 'HP', 'PS', 'BTU/h', 'TR']
};
var vch = {
  length: [1, 0.1, 0.01, 0.00001, 0.03937007874, 0.0032808399, 0.0010936133, 6.21371192e-7, 0.000001, 5.39956803e-7],
  area: [1, 0.01, 0.0001, 0.000001, 0.0015500031, 0.0000107639104, 0.00000119599, 1e-8, 1e-10, 1e-12, 2.4711e-10, 3.861e-13],
  weight: [1, 0.001, 0.000001, 0.00000220462262, 0.0000352739619, 0.0000321507566, 0.01543235835, 1e-9, 9.842065300000001e-10, 1.1023113100000001e-9, 1.57473044e-7, 1.96841306e-8, 0.005],
  volume: [1, 0.1, 0.01, 0.001, 1000, 1, 0.001, 0.000001, 0.0610237441, 0.000035314666700000004, 0.00000130795062, 0.00021996924900000002, 0.000264172052, 0.00000628981077, 0.00175975399, 0.0021133764199999998, 0.0338140227],
  speed: [1, 3.28084, 0.001, 60, 196.850394, 0.06, 3.6, 2.236936, 1.943844, 0.002941, 16.666667, 26.8224],
  press: [1, 101325, 1013.25, 101.325, 0.101325, 1.01325, 14.69595, 2116.2168, 0.014696, 1.033227, 10332.27, 760, 29.92126, 10332.2676, 1033.22676, 406.782189, 760000],
  force: [1, 0.1, 0.001, 0.1019716213, 0.2248089431, 0.00022480894309999998, 100000],
  work: [1, 0.001, 0.239007361, 0.000239007361, 2.7778e-7, 0.1019716213, 8.850746, 0.7375621493, 0.00094781712, 2.38846e-11],
  power: [1, 0.001, 0.000001, 0.000239005736, 0.8604206501, 0.001341021859, 0.001359619307, 3.412141633, 0.000284535493]
};
var base = LN === 'vi' ? ['Hệ nhị phân', 'Hệ bát phân', 'Hệ thập phân', 'Hệ thập lục phân'] : ['Binary', 'Octal', 'Decimal', 'Hexadecimal'];
var num_systems = LN === 'vi' ? ['Số Ả Rập', 'Số La Mã'] : ['Arabic numerals', 'Roman numerals'];

quantity_select.onchange = function() {
  let option = this.value;
  let option_tag = '';
  let li_tag = '';
  unit.temp = temp;
  unit.base = base;
  unit.num_systems = num_systems;
  $('#from, #to, #from-button, #to-button, #from-menu, #to-menu').html('');
  for (let i = 0; i < quantity.length; i++) {
    if (option === quantity[i]) {
      for (let j = 0, e = unit[option]; j < e.length; j++) {
        option_tag += `<option value="${e[j]}">${e[j]}</option>`;
        li_tag += j === 0 ? `<li data-option-index="0" data-icon="false" class="ui-first-child" role="option" aria-selected="true"><a href="#" tabindex="-1" class="ui-btn ui-btn-active">${e[j]}</a></li>` : j === e.length - 1 ? `<li data-option-index="${j}" data-icon="false" class="ui-last-child" role="option" aria-selected="false"><a href="#" tabindex="-1" class="ui-btn">${e[j]}</a></li>` : `<li data-option-index="${j}" data-icon="false" class="" role="option" aria-selected="false"><a href="#" tabindex="-1" class="ui-btn">${e[j]}</a></li>`
      }
      $('#from, #to').html(option_tag);
      $('#from-button, #to-button').html(`<span>${unit[option][0]}</span>`);
      $('#from-menu, #to-menu').html(li_tag);
    }
  }
  $('#input').val('');
  $('.ui-input-clear').addClass('ui-input-clear-hidden');
  output.innerHTML = `<span class="katex-display katex">&nbsp;</span>`
}

function main() {
  let result = input.value;
  if (result !== '') {
    let f = from.value;
    let t = to.value;
    let option = quantity_select.value;
    let err = 0;
    delete unit.temp;
    delete unit.base;
    delete unit.num_systems;

    if (option === 'base') {
      result = base_function(f, t, result);
    } else if (option === 'num_systems') {
      result = num_systems_function(f, t, result);
    } else {
      for (let i in unit) {
        if (check(f, t, unit[i])) {
          if (f != unit[i][0]) {
            result /= vch[i][unit[i].indexOf(f)];
          }
          if (t != unit[i][0]) {
            result *= vch[i][unit[i].indexOf(t)];
          }
          err++
        }
      }

      if (check(f, t, temp)) {
        if (f != 'C') {
          if (f == 'F') {
            result = (5.0 / 9.0) * (result - 32.0);
          }
          if (f == 'K') {
            result -= 273.15
          }
        }
        if (t != 'C') {
          if (t == 'F') {
            result = (9.0 / 5.0) * result + 32.0;
          }
          if (t == 'K') {
            result += 273.15
          }
        }
        err++
      }

      if (err === 0) {
        result = ''
      }
    }
    output.innerHTML = `<span class="katex-display katex">${result}</span>`
  }
}

input.oninput = function() {
  main();
}

$('#from, #to').on('change', function() {
  main();
})