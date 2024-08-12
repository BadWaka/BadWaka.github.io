
/**
 * leetcode 442
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    // let fArr = [];
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        while(nums[i] !== i + 1) {
            if (nums[i] === nums[nums[i] - 1]) {
                // fArr.push(nums[i]);
                map[nums[i]] = 1;
                break;
            }
            else {
                const tmp = nums[i];
                nums[i] = nums[tmp - 1];
                nums[tmp - 1] = tmp;
            }
        }
    }
    // console.log('map', map);
    const fArr = Object.keys(map).map(item => parseInt(item, 10));
    return fArr;
};

/**
 * hash
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 *
 * @param {*} arr
 * @returns
 */
function findRepeat1(arr) {
    const map = {};
    for (let i = 0; i < arr.length; i++) {
        if (!map[arr[i]]) {
            map[arr[i]] = 1;
        }
        else {
            // 找到重复的就直接 return
            return arr[i];
            map[arr[i]]++;
        }
    }
    // console.log('map', map);
    // const mapArr = Object.keys(map);
    // for (let i = 0; i < mapArr.length; i++) {
    //     if (map[mapArr[i]] > 1) {
    //         return mapArr[i];
    //     }
    // }
    return;
}

/**
 * 排序后遍历
 * 时间复杂度 O(nlogn + n)，排序需要 O(nlogn)，遍历需要 O(n)
 * 空间复杂度 O(1)，使用原空间，需要额外常数变量
 */

/**
 * 利用题目规则：长度为 n 的数组，值都在 0 - n-1 的范围内
 * 数组下标和数组值就有了关联
 * 如果数组的值和下标一一对应，则没有重复数字
 * 依次把数组的值挪到与之对应的下标位置
 * 如果要挪动的值与下标位置相同，则找到了重复的值
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
function findRepeat(arr) {
    if (!arr || arr.length === 0) {
        return;
    }
    for (let i = 0; i < arr.length; i++) {

        // 值和索引相等，在正确的位置上
        // if (arr[i] === i) {
        //     // 不管，什么也不做
        // }
        // else {
        //     // 找到重复的值了
        //     if (arr[i] === arr[arr[i]]) {
        //         return arr[i];
        //     }
        //     // 互换位置
        //     else {
        //         const tmp = arr[i];
        //         arr[i] = arr[arr[i]];
        //         arr[tmp] = tmp;
        //     }
        // }

        // 如果位置不对就一直循环
        while(arr[i] !== i) {
            // 找到重复的值了
            if (arr[i] === arr[arr[i]]) {
                return arr[i];
            }
            // 互换位置
            const tmp = arr[i];
            arr[i] = arr[arr[i]];
            arr[tmp] = tmp;
        }
    }
    return;
}

let params = [2, 3, 1, 0, 4, 5, 3];
const res = findRepeat(params);
console.log('res', res);