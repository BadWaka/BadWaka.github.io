
/**
 * 遍历 n 次，每次拼一个 9，拼出一个字符串
 * 把这个字符串转换为数字，然后遍历输出
 */
function printMaxN(n) {
    let maxStr = '';
    for (let i = 0; i < n; i++) {
        maxStr += '9';
    }
    const max = parseInt(maxStr, 10);
    let arr = [];
    console.log('max', max);
    for (let i = 1; i <= max; i++) {
        arr.push(i);
        // console.log(i);
    }
    return arr;
}

let n = 8;
const res = printMaxN(n);
console.log('res', res);
