
/**
 * @returns
 */
function f(nums) {
    const finalIndex = nums.length - 1;
    console.log('finalIndex', finalIndex);
    if (finalIndex === 0) {
        return 0;
    }
    let count = 1;
    let sum = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        console.log('\ni', i, 'nums[i]', nums[i]);
        // if (nums[i] > 0) {
        //     count++;
        // }
        sum += nums[i];
        if (sum >= finalIndex) {
            break;
        }

        let maxSum = 0;
        let index = -1;
        for (let j = 1; j <= nums[i]; j++) {
            const curSum = j + nums[i + j];
            console.log('j', j, 'sum', sum, 'curSum', curSum);
            if (curSum > maxSum) {
                maxSum = curSum;
                index = j;
            }
        }
        console.log('maxSum', maxSum, 'index', index);
        if (maxSum > sum) {
            sum = maxSum;
            i = index + i - 1;
            count++;
        }
        if (sum >= finalIndex) {
            break;
        }

    }
    console.log('\ncount', count);
    return count;
}

let params = [2,3,1,1,4];
// params = [2,0,3,0,1,4];
// params = [2,0,0,1,3,0,4];
// params = [0];
// params = [2,0,2,0,1];
// params = [4,1,1,3,1,1,1];
// params = [3,4,3,2,5,4,3];
params = [3,4,3,1,0,7,0,3,0,2,0,3];
// params = [1, 2];
params = [1,1,1,1];
const res = f(params);
console.log('\nres', res);
