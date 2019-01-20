var core = nerdamer.getCore();
var _ = core.PARSER;
var Vector = core.Vector;
var Symbol = core.Symbol;
var Math2 = core.Math2;
var Matrix = core.Matrix;
var MATH = core.Utils.importFunctions();
var ASCII = ['A', 'B', 'C', 'D'];
var _W_ = ['abs', 'sqrt', 'nthroot', 'ln', 'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'sec', 'csc', 'cot', 'asec', 'acsc', 'acot', 'cosh', 'sinh', 'tanh', 'sech', 'csch', 'coth', 'acosh', 'asinh', 'atanh', 'asech', 'acsch', 'acoth'];

function binom(n, k) {
  return Math2.factorial(n) / (Math2.factorial(k) * Math2.factorial(n - k))
}

function nCr(n, k) {
  return _.parse(binom(n, k))
}

nerdamer.register([{
  name: 'nCr',
  numargs: 2,
  visible: !0,
  build: function() {
    return nCr
  }
}]);