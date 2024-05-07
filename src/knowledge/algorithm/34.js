
/**
 * @returns
 */
function f(nums, target) {
    console.log('nums', nums, 'target', target);

    const list = [];

    function recur(nums, target, lastIndex, list) {
        if (!nums || nums.length === 0) {
            return;
        }
        if (nums.length === 1) {
            if (nums[0] === target) {
                list.push(lastIndex);
            }
            return;
        }
        const midIndex = Math.ceil((nums.length - 1) / 2);
        const midVal = nums[midIndex];
        // 索引偏移量
        let offset = 0;
        // 如果当前中间值恰好为 target，偏移量 +1
        if (midVal === target) {
            offset = 1;
            list.push(lastIndex + midIndex);
        }
        const leftArr = nums.slice(0, midIndex);
        const rightArr = nums.slice(midIndex + offset);
        console.log('leftArr', leftArr, 'rightArr', rightArr);
        recur(leftArr, target, lastIndex, list);
        recur(rightArr, target, lastIndex + midIndex + offset, list);
    }
    recur(nums, target, 0, list);
    console.log('list', list);

    if (list.length === 0) {
        return [-1, -1];
    }

    let firstIndex = list[0];
    let lastIndex = list[0];
    for (let i = 0; i < list.length; i++) {
        if (list[i] < firstIndex) {
            firstIndex = list[i];
        }
        else if (list[i] > lastIndex) {
            lastIndex = list[i];
        }
    }
    return [firstIndex, lastIndex];

    // let l = 0;
    // let r = nums.length - 1;
    // let firstIndex = -1;
    // let lastIndex = -1;
    // let mid = null;
    // while(l <= r) {
    //     mid = Math.ceil((l + r) / 2);
    //     const midVal = nums[mid];
    //     console.log('l', l, 'r', r, 'mid', mid, 'midVal', midVal);
    //     if (midVal === target) {
    //         if (firstIndex === -1) {
    //             firstIndex = mid;
    //         }
    //         if (lastIndex === -1) {
    //             lastIndex = mid;
    //         }
    //         if (mid < firstIndex) {
    //             firstIndex = mid;
    //         }
    //         if (mid > lastIndex) {
    //             lastIndex = mid;
    //         }
    //         r--;
    //     }
    //     else if (midVal < target) {
    //         l = mid + 1;
    //     }
    //     else if (midVal > target) {
    //         r = mid - 1;
    //     }
    // }
    // console.log('firstIndex', firstIndex, 'lastIndex', lastIndex);
    // return [firstIndex, lastIndex];
}

let nums = [5,7,7,8,8,10], target = 8;
nums = [5,7,7,8,8,10], target = 6;
nums = [], target = 0;
nums = [1,2,2], target = 2;
const res = f(nums, target);
console.log('res', res);
