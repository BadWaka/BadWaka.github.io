
/**
 * 思路：
 * 先升序排序
 * 然后遍历
 * @returns
 */
function f(nums) {
    nums = quickSort(nums);
    console.log('quick nums', nums);
    let list = [];
    let maxList = [];
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (list.length === 0) {
            list.push(nums[i]);
            if (list.length > max) {
                max = list.length;
                maxList = list.slice();
            }
            continue;
        }
        if (nums[i] - list[list.length - 1] === 1) {
            list.push(nums[i]);
        }
        else if (nums[i] === list[list.length - 1]) {
            continue;
        }
        else {
            list = [nums[i]];
        }
        if (list.length > max) {
            max = list.length;
            maxList = list.slice();
        }
    }
    console.log('maxList', maxList, 'max', max);
    return max;
}

function quickSort(nums) {
    if (nums.length <= 1) {
        return nums;
    }
    const p = getP(nums, 0, nums.length - 1);
    console.log('nums', nums, 'p', p);
    const leftNums = quickSort(nums.slice(0, p), 0, p);
    const rightNums = quickSort(nums.slice(p + 1), p + 1, nums.length - 1);
    return leftNums.concat([nums[p]]).concat(rightNums);
}

function getP(nums, left = 0, right = nums.length - 1) {
    let p = left;
    let i = left + 1;
    for (let j = left + 1; j <= right; j++) {
        if (nums[j] < nums[p]) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }
    [nums[p], nums[i - 1]] = [nums[i - 1], nums[p]];
    return i - 1;
}

let params = [100,4,200,1,3,2];
params = [0];
params = [1,2,0,1];
const res = f(params);
console.log('res', res);
