
/**
 * 思路：
 * 暴力法
 * 设置一个变量 max
 * 双重循环
 *   遍历每个数字
 *     遍历之后的每个数字，计算和，判断是否比 max 大
 * 时间复杂度 O(n^2)
 */

/**
 * 思路：
 * 前缀和
 * 先把前缀和算出来
 * O(n^2)
 */
function maxChildArrSum1(arr) {
    console.log('arr', arr);
    const preSum = new Array(arr.length).fill(0);
    for (let i = 1; i <= arr.length; i++) {
        preSum[i] = preSum[i - 1] + arr[i - 1];
    }
    console.log('preSum', preSum);
}

/**
 * 思路：
 * 找规律
 * 每一步都记录当前的和 curSum，和最大的和 maxSum
 * 如果 curSum <= 0，那加上当前数肯定还没当前数大，所以直接舍弃，让 curSum = arr[i]
 * 如果 curSum > 0，那就继续累加 curSum += arr[i]
 * 然后每次都判断一下 curSum 是否比 maxSum 大，如果比 maxSum 大就更新 maxSum
 */
function maxChildArrSum(arr) {
    let curSum = 0;
    let maxSum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (curSum <= 0) {
            curSum = arr[i];
        }
        else {
            curSum += arr[i];
        }
        maxSum = Math.max(curSum, maxSum);
    }
    return maxSum;
}

let arr = [1, -2, 3, 10, -4, 7, 2, -5];

const res = maxChildArrSum(arr);
console.log('res', res);
