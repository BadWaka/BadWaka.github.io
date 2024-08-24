
/**
 * 思路：
 * 新建一个数组
 * 依次遍历原数组
 * 判断如果是奇数就放前面 unshift
 * 如果是偶数就放后面 push
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
function oddFrontOfEven1(nums) {
    const arr = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] & 1) {
            arr.unshift(nums[i]);
            continue;
        }
        arr.push(nums[i]);
    }
    return arr;
}

/**
 * 如果必须在原数组上修改呢？不许使用额外空间呢？
 * 搞两个指针，一头一尾
 * while (head < tail)
 * 遍历左边的
 *   如果是奇数，头指针++
 *   如果是偶数，交换头尾指针的值，尾指针--，继续循环
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
function oddFrontOfEven(nums) {
    let head = 0;
    let tail = nums.length - 1;
    while(head < tail) {
        if (nums[head] & 1) {
            head++;
            continue;
        }
        [nums[head], nums[tail]] = [nums[tail], nums[head]];
        tail--;
    }
    return nums;
}

let nums = [3,4,5,1,2];
const res = oddFrontOfEven(nums);
console.log('res', res);