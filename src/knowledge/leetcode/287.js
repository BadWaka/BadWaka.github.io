
/**
 * @returns
 */
function findDuplicate(nums) {

    // 空间复杂度 O(N) 的解法，比较简单
    // const map = {};
    // for (let i = 0; i < nums.length; i++) {
    //     if (!map[nums[i]]) {
    //         map[nums[i]] = 1;
    //         continue;
    //     }
    //     return nums[i];
    // }

    // 空间复杂度为 O(1) 的解法
    const n = nums.length - 1;
    console.log('n', n);

}

let params = [1,3,4,2,2];
const res = findDuplicate(params);
console.log('\nres', res);
