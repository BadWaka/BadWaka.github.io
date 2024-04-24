
/**
 * @file 轮转数组
 *
 * @param {Array} nums
 * @param {number} k
 */
let rotate = function(nums, k) {
    const list = nums.slice();
    list.forEach((item, index) => {
        let newIndex = index + k;
        while(newIndex >= list.length) {
            newIndex = newIndex - list.length;
        }
        nums[newIndex] = item;
    });
    console.log('nums', nums);
    return nums;
};

const res = rotate([1,2,3,4,5,6,7], 3);
// const res = rotate([-1], 2);
