
/**
 * 
 */
function pow(n, e) {
    let res = n;
    for (let i = 1; i < e; i++) {
        res = res * n;
    }
    return res;
}

let n = 8;
let e = 9;
const res = pow(n, e);
console.log('res', res);
