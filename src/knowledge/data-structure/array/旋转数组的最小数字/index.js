
/**
 * 思路：
 * 遍历数组，记录当前遍历到的值
 * 如果下一个值比当前值小
 * 则认为下一个值就是最小的
 */
function findMin(nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i + 1] < nums[i]) {
            return nums[i + 1];
        }
    }
    return 0;
}

let nums = [3,4,5,1,2];
const res = findMin(nums);
console.log('res', res);