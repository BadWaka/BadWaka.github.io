
function f(nums) {
    nums = cyclicSort(nums);
}

function cyclicSort(nums) {
    console.log('nums before', nums);
    for (let i = 0; i < nums.length; i++) {
        console.log('\ni', i, 'nums[i]', nums[i]);
        if (nums[i] !== i) {
            console.log('不在位置上');
            // 目标位置的缓存
            const temp = nums[nums[i]];
            console.log('temp', temp);
            // 放到目标位置上
            nums[nums[i]] = nums[i];
        }
    }
    console.log('\nnums', nums);
}

/**
 * @returns
 */
function f2(nums) {
    console.log('nums', nums);
    let min = null;
    let max = null;
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        // <= 0 的值都不需要存入 map
        if (nums[i] <= 0) {
            continue;
        }
        if (!map[nums[i]]) {
            map[nums[i]] = true;
        }
        if (min === null) {
            min = nums[i];
        }
        else if (nums[i] < min) {
            min = nums[i];
        }
        if (max === null) {
            max = nums[i];
        }
        else if (nums[i] > max) {
            max = nums[i];
        }
    }
    console.log('map', map);
    console.log('min', min);
    console.log('max', max);

    // 最小未出现过的正数
    let minPositiveNumber = 1;

    // 最小数比 1 还大，直接返回 1
    if (min > 1) {
        return 1;
    }
    // 最大数比 1 还小，直接返回 1
    if (max < 1) {
        return 1;
    }

    // 如果最大值 - 最小值，等于 map 数组长度 - 1，则认为这个数组是连续的，返回最大值 + 1（因为之前 min > 1 和 max < 1 的已经返回了，所以这里直接返回 max + 1 就行）
    if (max - min === Object.keys(map).length - 1) {
        console.log('连续数组');
        return max + 1;
    }

    // 不连续，且 min <= 1，max >= 1，那么最终的结果肯定在 min 至 max + 1 之间
    Object.keys(map).forEach(val => {
        val = parseInt(val, 10);
        console.log('val', val, 'minPositiveNumber', minPositiveNumber);
        if (
            // 值大于当前最小正数
            val > minPositiveNumber
            // 当前最小正数 > 值 - 1
            && minPositiveNumber > (val - 1)
        ) {
            minPositiveNumber = val - 1;
        }
        else if (
            // 值 = 当前最小正数
            val === minPositiveNumber
            // 并且 val + 1 不在 map 中
            // && !map[val + 1]
        ) {
            minPositiveNumber = val + 1;
        }
    });

    return minPositiveNumber;
}

let params = [1,2,0];
// params = [1,2,4, 8, 20];
// params = [3,4,-1,1];
// params = [2,2,3,4,-1,1];
// params = [1, 2, 4, 7, 8, 9];
// params = [-23,-9,-1,0];
// params = [7,8,9,11,12];
const res = f(params);
console.log('\nres', res);
