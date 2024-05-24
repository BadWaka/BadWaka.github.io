
/**
 * @returns
 */
function f(nums1, nums2) {
    // 首先，把两个数组合并
    // 然后，判断数组的长度是奇数还是偶数
    // 如果是奇数直接取中间的数
    // 如果是偶数取中间两个数再除以 2

    function concatArrays(nums1, nums2) {
        let numsTotal = [];
        // 特殊情况直接返回
        if (nums1[nums1.length - 1] <= nums2[0]) {
            numsTotal = [...nums1, ...nums2];
            return numsTotal;
        }
        if (nums2[nums2.length - 1] <= nums1[0]) {
            numsTotal = [...nums2, ...nums1];
            return numsTotal;
        }
        // 以数量多的数组为底座，减少插入次数
        let nums = null;
        let numsAnother = null;
        if (nums1.length > nums2.length) {
            nums = nums1;
            numsAnother = nums2;
        }
        else {
            nums = nums2;
            numsAnother = nums1;
        }
        console.log('nums', nums, 'numsAnother', numsAnother);
        // 遍历另一个数组，往底座里插
        // 插的时候用二分查找，查找第一个大于当前值的数的位置（或者找最后一个小于当前值的数的位置也行）
        for (let i = 0; i < numsAnother.length; i++) {
            const cur = numsAnother[i];
            const index = binarySearch(nums, cur);
            console.log('index', index);
            nums.splice(index, 0, cur);
        }
        return nums;
    }
    const numsTotal = concatArrays(nums1, nums2);
    console.log('numsTotal', numsTotal);

    // 二分查找，找第一个大于 target 的值的索引
    function binarySearch(nums, target) {
        console.log('\nbinarySearch nums', nums, 'target', target);
        let l = 0;
        let r = nums.length - 1;
        if (target <= nums[l]) {
            return 0;
        }
        if (target >= nums[r]) {
            return nums.length;
        }
        while(l < r) {
            const m = Math.floor((l + r) / 2);
            if (nums[m] <= target) {
                l = m + 1;
            }
            else if (nums[m] > target) {
                r = m;
            }
        }
        return l;
    }

    // 判断数组的长度是奇数还是偶数，取中位数
    if (numsTotal.length % 2 === 1) {
        console.log('奇数');
        return numsTotal[(numsTotal.length - 1) / 2]
    }
    else {
        console.log('偶数');
        const mid1 = numsTotal[numsTotal.length / 2 - 1];
        const mid2 = numsTotal[numsTotal.length / 2];
        return (mid1 + mid2) / 2;
    }
}

let nums1 = [1,3,4,11], nums2 = [2,4,4,7,10];
// nums1 = [1,2], nums2 = [3];
// nums1 = [3,4], nums2 = [1,2];
const res = f(nums1, nums2);
console.log('res', res);
