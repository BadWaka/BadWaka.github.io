
/**
 * @returns
 */
function rob(nums) {
    console.log('nums', nums, 'nums.length', nums.length);

    // 递归

    // 边界条件
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0];
    }
    if (nums.length === 2) {
        return Math.max(nums[0], nums[1]);
    }

    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        const item = nums[i];
        let newArr = [];
        const rightArr = nums.slice(i + 2);
        let leftArr = [];
        // console.log('item', item, 'rightArr', rightArr);
        if (i >= 2) {
            leftArr = nums.slice(0, i - 1);
            console.log('leftArr', leftArr);
        }
        newArr = leftArr.concat(rightArr);
        const restMax = rob(newArr);
        console.log('newArr', newArr, 'restMax', restMax);
        const curVal = item + restMax;
        console.log('curVal', curVal);
        if (curVal > max) {
            max = curVal;
        }
    }

    return max;
}

    // // 奇数和
    // let sumOdd = 0;
    // // 偶数和
    // let sumEven = 0;
    // for (let i = 0; i < nums.length; i++) {
    //     // 偶
    //     if ((i + 1) % 2 === 0) {
    //         sumEven += nums[i];
    //     }
    //     else {
    //         sumOdd += nums[i];
    //     }
    // }
    // console.log('sumOdd', sumOdd, 'sumEven', sumEven);
    // return Math.max(sumOdd, sumEven);

let params = [2,7,9,3,1,88];
params = [2,1,1,2];
params = [183,219,57,193,94,233,202,154,65,240,97,234,100,249,186,66,90,238,168,128,177,235,50,81,185,165,217,207,88,80,112,78,135,62,228,247,211];
const res = rob(params);
console.log('\nres', res);
