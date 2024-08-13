
/**
 * 调用 js 内置方法
 * concat 再 sort
 *
 * 时间复杂度 O(nlogn)
 *
 * @param {*} s
 * @returns
 */
function concatSortArr1(arr1, arr2) {
    let arr = arr1.concat(arr2);
    arr.sort((a, b) => a - b);
    return arr;
}

/**
 * 双指针
 *
 * @param {*} arr1
 * @param {*} arr2
 */
function concatSortArr(arr1, arr2) {
    const arr = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length || j < arr2.length) {
        console.log('arr1[i]', arr1[i], 'arr2[j]', arr2[j]);
        if (arr1[i] < arr2[j] || arr2[j] === undefined) {
            arr.push(arr1[i]);
            i++;
            continue;
        }
        if (arr1[i] >= arr2[j] || arr1[i] === undefined) {
            arr.push(arr2[j]);
            j++;
        }
    }
    return arr;
}

let arr1 = [1, 3, 6, 8, 10];
let arr2 = [4, 5, 8, 9, 11, 12];
const res = concatSortArr(arr1, arr2);
console.log('res', res);