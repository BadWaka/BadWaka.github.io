
/**
 * 最简单的办法就是全部遍历一遍
 *
 * 时间复杂度 O(m * n)
 */

/**
 * 遍历，但是利用规则进行剪枝
 *
 * 时间复杂度最大为 O(m * n)
 *
 * @param {*} nums
 */
function search1(nums, k) {
    if (!nums || nums.length === 0) {
        return false;
    }
    // 最大行数
    let maxRow = nums.length;
    // 最大列数
    let maxCol = nums[0].length;
    // 遍历每一行
    for (let i = 0; i < nums.length; i++) {
        // 如果每行的第一个数大于 k，那这行就不用看了；接下来的行也不用看了
        if (nums[i] && nums[i][0] > k) {
            break;
        }
        const row = nums[i];
        // 接着遍历列
        for (let j = 0; j < row.length; j++) {
            // 找到了，返回 true
            if (row[j] === k) {
                return true;
            }
            // 如果大于 k，那后面的也都大于 k，没必要看了，直接返回
            if (row[j] > k) {
                break;
            }
        }
    }
    return false;
}

/**
 * 在右上角找值
 * 每次删除一行或一列缩小范围
 *
 * 时间复杂度为 O(m + n)
 *
 * @param {*} nums
 * @param {*} k
 */
function search(nums, k) {
    // 容错
    if (!nums || nums.length === 0 || nums[0].length === 0) {
        return false;
    }
    // 右上角的值
    let rowNum = 0;
    let colNum = nums[rowNum].length - 1;
    let val = nums[rowNum][colNum];
    while(val !== undefined) {
        console.log('val', val);
        // 找到了，直接返回
        if (val === k) {
            return true;
        }
        // 比 k 小，在右边或者下边；但是贴边了，只能往下找
        if (val < k) {
            rowNum++;
            if (!nums[rowNum]) {
                return false;
            }
            val = nums[rowNum][colNum];
            continue;
        }
        // 比 k 大，在左边或者上边；但是贴边了，只能往左找
        if (val > k) {
            colNum--;
            if (colNum < 0) {
                return false;
            }
            val = nums[rowNum][colNum];
            continue;
        }
    }
    return false;
}

let params = [
    [1, 2, 3, 40],
    [5, 6, 41, 85],
    [90, 100, 110, 120]
];
let k = 50;
const res = search(params, k);
console.log('res', res);