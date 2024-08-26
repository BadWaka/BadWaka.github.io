
/**
 * 思路：
 * 找 arr2 数组的第一个数 p2，在 arr1 里找到位置 p2Arr1Index
 * 再找 arr2 数组的第二个数，是否在刚才的数在 arr1 中的旁边
 *
 * 垃圾方法，废弃
 */
function isPopArr1(arr1, arr2) {
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

/**
 * 思路：
 * 辅助栈 assistStack
 * 遍历 arr2，每个元素判断是否在辅助栈栈顶
 *   如果不是，把 arr1 的从前往后依次入栈，直到栈顶元素为 arr2 中的元素
 *   如果是，直接辅助栈出栈，继续循环
 */
function isPopArr(arr1, arr2) {
    let assistStack = [];
    let arr3 = [];
    // arr1 的索引指针
    let p = 0;
    for (let i = 0; i < arr2.length; i++) {
        if (
            // 辅助栈为空
            assistStack.length === 0
            // 辅助栈栈顶不是对应的元素
            || arr2[i] !== assistStack[assistStack.length - 1]
        ) {
            // 把 arr1 的元素依次入辅助栈，直到找到与 arr2[i] 相等的为止
            while(arr1[p] && arr1[p] !== arr2[i]) {
                assistStack.push(arr1[p]);
                p++;
            }
            if (arr1[p] === arr2[i]) {
                arr3.push(arr1[p]);
                p++;
            }
            else {
                return false;
            }
        }
        // arr2[i] 与辅助栈栈顶相等
        else {
            // 辅助栈栈顶出栈，并添加到 arr3 里
            arr3.push(assistStack.pop());
        }
        console.log('i', i, 'arr2', arr2[i], 'assistStack', assistStack);
    }
    console.log('arr3', arr3);
    return true;
}

let arr1 = [1,2,3,4,5];
let arr2 = [4,5,3,2,1];
// arr2 = [4,3,5,1,2];
arr2 = [4,3,5,2,1];

const res = isPopArr(arr1, arr2);
console.log('res', res);
