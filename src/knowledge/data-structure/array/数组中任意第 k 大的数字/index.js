
/**
 * 思路：
 * 快速选择算法
 * On 最坏 On^2
 */
function findMaxKNum(arr, k) {

    if (!arr || arr.length === 0) {
        return null;
    }
    if (k < 0 || k > arr.length - 1) {
        return null;
    }

    function partition(left, right) {
        const pivot = arr[right];
        console.log('pivot', pivot);
        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] >= pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                // 发生交换时 i 才移位
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]]
        console.log('arr', arr);
        console.log('i', i);
        return i;
    }

    function find(left, right) {
        console.log('find left', left, 'right', right);
        if (left >= right) {
            return left;
        }
        // 直接比较 p 就行了
        const p = partition(left, right);
        console.log('p', p);
        if (p === k) {
            return p;
        }
        else if (p < k) {
            // 不能包含 p
            return find(p + 1, right);
        }
        else {
            return find(left, p - 1);
        }
    }

    const p = find(0, arr.length - 1);
    console.log('arr', arr);
    console.log('p', p);
    return arr[p];

}

let arr = [1,3,2,2,2,5,9,7,3,2,8];
let k = 3;

const res = findMaxKNum(arr, k);
console.log('res', res);
