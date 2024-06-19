
/**
 * 假设你正在爬楼梯，你可以一步走1个台阶，也可以一步走2个台阶。现在楼梯总共有n个台阶，问有多少种不同的走法。
 *
 * @param {number} n 楼梯数
 */

function f(n) {
    console.log('n', n);
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    let fNj1 = 1; // f(n - 1)
    let fNj2 = 2; // f(n - 2)
    let final = null;
    for (let i = 3; i <= n; i++) {
        console.log('i', i);
        final = fNj1 + fNj2;

        // 进入下一轮循环，复用空间
        fNj1 = fNj2;
        fNj2 = final;
    }
    return final;
}

function f3(n) {
    console.log('n', n);
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    const arr = new Array(n + 1);
    arr[1] = 1;
    arr[2] = 2;
    console.log('arr', arr);
    for (let i = 3; i <= n; i++) {
        console.log('i', i);
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    console.log('arr 2', arr);
    return arr[n];
}

function f2(n) {
    // i = 0 的时候，只能站着不动
    // i = 1 的时候，只能走一步
    const dp = [1, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    console.log('dp', dp);
    return dp[n];
}

let param = 4;
param = 10;
const res = f(param);
console.log('res', res);
