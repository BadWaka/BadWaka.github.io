
function f(nums) {
    console.log('nums', nums);
    if (!nums || nums.length <= 1) {
        return nums;
    }
    let length = nums.length;
    // 索引左边的乘积
    let left = [1];
    let right = new Array(length);
    right[right.length - 1] = 1;
    for (let i = 1; i < nums.length; i++) {
        left.push(left[i - 1] * nums[i - 1]);
    }
    for (let j = nums.length - 2; j >= 0; j--) {
        right[j] = right[j + 1] * nums[j + 1];
    }
    console.log('left', left, 'right', right);
    let answer = new Array(length);
    for (let i = 0; i < nums.length; i++) {
        answer[i] = left[i] * right[i];
    }
    return answer;
}

/**
 * 用除法
 * 计算出所有的乘积，然后除以自身，但如果是 0 怎么办
 * @param {*} nums
 */
function f3(nums) {
    let map = {};
    for (let i = 0; i < nums.length; i++) {

    }
}

/**
 * @returns
 */
function f2(nums) {
    let list = [];
    for (let i = 0; i < nums.length; i++) {
        const product = getProduct(nums, i);
        list.push(product);
    }
    return list;
}

function getProduct(nums, exceptIndex) {
    if (nums.length < 1) {
        return 0;
    }
    let product = 1;
    for (let i = 0; i < nums.length; i++) {
        if (i === exceptIndex) {
            continue;
        }
        product = product * nums[i];
    }
    return product;
}

let params = [1,2,3,4];
const res = f(params);
console.log('res', res);
