
/**
 * 这里为什么要传入 start 和 end，因为是在原数组上修改啊；你要是生成新的子数组就不是在原数组上修改了，就需要额外的空间了
 * @returns
 */
function sortColors(nums, start = 0, end = nums.length - 1) {
    if (!nums || nums.length === 0 || nums.length === 1) {
        return nums;
    }
    if (start >= end) {
        return nums;
    }
    let p = getP(nums, start, end);
    // console.log('p', p);
    sortColors(nums, start, p - 1);
    sortColors(nums, p + 1, end);
    return nums;
}

function getP(nums, start, end) {
    let mid = nums[start];
    // 针对颜色选择的特殊 mid 选取优化策略
    // 优先寻找 1
    for (let i = start; i <= end; i++) {
        if (nums[i] === 1) {
            mid = nums[i];
            // 交换位置
            [nums[start], nums[i]] = [nums[i], nums[start]];
            break;
        }
    }
    let i = start + 1;
    let j = end;
    // console.log('nums', nums, 'mid', mid, 'i', i, 'j', j);
    while (i <= j) {
        // 左边还没找到比 mid 大的，继续找
        while (i <= j && nums[i] <= mid) {
            i++;
        }
        // 右边还没找到比 mid 小的，继续找
        while (i <= j && nums[j] >= mid) {
            j--;
        }
        // 左边找到了比 mid 大的，右边也找到了比 mid 小的
        if (i < j) {
            // 交换
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    // console.log('nums', nums, 'mid', mid, 'i', i, 'j', j);
    // 把头和 j 交换一下
    [nums[start], nums[j]] = [nums[j], nums[start]];
    // console.log('nums', nums, 'mid', mid, 'i', i, 'j', j);
    return j;
}

let params = [2,0,2,1,1,0];
const res = sortColors(params);
console.log('\nres', res);
