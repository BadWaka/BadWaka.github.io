
import {
    quickSortPartition
} from './quickSort.js';

/**
 * @returns
 */
function f(nums, k) {
    nums = quickSortPartition(nums, 0, nums.length - 1, 'desc');
    console.log('nums', nums);
    return nums[k - 1];
}

let params = [3,2,1,5,6,4];
let k = 2;
const res = f(params, k);
console.log('res', res);
