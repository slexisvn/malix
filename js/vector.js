if (LN === 'vi') {
  select1.options[0].text = 'Nhập vector';
  select1.options[1].text = 'Tính toán';
  document.getElementsByTagName('label')[1].innerHTML = 'Biểu thức';
}

function angle(vec1, vec2) {
  return MATH.acos(_.divide(vec1.dot(vec2), _.multiply(MATH.abs(vec1), MATH.abs(vec2))))
}

function pointM(vec1, vec2) {
  return _.divide(_.add(vec1, vec2), new Symbol(2))
}

function pointG(vec1, vec2, vec3) {
  return _.divide(_.add(_.add(vec1, vec2), vec3), new Symbol(3))
}

function pointH(vec1, vec2, vec3) {
  let C = MATH.abs(_.subtract(vec1.clone(), vec2.clone()));
  let A = MATH.abs(_.subtract(vec2.clone(), vec3.clone()));
  let B = MATH.abs(_.subtract(vec3.clone(), vec1.clone()));
  let D = _.divide(new Symbol(1), _.subtract(_.add(_.pow(B, new Symbol(2)), _.pow(C, new Symbol(2))), _.pow(A, new Symbol(2))));
  let E = _.divide(new Symbol(1), _.subtract(_.add(_.pow(C, new Symbol(2)), _.pow(A, new Symbol(2))), _.pow(B, new Symbol(2))));
  let F = _.divide(new Symbol(1), _.subtract(_.add(_.pow(A, new Symbol(2)), _.pow(B, new Symbol(2))), _.pow(C, new Symbol(2))));
  return _.divide(_.add(_.add(_.multiply(D, vec1), _.multiply(E, vec2)), _.multiply(F, vec3)), _.add(_.add(D, E), F))
}

function pointI(vec1, vec2, vec3) {
  let C = MATH.abs(_.subtract(vec1.clone(), vec2.clone()));
  let A = MATH.abs(_.subtract(vec2.clone(), vec3.clone()));
  let B = MATH.abs(_.subtract(vec3.clone(), vec1.clone()));
  return _.divide(_.add(_.add(_.multiply(A, vec1), _.multiply(B, vec2)), _.multiply(C, vec3)), _.add(_.add(A, B), C))
}

function pointO(vec1, vec2, vec3) {
  let C = MATH.abs(_.subtract(vec1.clone(), vec2.clone()));
  let A = MATH.abs(_.subtract(vec2.clone(), vec3.clone()));
  let B = MATH.abs(_.subtract(vec3.clone(), vec1.clone()));
  let D = _.multiply(_.pow(A, new Symbol(2)), _.subtract(_.add(_.pow(B, new Symbol(2)), _.pow(C, new Symbol(2))), _.pow(A, new Symbol(2))));
  let E = _.multiply(_.pow(B, new Symbol(2)), _.subtract(_.add(_.pow(C, new Symbol(2)), _.pow(A, new Symbol(2))), _.pow(B, new Symbol(2))));
  let F = _.multiply(_.pow(C, new Symbol(2)), _.subtract(_.add(_.pow(A, new Symbol(2)), _.pow(B, new Symbol(2))), _.pow(C, new Symbol(2))));
  return _.divide(_.add(_.add(_.multiply(D, vec1), _.multiply(E, vec2)), _.multiply(F, vec3)), _.add(_.add(D, E), F))
}

function line(vec1, vec2) {
  let h = new Vector();
  let l = new Vector();
  for (let i = 0; i < 2; i++) {
    h.elements.push(vec1.elements[i].clone());
    l.elements.push(vec2.elements[i].clone());
  }
  h.elements.push(new Symbol(1));
  l.elements.push(new Symbol(1));
  return h.cross(l);
}

function plane(vec1, vec2, vec3) {
  let nVec = _.subtract(vec2.clone(), vec1.clone()).cross(_.subtract(vec3.clone(), vec1.clone()));
  return [nVec, _.multiply(nVec.dot(vec1), new Symbol(-1))]
}

function projP(vec1, vec2, D) {
  let t = _.divide(_.multiply(_.add(vec1.dot(vec2), D), new Symbol(-1)), _.pow(MATH.abs(vec2), new Symbol(2)));
  return _.add(vec1, _.multiply(t, vec2))
}

function projL(vec1, vec2, vec3) {
  let t = _.divide(vec2.dot(_.subtract(vec1.clone(), vec3.clone())), _.pow(MATH.abs(vec2), new Symbol(2)));
  return _.add(vec3, _.multiply(t, vec2))
}

nerdamer.register([{
  name: 'angle',
  numargs: 2,
  visible: !0,
  build: function() {
    return angle
  }
}, {
  name: 'pointM',
  numargs: 2,
  visible: !0,
  build: function() {
    return pointM
  }
}, {
  name: 'pointG',
  numargs: 3,
  visible: !0,
  build: function() {
    return pointG
  }
}, {
  name: 'pointH',
  numargs: 3,
  visible: !0,
  build: function() {
    return pointH
  }
}, {
  name: 'pointI',
  numargs: 3,
  visible: !0,
  build: function() {
    return pointI
  }
}, {
  name: 'pointO',
  numargs: 3,
  visible: !0,
  build: function() {
    return pointO
  }
}, {
  name: 'line',
  numargs: 2,
  visible: !0,
  build: function() {
    return line
  }
}, {
  name: 'plane',
  numargs: 3,
  visible: !0,
  build: function() {
    return plane
  }
}, {
  name: 'projP',
  numargs: 3,
  visible: !0,
  build: function() {
    return projP
  }
}, {
  name: 'projL',
  numargs: 3,
  visible: !0,
  build: function() {
    return projL
  }
}]);

function simplyfiArr(arr1) {
  let arr2 = arr1.map(parseFloat);
  let h = 1;
  for (let i = 0; i < arr2.length; i++) {
    h = Math2.LCM(h, arr2[i]);
  }
  return arr2.map(x => x / h);
}

$('#select1').on('change', function() {
  $('.content').hide();
  $(`#${$(this).val()}`).show()
});

$('#input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    let words = ['line', 'abs', 'dot', 'cross', 'angle', 'vecA', 'vecB', 'vecC', 'vecD', 'pointM', 'pointG', 'pointH', 'pointI', 'pointO', 'plane', 'projP', 'projL'];
    callback($.map(words, word => word.indexOf(term) === 0 ? word : null))
  },
  replace(word) {
    if (word.includes('vec')) {
      return word
    } else {
      return `${word}()`
    }
  }
}]);

let vecA, vecB, vecC, vecD;

function create(n) {
  vecA = vecB = vecC = vecD = '';
  for (let i = 0; i < n; i++) {
    vecA += `<input type="text" data-role="none" class="input" id="a${i}" /> &nbsp;`;
    vecB += `<input type="text" data-role="none" class="input" id="b${i}" /> &nbsp;`;
    vecC += `<input type="text" data-role="none" class="input" id="c${i}" /> &nbsp;`;
    vecD += `<input type="text" data-role="none" class="input" id="d${i}" /> &nbsp;`;
  }

  input_vector.innerHTML = `<label>Vector A</label>${vecA}<br /><br /><label>Vector B</label>${vecB}<br /><br /><label>Vector C</label>${vecC}<br /><br /><label>Vector D</label>${vecD}`
}

create(2); //init

select.onchange = function() {
  create(this.value);
}

cal.onclick = function() {
  let option = select.value;
  vecA = vecB = vecC = vecD = '[';

  if (a0.value !== '') {
    for (let i = 0; i < option; i++) {
      vecA += document.getElementById(`a${i}`).value;
      if (i < option - 1) {
        vecA += ','
      }
    }
  }
  vecA += ']';

  if (b0.value !== '') {
    for (let i = 0; i < option; i++) {
      vecB += document.getElementById(`b${i}`).value;
      if (i < option - 1) {
        vecB += ','
      }
    }
  }
  vecB += ']';

  if (c0.value !== '') {
    for (let i = 0; i < option; i++) {
      vecC += document.getElementById(`c${i}`).value;
      if (i < option - 1) {
        vecC += ','
      }
    }
  }
  vecC += ']';

  if (d0.value !== '') {
    for (let i = 0; i < option; i++) {
      vecD += document.getElementById(`d${i}`).value;
      if (i < option - 1) {
        vecD += ','
      }
    }
  }
  vecD += ']';

  nerdamer.clearVars();
  nerdamer.setVar('vecA', vecA);
  nerdamer.setVar('vecB', vecB);
  nerdamer.setVar('vecC', vecC);
  nerdamer.setVar('vecD', vecD);

  let Input = input.value;
  let result = nerdamer(Input).toTeX();

  if (Input.includes('plane')) {
    let arr = simplyfiArr(result.replace(/ |\\left|\\,|\\right|\[|\]/g, '').split(','));
    result = nerdamer(`${arr[0]}x+${arr[1]}y+${arr[2]}z+${arr[3]}`).toTeX()
  } else if (Input.includes('line')) {
    let arr = simplyfiArr(result.replace(/\[|\]/g, '').split(','));
    result = nerdamer(`${arr[0]}x+${arr[1]}y+${arr[2]}`).toTeX()
  } else {
    result = result.replace(/\[/g, '\\left(').replace(/\]/g, '\\right)').replace(/,/g, ';\\:')
  }
  output.innerHTML = katex.renderToString(result.replace(/,$|\\cdot(?= \\| [a-z])/g, ''), {
    displayMode: !0
  })
}