
/**
 * 思路：
 * 遍历数组，记录当前遍历到的值
 * 如果下一个值比当前值小
 * 则认为下一个值就是最小的
 *
 * 时间复杂度 O(n)
 */
function findMin1(nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i + 1] < nums[i]) {
            return nums[i + 1];
        }
    }
    return 0;
}

/**
 * 二分查找
 */
function findMin(nums) {
    // 容错
    if (!nums) {
        return null;
    }
    // 只有一项的数组
    if (nums.length === 1) {
        return nums[0];
    }
    // 双指针
    let s = 0;
    let e = nums.length - 1;
    // 如果最后一项大于第一项，则认为该数组一直是递增的
    if (nums[e] > nums[s]) {
        return nums[s];
    }
    // 是否不能进行二分查找的标识
    let isNoBinarySearch = false;
    while(s < e - 1) {
        const mid = Math.floor((e - s) / 2) + s;
        console.log('s', s, 'mid', mid, 'e', e);
        console.log('nums[s]', nums[s], 'nums[mid]', nums[mid], 'nums[e]', nums[e]);
        if (nums[s] === nums[mid] && nums[mid] === nums[e]) {
            isNoBinarySearch = true;
            break;
        }
        if (nums[mid] > nums[s]) {
            s = mid;
        }
        else if (nums[mid] < nums[e]) {
            e = mid;
        }
    }
    // 如果不能进行二分查找，那只能遍历了
    if (isNoBinarySearch) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i + 1] < nums[i]) {
                return nums[i + 1];
            }
        }
    }
    return nums[e];
}

let nums = [3,4,5,1,2];
nums = [3,3,4,5,2,2,3];
nums = [1,0,1,1,1];
const res = findMin(nums);
console.log('res', res);