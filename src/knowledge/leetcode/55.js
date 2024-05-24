
/**
 * @file 跳跃游戏
 * @returns
 */
// function f(nums) {
//     console.log('nums', nums);
//     const curItem = nums[0];
//     return canGetLast(curItem, 0, nums);
// }

// /**
//  * 是否能跳到最后一位
//  *
//  * @param {*} curItem 当前项
//  * @param {*} curIndex 当前索引
//  * @param {*} nums 数组
//  */
// function canGetLast(curItem, curIndex, nums) {
//     // console.log('canGetLast curItem', curItem, 'curIndex', curIndex, 'curItem + curIndex', curItem + curIndex);
//     if (curIndex === nums.length - 1) {
//         return true;
//     }
//     if (curItem === 0) {
//         return false;
//     }
//     if (curItem + curIndex >= nums.length - 1) {
//         return true;
//     }
//     for (let i = 1; i <= curItem; i++) {
//         const nextItem = nums[curIndex + i];
//         const res = canGetLast(nextItem, curIndex + i, nums);
//         // console.log('res', res);
//         if (res) {
//             return true;
//         }
//     }
//     return false;
// }

function f(nums) {
    console.log('nums', nums);
    // 能到达的最大长度
    let maxPosition = 0;
    if (nums.length === 1) {
        return true;
    }
    for (let i = 0; i < nums.length - 1; i++) {
        const cur = nums[i];
        if (cur > 0 && maxPosition < i + cur) {
            maxPosition = i + cur;
        }
        else if (
            // 当前项是 0
            cur === 0
            // 是否已经达到最大位置
            && maxPosition <= i
            // 当前的最大位置是否小于数组长度 - 1
            && maxPosition < nums.length - 1
        ) {
            return false;
        }
        console.log('i', i, 'cur', cur, 'maxPosition', maxPosition);
    }
    if (maxPosition >= nums.length - 1) {
        return true;
    }
    return false;
}

let params = [2,3,1,1,4];
// params = [3,2,1,0,4];
// params = [0];
// params = [2, 0, 0];
// params = [3,0,8,2,0,0,1];
params = [0,2,3];
// params = [3,0,8,2,0,0,1];
const res = f(params);
console.log('final', res);
