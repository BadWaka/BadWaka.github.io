function* g() {
    let o = 1;
    yield o++;
    yield o++;
    yield o++;
}

const a = g();
console.log(a.next());

function b() {
    let o = 1;
    return o++;
}
console.log(b());