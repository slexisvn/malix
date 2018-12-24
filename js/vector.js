if (LN === 'vi') {
  select1.options[0].text = 'Nhập các vector';
  select1.options[1].text = 'Tính toán';
  document.getElementsByTagName('label')[5].innerHTML = 'Biểu thức';
}

function angle(a, b) {
  return MATH.acos(_.divide(vec1.dot(vec2), _.multiply(MATH.abs(vec1), MATH.abs(vec2))));
}

function pointM(a, b) {
  return _.divide(_.add(a, b), new Symbol(2))
}

function pointG(a, b, c) {
  return _.divide(_.add(_.add(a, b), c), new Symbol(3))
}

function pointH(a, b, c) {
  let C = MATH.abs(_.subtract(a.clone(), b.clone()));
  let A = MATH.abs(_.subtract(b.clone(), c.clone()));
  let B = MATH.abs(_.subtract(c.clone(), a.clone()));
  let D = _.divide(new Symbol(1), _.subtract(_.add(_.pow(B, new Symbol(2)), _.pow(C, new Symbol(2))), _.pow(A, new Symbol(2))));
  let E = _.divide(new Symbol(1), _.subtract(_.add(_.pow(C, new Symbol(2)), _.pow(A, new Symbol(2))), _.pow(B, new Symbol(2))));
  let F = _.divide(new Symbol(1), _.subtract(_.add(_.pow(A, new Symbol(2)), _.pow(B, new Symbol(2))), _.pow(C, new Symbol(2))));
  return _.divide(_.add(_.add(_.multiply(D, a), _.multiply(E, b)), _.multiply(F, c)), _.add(_.add(D, E), F))
}

function pointI(a, b, c) {
  let C = MATH.abs(_.subtract(a.clone(), b.clone()));
  let A = MATH.abs(_.subtract(b.clone(), c.clone()));
  let B = MATH.abs(_.subtract(c.clone(), a.clone()));
  return _.divide(_.add(_.add(_.multiply(A, a), _.multiply(B, b)), _.multiply(C, c)), _.add(_.add(A, B), C))
}

function pointO(a, b, c) {
  let C = MATH.abs(_.subtract(a.clone(), b.clone()));
  let A = MATH.abs(_.subtract(b.clone(), c.clone()));
  let B = MATH.abs(_.subtract(c.clone(), a.clone()));
  let D = _.multiply(_.pow(A, new Symbol(2)), _.subtract(_.add(_.pow(B, new Symbol(2)), _.pow(C, new Symbol(2))), _.pow(A, new Symbol(2))));
  let E = _.multiply(_.pow(B, new Symbol(2)), _.subtract(_.add(_.pow(C, new Symbol(2)), _.pow(A, new Symbol(2))), _.pow(B, new Symbol(2))));
  let F = _.multiply(_.pow(C, new Symbol(2)), _.subtract(_.add(_.pow(A, new Symbol(2)), _.pow(B, new Symbol(2))), _.pow(C, new Symbol(2))));
  return _.divide(_.add(_.add(_.multiply(D, a), _.multiply(E, b)), _.multiply(F, c)), _.add(_.add(D, E), F))
}

function line(a, b) {
  let h = new Vector();
  let l = new Vector();
  for (let i = 0; i < 2; i++) {
    h.elements.push(a.elements[i].clone());
    l.elements.push(b.elements[i].clone());
  }
  h.elements.push(new Symbol(1));
  l.elements.push(new Symbol(1));
  return h.cross(l);
}

function plane(a, b, c) {
  let nVec = _.subtract(b.clone(), a.clone()).cross(_.subtract(c.clone(), a.clone()));
  nVec.elements.push(_.multiply(nVec.dot(a), new Symbol(-1)))
  return nVec
}

function projP(a, b, D) {
  let t = _.divide(_.multiply(_.add(a.dot(b), D), new Symbol(-1)), _.pow(MATH.abs(b), new Symbol(2)));
  return _.add(a, _.multiply(t, b))
}

function projL(a, b, c) {
  let t = _.divide(b.dot(_.subtract(a.clone(), c.clone())), _.pow(MATH.abs(b), new Symbol(2)));
  return _.add(c, _.multiply(t, b))
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

function __2_a(str) {
  let arr = str.replace(/\[|\]/g, '').split(',').map(parseFloat);
  let lcm = arr.reduce(Math2.LCM);
  return arr.map(x => x / lcm);
}

$('#select1').on('change', function() {
  $('.content').addClass('hide');
  $(`#${$(this).val()}`).removeClass('hide');
});

$('#input').textcomplete([{
  match: /(^|\b)(\w{1,})$/,
  search(term, callback) {
    callback($.map(['line', 'abs', 'dot', 'cross', 'angle', 'vecA', 'vecB', 'vecC', 'vecD', 'pointM', 'pointG', 'pointH', 'pointI', 'pointO', 'plane', 'projP', 'projL'], word => word.includes(term) ? word : null))
  },
  replace(word) {
    return word.includes('vec') ? word : `${word}()`
  }
}]);

select.onchange = function() {
  let __cr_ = ''; 
  for (let i = 0; i < 4; i++) {
    __cr_ += `<label>Vector ${ASCII[i]}</label>`
    for (let j = 0, l = this.value; j < l; j++) {
      __cr_ += `<input type="text" data-role="none" class="input" id="${ASCII[i]}${j}" /> &nbsp;`
    }
    if (i < 3) {
      __cr_ += '<br /><br />';
    }
  }
  vector_input.innerHTML = __cr_;
}

cal.onclick = function() {
  nerdamer.clearVars();
  let option = parseInt(select.value);
  let IV = input.value;
  let vec = {
    A: '[',
    B: '[',
    C: '[',
    D: '['
  };
  for (let c = 0; c < 4; c++) {
    if (IV.includes(ASCII[c])) {
      for (let i = 0; i < option; i++) {
        vec[ASCII[c]] += document.getElementById(`${ASCII[c]}${i}`).value;
        if (i < option - 1) {
          vec[ASCII[c]] += ','
        }
      }
      nerdamer.setVar(`vec${ASCII[c]}`, vec[ASCII[c]] + ']');
    }
  }
  let result = nerdamer(IV).toTeX();
  if (IV.includes('plane')) {
    let arr = __2_a(result);
    result = nerdamer(`${arr[0]}x+${arr[1]}y+${arr[2]}z+${arr[3]}`).toTeX()
  } else if (IV.includes('line')) {
    let arr = __2_a(result);
    result = nerdamer(`${arr[0]}x+${arr[1]}y+${arr[2]}`).toTeX()
  } else {
    result = result.replace(/\[/g, '\\left(').replace(/\]/g, '\\right)').replace(/,/g, ';\\:')
  }
  output.innerHTML = katex.renderToString(result, {
    displayMode: !0
  })
}