
/**
 * @returns
 */
function f(matrix, target) {
    console.log('matrix', matrix, 'target', target);

    // 先遍历二维数组，找到区间数组
    let arr = null;
    for (let i = 0; i < matrix.length; i++) {
        arr = matrix[i];
        console.log('arr', arr);
        const min = arr[0];
        const max = arr[arr.length - 1];
        console.log('min', min, 'max', max);
        if (target >= min && target <= max) {
            break;
        }
    }
    console.log('选中的 arr', arr);

    if (!arr || arr.length === 0) {
        return false;
    }

    // 二分查找
    let isFind = false;
    let left = 0;
    let right = arr.length - 1;
    console.log('left', left, 'right', right);
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        console.log('mid', mid, 'left', left, 'right', right);
        let midVal = arr[mid];
        if (midVal === target) {
            isFind = true;
            break;
        }
        else if (midVal < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    console.log('isFind', isFind);
    return isFind;
}

let matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3;
const res = f(matrix, target);
console.log('res', res);
