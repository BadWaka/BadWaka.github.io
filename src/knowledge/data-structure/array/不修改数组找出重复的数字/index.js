
/**
 * hash
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 *
 * @param {*} nums
 * @returns
 */
function findRepeat(nums) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        if (!map[nums[i]]) {
            map[nums[i]] = 1;
            continue;
        }
        map[nums[i]]++;
    }
    const keyArr = Object.keys(map);
    for (let i = 0; i < keyArr.length; i++) {
        if (map[keyArr[i]] > 1) {
            return parseInt(keyArr[i], 10);
        }
    }
    return;
}

/**
 * 二分查找
 *
 * @param {*} nums
 */
function binarySearch(nums) {

}

let params = [2, 3, 5, 4, 3, 2, 6, 7];
// const res = findRepeat(params);
const res = binarySearch(params);
console.log('res', res);