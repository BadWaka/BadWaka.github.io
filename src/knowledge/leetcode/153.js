
/**
 * @returns
 */
function f(nums) {

    // let left = 0;
    // let right = nums.length - 1;

    // while (left < right) {
    //     let mid = Math.floor((left + right) / 2);

    //     if (nums[mid] > nums[right]) {
    //         left = mid + 1;
    //     } else {
    //         right = mid;
    //     }
    // }

    // return nums[left];

    // let l = 0;
    // let r = nums.length - 1;
    // let min = null;
    // while(l <= r) {
    //     const m = Math.floor((l + r) / 2);
    //     console.log('\nl', l, 'm', m, 'r', r);
    //     console.log('nums[l]', nums[l], 'nums[m]', nums[m], 'nums[r]', nums[r], 'min', min);
    //     if (min === null || nums[m] < min) {
    //         min = nums[m];
    //     }
    //     if (nums[l] < nums[m]) {
    //         if (nums[l] < min) {
    //             min = nums[l];
    //             l = m + 1;
    //         }
    //         else {
    //             r = m - 1;
    //         }
    //     }
    //     else {
    //         if (nums[r] < min) {
    //             min = nums[r];
    //             r = m - 1;
    //         }
    //         else {
    //             l = m + 1;
    //         }
    //     }
    //     console.log('min after', min);
    // }
    // return min;

    let l = 0;
    let r = nums.length - 1;
    while(l < r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] > nums[r]) {
            l = m + 1;
        }
        else {
            r = m;
        }
    }
    return nums[l];

}

let params = [3,4,5,1,2];
params = [4,5,6,7,0,1,2];
params = [11,13,15,17];
params = [5,1,2,3,4];
const res = f(params);
console.log('res', res);
