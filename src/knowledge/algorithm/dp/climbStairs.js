
/**
 * 假设你正在爬楼梯，你可以一步走1个台阶，也可以一步走2个台阶。现在楼梯总共有n个台阶，问有多少种不同的走法。
 *
 * @param {number} n 楼梯数
 */
function climbStairs(n) {
    // i = 0 的时候，只能站着不动
    // i = 1 的时候，只能走一步
    const dp = [1, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    console.log('dp', dp);
    return dp[n];
}

const res = climbStairs(8);
console.log('res', res);
