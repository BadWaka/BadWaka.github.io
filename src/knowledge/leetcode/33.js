
/**
 * @returns
 */
function f(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    while(l <= r) {
        let m = Math.ceil((l + r) / 2);
        console.log('\nl', l, 'm', m, 'r', r);
        console.log('nums[l]', nums[l], 'nums[m]', nums[m], 'nums[r]', nums[r]);
        if (nums[m] === target) {
            return m;
        }

        if (nums[l] < nums[m]) {
            if (target < nums[m] && target >= nums[l]) {
                r = m - 1;
            }
            else {
                l = m + 1;
            }
        }
        else {
            if (target > nums[m] && target <= nums[r]) {
                l = m + 1;
            }
            else {
                r = m - 1;
            }
        }
    }
    return -1;

    // let left = 0;
    // let right = nums.length - 1;

    // while (left <= right) {
    //     const mid = Math.floor((left + right) / 2); // 计算中间索引

    //     if (nums[mid] === target) {
    //         return mid; // 如果中间元素就是目标值，直接返回索引
    //     }

    //     // 判断左半部分是否是有序的
    //     if (nums[left] <= nums[mid]) {
    //         // 如果左半部分有序，接下来判断目标值是否在左半部分
    //         if (target >= nums[left] && target < nums[mid]) {
    //             right = mid - 1; // 目标值在左半部分，调整右边界
    //         } else {
    //             left = mid + 1; // 目标值不在左半部分，调整左边界
    //         }
    //     } else {
    //         // 否则，右半部分是有序的
    //         // 判断目标值是否在右半部分
    //         if (target > nums[mid] && target <= nums[right]) {
    //             left = mid + 1; // 目标值在右半部分，调整左边界
    //         } else {
    //             right = mid - 1; // 目标值不在右半部分，调整右边界
    //         }
    //     }
    // }

    // return -1; // 如果循环结束还没有找到目标值，返回 -1
}

let nums = [4,5,6,7,0,1,2], target = 0;
const res = f(nums, target);
console.log('res', res);
