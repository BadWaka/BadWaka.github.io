
import {
    array2LinkedList
} from '../data-structure/linkedlist/index.js';

/**
 * @returns
 */
function reverseList(head) {
    head = array2LinkedList(head);
    // console.log(head);
    let arr = [head];
    while(head.next) {
        arr.push(head.next);
        head = head.next;
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        arr[i].next = arr[i - 1] || null;
    }
    // console.log(arr);
    return arr[arr.length - 1];
}

let head = [1,2,3,4,5];
const res = reverseList(head);
console.log('\nres', res);
