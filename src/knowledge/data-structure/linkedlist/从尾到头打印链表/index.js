
import {array2LinkedList} from '../index.js';

/**
 * 使用额外数组存储
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 *
 * @param {*} s
 * @returns
 */
function printLinkedList(head) {
    head = array2LinkedList(head);
    console.log('head', head);

    const arr = [];
    let node = head;
    while(node) {
        arr.unshift(node);
        node = node.next;
    }
    arr.forEach(item => {
        console.log('val', item.val);
    });
    return arr;
}

let arr = [1, 3, 6, 8, 10];
const res = printLinkedList(arr);
console.log('res', res);