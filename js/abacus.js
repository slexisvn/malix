var images = document.getElementsByTagName('img');

function v041(v009 = event) {
  let charCode = (v009.charCode) ? v009.charCode : ((v009.keyCode) ? v009.keyCode : ((v009.which) ? v009.which : 0));
  if ((charCode <= 31 || (charCode >= 48 && charCode <= 57)) || (this.v026 == 'C' && (charCode >= 65 && charCode <= 70))) {
    return !0
  }
  return !1
}

function v042(v011) {
  v010 = v011;
  v012 = v010.substring(0, 1);
  v013 = v010.slice(1);
  v014 = v013.split('-');
  v015 = parseInt(v014[0]);
  v016 = parseInt(v014[1]);
  if (((v012 == "T") && (this.v017 - this.v022[v016].v020 + 1) != v015) || ((v012 == "B") && (v015 != this.v022[v016].v019 + 1))) {
    if (v012 == "T") {
      this.v022[v016].v020 = (this.v017 - v015 + 1)
    } else {
      this.v022[v016].v019 = (v015 - 1)
    }
  }
  this.v023();
  this.v024();
  return
}

function v043() {
  let value = 0;
  let v025 = "";
  if (this.v026 == "C") {
    for (i = this.v018 - 1; i >= 0; i--) {
      v028 = (this.v022[i].v019 + (this.v022[i].v020 * this.v027));
      v025 += "0123456789ABCDEF".charAt(parseInt(v028))
    }
  }
  if (this.v026 == "S") {
    for (i = this.v018 - 1; i >= 0; i--) {
      v025 += (this.v022[i].v019 + (this.v022[i].v020 * (this.v027 + 1)))
    }
  }
  number.value = v025;
  this.currentvaluestring = v025;
  this.currentvalue = parseInt(v025);
  return
}

function v044() {
  if (this.v029 == 1) {
    for (v015 = 1; v015 < this.v017 + 2; v015++) {
      for (v016 = this.v018 - 1; v016 >= 0; --v016) {
        v030 = `T${v015}-${v016}-${this.abacusname}`;
        if ((this.v017 - this.v022[v016].v020) != (v015 - 1)) {
          images[v030].src = this.v032
        } else {
          images[v030].src = this.v031
        }
      }
    }
    for (v015 = 1; v015 < this.v027 + 2; v015++) {
      for (v016 = this.v018 - 1; v016 >= 0; --v016) {
        v030 = `B${v015}-${v016}-${this.abacusname}`;
        if (v015 != this.v022[v016].v019 + 1) {
          images[v030].src = this.v032
        } else {
          images[v030].src = this.v031
        }
      }
    }
  }
  return
}

function v045(v033) {
  v034 = this.v018 - v033.length;
  v033 = "0000000000000000000000000000000000000000000000000000000000000000000000".substr(0, v034).concat(v033);
  if (this.v026 == "S") {
    for (i = v033.length; i != 0; --i) {
      v037 = v033.length - i;
      v035 = parseInt(v033.substring(i - 1, i));
      if (v035 > this.v027) {
        this.v022[v037].v020 = 1;
        this.v022[v037].v019 = v035 - this.v027 - 1
      } else {
        this.v022[v037].v020 = 0;
        this.v022[v037].v019 = v035
      }
    }
  } else if (this.v026 == "C") {
    for (i = v033.length; i != 0; --i) {
      if (!(this.currentvaluestring) || (v033.charAt(i - 1) != this.currentvaluestring.charAt(i - 1))) {
        v037 = v033.length - i;
        v035 = parseInt(v033.substring(i - 1, i), 16);
        if (v035 == this.v027 + (this.v017 * this.v027)) {
          this.v022[v037].v020 = this.v017;
          this.v022[v037].v019 = this.v027
        } else if (v035 >= this.v027) {
          this.v022[v037].v020 = Math.floor(v035 / this.v027);
          this.v022[v037].v019 = v035 - this.v027 * this.v022[v037].v020
        } else {
          this.v022[v037].v020 = 0;
          this.v022[v037].v019 = v035
        }
      }
    }
  }
  this.v023();
  this.currentvaluestring = v033;
  return
}

function v046(v022) {
  if (v022 !== undefined) {
    this.v018 = v022;
  }
  let v036 = this.v017;
  let v021 = this.v018;
  let a = `<div class=card><input id=number type=text oninput="${this.abacusname}.assignstring(number.value);" style="border:none;width:100%;outline:none;background:none;color:#fff"/></div> <button class="button ui-btn deep-purple" onclick="${this.abacusname}.reset();number.value=${this.abacusname}.currentvaluestring;return false" style="font-size:16px">Reset</button>`;
  a += "<div class=card style='background:url(../img/wooden_table.jpg) no-repeat;background-size:100% 100%'><div class=overflow><table cellpadding=0 cellspacing=0 align=center>";
  for (v015 = 0; v015 < v036 + 2; v015++) {
    a += "<tr>";
    for (v016 = v021 - 1; v016 >= 0; --v016) {
      a += "<td>";
      if (v015 == 0) {
        a += `<img src=${this.v038}>`
      } else {
        if ((this.v017 - this.v022[v016].v020) != (v015 - 1)) {
          a += `<img name='T${v015}-${v016}-${this.abacusname}' src=${this.v032} onClick=${this.abacusname}.v039(this.name)>`
        } else {
          a += `<img name='T${v015}-${v016}-${this.abacusname}' src=${this.v031} onClick=${this.abacusname}.v039(this.name)>`
        }
      }
      a += "</td>"
    }
    a += "</tr>"
  }
  a += "</table>";
  v036 = this.v027;
  a += "<table cellpadding=0 cellspacing=0 align=center>";
  for (v015 = 0; v015 < v036 + 3; v015++) {
    if (v015 == 0) a += '<tr style="line-height:6px;">';
    else a += "<tr>";
    for (v016 = v021 - 1; v016 >= 0; --v016) {
      a += "<td>";
      if (v015 == 0) {
        a += `<img src=${this.v040}>`
      } else if (v015 == v036 + 2) {
        a += `<img src=${this.basepath}>`
      } else {
        if (v015 != this.v022[v016].v019 + 1) {
          a += `<img name='B${v015}-${v016}-${this.abacusname}' src=${this.v032} onClick=${this.abacusname}.v039(this.name)>`
        } else {
          a += `<img name='B${v015}-${v016}-${this.abacusname}' src=${this.v031} onClick=${this.abacusname}.v039(this.name)>`
        }
      }
      a += "</td>"
    }
    a += "</tr>"
  }
  a += "</table></div></div>";
  output.innerHTML = a;
  number.value = this.currentvaluestring;
  this.v029 = 1;
  return
}

function v047() {
  this.assignstring("0")
}

function v048(tb, bb, bd, bu) {
  this.v017 = tb;
  this.v027 = bb;
  this.v020 = bd;
  this.v019 = bu;
  return
}

function Abacus(nm, nc, abtype, iv, imagep, beadpic, nobeadpic, basepic, middlepic, toppic) {
  this.v029 = 0;
  this.abacusname = nm;
  this.v018 = nc;
  this.imagepath = imagep;
  if (abtype == "Soroban") {
    this.v026 = "S";
    this.v017 = 1;
    this.v027 = 4
  } else {
    this.v026 = "C";
    this.v017 = 2;
    this.v027 = 5
  }
  this.v022 = new Array();
  this.currentvalue = iv;
  this.v032 = this.imagepath + beadpic;
  this.v031 = this.imagepath + nobeadpic;
  this.basepath = this.imagepath + basepic;
  this.v040 = this.imagepath + middlepic;
  this.v038 = this.imagepath + toppic;
  this.assignstring = v045;
  this.htmldraw = v046;
  this.v039 = v042;
  this.v023 = v044;
  this.v024 = v043;
  this.isallowed = v041;
  this.reset = v047;
  for (i = 0; i < this.v018; i++) {
    this.v022[i] = new v048(this.v017, this.v027, 0, 0)
  }
  this.assignstring(Number(iv).toString(10));
  return
}

function initialize_suanpan() {
  let columns = 7;
  let abacus_size = "Small";
  suanpan = new Abacus("suanpan", columns, "Suanpan", 0, "../img/", `${abacus_size}Suanpan_image_bead.png`, `${abacus_size}Soroban_image_nobead.png`, `${abacus_size}Soroban_image_bottomborder.png`, `${abacus_size}Soroban_image_middlesep.png`, `${abacus_size}Soroban_image_top.png`);
  return
}

function initialize_soroban() {
  let columns = 7;
  let abacus_size = "Small";
  soroban = new Abacus("soroban", columns, "Soroban", 0, "../img/", `${abacus_size}Soroban_image_bead.png`, `${abacus_size}Soroban_image_nobead.png`, `${abacus_size}Soroban_image_bottomborder.png`, `${abacus_size}Soroban_image_middlesep.png`, `${abacus_size}Soroban_image_top.png`);
  return
}

initialize_soroban();
initialize_suanpan();

if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Bàn tính';
  select.options[0].text = 'Trung Quốc';
  select.options[1].text = 'Nhật Bản';
}

suanpan.htmldraw(7);
select.onchange = function() {
  if (select.value === 'suanpan') {
    suanpan.htmldraw(7);
  }
  if (select.value === 'soroban') {
    soroban.htmldraw(7);
  }
}