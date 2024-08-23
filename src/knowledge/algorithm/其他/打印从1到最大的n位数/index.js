
/**
 * 遍历 n 次，每次拼一个 9，拼出一个字符串
 * 把这个字符串转换为数字，然后遍历输出
 *
 * 需要考虑大数 n 特别大的时候
 */
function printMaxN1(n) {
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

/**
 * 全排列 递归思路
 *
 * 先输出第一位的，每一位有 0-9 9 种可能，再递归输入剩下的每一位的
 * 终止条件就是长度等于 n
 */
function printMaxN(n) {

    function recursion(str) {
        if (str.length === n) {
            console.log('str', str);
            return;
        }
        for (let i = 0; i <= 9; i++) {
            const newStr = str + '' + i;
            recursion(newStr);
        }
    }

    recursion('', 0);

}

let n = 2;
const res = printMaxN(n);
console.log('res', res);
