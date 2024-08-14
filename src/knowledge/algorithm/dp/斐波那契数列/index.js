
/**
 * 动态规划
 */
function fibonacci(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    const dp = new Array(n + 1).fill(0);
    // console.log('dp', dp);
    dp[0] = 0;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    console.log('dp', dp);
    return dp[n];
}

let n = 10;
const res = fibonacci(n);
console.log('res', res);
