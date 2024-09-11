var length = 10;

function a() {
  console.log(this.length);
}

function b(fn) {
  fn();
  console.log('arguments', arguments, 'arguments[0]', arguments[0]);
  arguments[0]();
}

b(a);