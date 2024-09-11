var length = 10;

function a() {
  console.log(this.length);
}

function b(fn) {
  fn();
  arguments[0]();
}

b(a);