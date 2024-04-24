
/**
 * @file 轮转数组
 *
 * @param {Array} nums
 * @param {number} k
 */
let rotate = function(nums, k) {

    /**
     * 使用额外数组
     */
    // const list = nums.slice();
    // list.forEach((item, index) => {
    //     let newIndex = index + k;
    //     while(newIndex >= list.length) {
    //         newIndex = newIndex - list.length;
    //     }
    //     nums[newIndex] = item;
    // });
    // console.log('nums', nums);
    // return nums;

    /**
     * 数组反转
     */
    let left = 0;
    let right = nums.length - 1;
    // 求余数，避免出现 k > nums.length 的情况
    const kRemainder = k % nums.length;
    let temp = null;
    while(left <= right) {
        temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++;
        right--;
    }

    left = 0;
    right = kRemainder - 1;
    while(left <= right) {
        temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++;
        right--;
    }

    left = kRemainder;
    right = nums.length - 1;
    while(left <= right) {
        temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++;
        right--;
    }

    console.log('nums', nums);

    return nums;
};

const res = rotate([1, 2, 3, 4, 5, 6, 7, 8], 4);
// const res = rotate([-1], 2);
