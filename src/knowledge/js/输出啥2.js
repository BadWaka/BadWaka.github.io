const p = new Promise(res => {
    res(1);
});
async function r1() {
    return p;
}
function r2() {
    return Promise.resolve(p);
}
console.log(p === r1(), p === r2());