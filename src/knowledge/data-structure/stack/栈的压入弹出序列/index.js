
/**
 * 思路：
 * 找 arr2 数组的第一个数 p2，在 arr1 里找到位置 p2Arr1Index
 * 再找 arr2 数组的第二个数，是否在刚才的数在 arr1 中的旁边
 *
 * 垃圾方法，废弃
 */
function isPopArr(arr1, arr2) {
    let p = 0;
    while(p < arr1.length - 1) {
        let num = arr2[p];
        let numArr1Index = arr1.indexOf(num);
        let next = arr2[p + 1];
        if (next !== arr1[numArr1Index - 1] && next !== arr1[numArr1Index + 1]) {
            return false;
        }
        arr1.splice(numArr1Index, 1);
        p++;
    }
    return true;
}

let arr1 = [1,2,3,4,5];
let arr2 = [4,5,3,2,1];
arr2 = [4,3,5,1,2];
// arr2 = [4,3,5,2,1];

const res = isPopArr(arr1, arr2);
console.log('res', res);
