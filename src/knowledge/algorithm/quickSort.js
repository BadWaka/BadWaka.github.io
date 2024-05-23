
// 快速排序，额外数组
function quickSort(list) {
    if (list.length <= 1) {
        return list;
    }
    const mid = list[0];
    console.log('mid', mid);
    const leftList = [];
    const rightList = [];
    for (let i = 1; i < list.length; i++) {
        if (list[i] <= mid) {
            leftList.push(list[i]);
        }
        else {
            rightList.push(list[i]);
        }
    }
    console.log('leftList', leftList, 'rightList', rightList);
    const leftRes = quickSort(leftList);
    const rightRes = quickSort(rightList);
    return [...leftRes, mid, ...rightRes];
}

// 快速排序，互换
function quickSortPartition(list, left = 0, right = list.length - 1) {
    if (left < right) {
        const p = partition(list, left, right);
        console.log('list.slice(0, p)', list.slice(0, p), 'list.slice(p + 1)', list.slice(p + 1));
        quickSortPartition(list, left, p - 1);
        quickSortPartition(list, p + 1, right);
    }
    return list;
}

function partition(list, left, right) {
    console.log('\npartition list', list, 'left', left, 'right', right);
    // 取最左边的为支点
    const pivot = list[left];
    let i = left + 1;
    for (let j = left + 1; j <= right; j++) {
        if (list[j] < pivot) {
            [list[i], list[j]] = [list[j], list[i]];
            i++;
        }
    }
    [list[left], list[i - 1]] = [list[i - 1], list[left]];
    console.log('after partition list', list);
    return i - 1;
}

const list = [3, 2, 4, 19, 1, 0, -3, 8];
const sortList = quickSortPartition(list);
console.log('\nsortList', sortList);
