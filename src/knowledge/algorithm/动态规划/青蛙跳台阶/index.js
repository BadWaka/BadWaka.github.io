
/**
 * 动态规划
 */
function frogJump(n) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

let n = 10;
const res = frogJump(n);
console.log('res', res);
