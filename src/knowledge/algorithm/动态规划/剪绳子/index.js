
/**
 * 动态规划
 * n > 1
 * m > 1
 */
function cutRope(n) {
    if (n === 2) return 1;
    if (n === 3) return 2;

    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 3;
    for (let i = 4; i <= n; i++) {
        let max = 0;
        for (let j = 1; j < i; j++) {
            const res = dp[j] * dp[i - j];
            console.log('i', i, 'j', j, 'res', res);
            if (res > max) {
                max = res;
            }
        }
        dp[i] = max;
    }
    console.log('dp', dp);
    return dp[n];
}

let n = 10;
const res = cutRope(n);
console.log('res', res);
