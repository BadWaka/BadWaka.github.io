
/**
 * @returns
 */
function f(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    console.log('m', m, 'n', n);

    let cM = 0;
    let cN = 0;

    while (
        matrix[cM] !== undefined
        && matrix[cM][cN] !== undefined
    ) {
        let cur = matrix[cM][cN];
        console.log('cur', cur);
        if (target === cur) {
            return true;
        }
        if (target > cur) {
            // 右移
            cN = cN + 1;
            // 右边没了
            if (matrix[cM][cN] === undefined) {
                // cN = cN - 1;
                // 下移
                cM = cM + 1;
                // 重置列
                cN = 0;
            }
            continue;
        }
        if (target < cur) {
            // 回退
            // cN = cN - 1;
            // 下移
            cM = cM + 1;
            // 重置列
            cN = 0;
        }
    }
    return false;
}

let matrix = [
    [1, 4, 7, 11,15],
    [2, 5, 8, 12,19],
    [3, 6, 9, 16,22],
    [10,13,14,17,24],
    [18,21,23,26,30]
];
let target = 5;
target = 20;
const res = f(matrix, target);
console.log('\nres', res);
