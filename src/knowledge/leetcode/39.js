
/**
 * @returns
 */

function f(nums, target) {
    if (target <= 0) {
        return [];
    }
    const map = {};
    const arr = [];
    for (let i = 0; i < nums.length; i++) {
        // 大于直接跳过
        if (nums[i] > target) {
            continue;
        }
        // 等于直接 push 进数组
        if (nums[i] === target) {
            arr.push([nums[i]]);
            map[[nums[i]].join(',')] = true;
            continue;
        }
        // 下一层递归
        const nextTarget = target - nums[i];
        if (nextTarget <= 0) {
            continue;
        }
        const res = f(nums, nextTarget);
        // console.log('res', res, 'nextTarget', nextTarget);
        if (res.length > 0) {
            res.forEach(item => {
                // console.log('item', item);
                item.push(nums[i]);
                item = item.sort();
                const itemStr = item.join(',');
                if (!map[itemStr]) {
                    arr.push(item);
                    map[itemStr] = true;
                }
            });
        }
    }
    console.log('arr', arr, 'map', map, 'target', target);
    return arr;
}

function f3(nums, target) {
    console.log('nums', nums, 'target', target);

    const dp = new Array(target + 1);
    console.log('dp', dp);
    
    for (let i = 0; i < nums.length; i++) {
        console.log('nums[i]', nums[i]);
        if (nums[i] === target) {
            if (!dp[target]) {
                dp[target] = [];
            }
            dp[target].push(nums[i]);
        }
    }
    console.log('dp', dp);
}

var combinationSum = function(candidates, target) {
    // 初始化dp数组，dp[i]存储和为i的所有组合
    let dp = Array.from({ length: target + 1 }, () => []);
    dp[0] = [[]]; // 和为0的组合方式就是空集

    for (let num of candidates) {
        console.log('\nnum', num);
        for (let i = num; i <= target; i++) {
            console.log('i', i);
            for (let comb of dp[i - num]) {
                console.log('i - num', i - num, 'comb', comb);
                dp[i].push([...comb, num]);
                console.log('dp', dp);
            }
        }
    }

    return dp[target];
};

function f2(nums, target) {
    nums = nums.sort((a, b) => b - a);
    console.log('nums', nums, 'target', target);
    for (let i = 0; i < nums.length; i++) {
        console.log('i', i, 'nums[i]', nums[i]);
    }

    /**
     * 尝试用动态规划推导
     * f(1) = [] = 0
     * f(2) = [[2]] = 1
     * f(3) = [[3]] = 1
     * f(4) = [[2,2]] = 1
     * f(5) = [[2,3]] = 1
     * f(6) = [[2,2,2], [3,3], [6]] = 3
     * f(7) = [[2,2,3], [7]] = 2
     * f(8) = [[2,2,2,2], [2,3,3], [2,6]] = 3
     * f(9) = [[2,2,2,3], [3,3,3], [3,6], [2,7]] = 4
     * f(10) = [[2,2,2,2,2], [2,2,3,3], [2,2,6], [3,7]] = 4
     * f(11) = [[2,2,2,2,3], [2,3,3,3], [2,3,6], [2,2,7]] = 4
     * f(12) = [[2,2,2,2,2,2], [2,2,2,3,3], [3,3,3,3], [2,2,2,6], [3,3,6], [6,6], [2,3,7]] = 7
     * f(13) = [[2,2,2,2,2,3], [2,2,3,3,3], [2,2,3,6], [2,2,2,7], [3,3,7], [6,7]] = 6
     *
     * 状态转移方程：f(n) = f(n - 7)
     *
     * f(12) = 7,
     * f(12 - 7) = f(5) = 1,
     * f(12 - 6) = f(6) = 3,
     * f(12 - 3) = f(9) = 4,
     * f(12 - 2) = f(10) = 4
     *
     * f(13) = 6,
     * f(13 - 7) = f(6) = 3,
     * f(13 - 6) = f(7) = 2,
     * f(13 - 3) = f(10) = 4,
     * f(13 - 2) = f(11) = 4
     */
}

let candidates = [2,3,6,7];
candidates = [3,4,5];
let target = 7;
target = 9;
const res = f(candidates, target);
console.log('\nres', res);
