
/**
 * @returns
 */
function f(coins, amount) {
    if (amount === 0) {
        return 0;
    }
    // coins = coins.sort((a, b) => a - b);
    console.log('coins', coins, 'amount', amount);
    const dp = new Array(amount + 1).fill(-1);
    for (let i = 0; i < coins.length; i++) {
        if (coins[i] > amount) {
            continue;
        }
        dp[coins[i]] = 1;
    }
    console.log('dp', dp);
    for (let i = 1; i < dp.length; i++) {
        // console.log('i', i, 'dp[i]', dp[i]);
        if (dp[i] === -1) {
            const minArr = [];
            coins.forEach(item => {
                if (dp[i - item]) {
                    minArr.push(dp[i - item]);
                }
            });
            // console.log('minArr', minArr, 'Math.min(minArr)', Math.min(...minArr));
            dp[i] = Math.min(...minArr) + 1;
        }
    }
    console.log('after dp', dp);

    return dp[amount] === Infinity ? -1 : dp[amount];

    /**
     * 推导
     * f(1) = 1
     * f(2) = 2
     * f(3) = 2
     * f(4) = 2
     * f(5) = 1
     * f(6) = 2
     * f(7) = 2
     * f(8) = 3
     * f(9) = 3
     * f(10) = 2
     * f(11) = 3
     *
     * 状态转移方程：f(n) = Math.min(f(n - 5), f(n - 2), f(n - 1)) + 1
     */
}

let coins = [2, 5, 1];
coins = [2];
coins = [2147483647];
coins = [233,408,101,448,235,339,40,211];
let amount = 11;
amount = 3;
amount = 2;
amount = 7392;
const res = f(coins, amount);
console.log('\nres', res);
