
/**
 * @returns
 */
function f(nums, target) {
    console.log('\nnums', nums, 'target', target);
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        if (nums[0] > target) {
            return -1;
        }
        if (nums[0] < target) {
            return 1;
        }
        return 0;
    }
    const middleIndex = Math.ceil(nums.length / 2);
    const middle = nums[middleIndex];
    const leftList = nums.slice(0, middleIndex);
    const rightList = nums.slice(middleIndex);
    console.log('middleIndex', middleIndex, 'middle', middle, 'leftList', leftList, 'rightList', rightList);
    let index = null;
    if (leftList[leftList.length - 1] === target) {
        index = leftList.length - 1;
    }
    else if (rightList[0] === target) {
        index = middleIndex;
    }
    else if (leftList[leftList.length - 1] < target) {
        index = middleIndex + f(rightList, target);
    }
    else if (leftList[leftList.length - 1] > target) {
        index = 0 + f(leftList, target);
    }
    console.log('index', index);
}

let params = [1,3,5,6];
let target = 2;
const res = f(params, target);
console.log('res', res);
