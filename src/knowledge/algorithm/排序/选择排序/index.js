
/**
 * 
 */
function sort(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] > nums[j]) {
                const tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
            }
            console.log('i', i, 'j', j, 'nums', nums);
        }
    }
    return nums;
}

let nums = [7,4,3,2,9,10,5,4];
const res = sort(nums);
console.log('res', res);
