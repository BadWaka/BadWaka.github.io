
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
    // 这里为什么 dp[2] 是 2 不是 1 是因为当它作为子问题的答案被缓存时，已经是切过的状态了；它本身也可以作为一次乘积值
    dp[2] = 2;
    // 这里为什么 dp[3] 是 3 不是 2 是因为当它作为子问题的答案被缓存时，已经是切过的状态了；它本身也可以作为一次乘积值
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
