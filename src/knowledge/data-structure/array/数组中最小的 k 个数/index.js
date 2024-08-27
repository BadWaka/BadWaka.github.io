
/**
 */
function findMinNumList(arr, k) {

    // 首先，先通过快速选择找到第 k 小的数
    function partition(left, right) {
        if (left >= right) {
            return left;
        }
        const pivot = arr[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }

    function select(left, right) {
        if (left >= right) {
            return left;
        }
        const p = partition(left, right);
        console.log('p', p);
        console.log('arr', arr);
        if (p === k) {
            return p;
        }
        else if (p < k) {
            return select(p + 1, right);
        }
        else {
            return select(left, p - 1);
        }
    }

    const p = select(0, arr.length - 1);
    const minK = arr[p];
    console.log('p', p);
    console.log('minK', minK);
    console.log('arr', arr);

    return arr.slice(0, p);

}

let arr = [1,3,2,2,2,5,9,7,3,2,8];
let k = 8;

const res = findMinNumList(arr, k);
console.log('res', res);
