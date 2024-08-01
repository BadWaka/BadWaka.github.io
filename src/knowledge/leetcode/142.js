
import {
    array2LinkedList
} from '../data-structure/linkedlist/index.js';
console.log('array2LinkedList', array2LinkedList);

/**
 * @returns
 */
function detectCycle(head) {
    if (!head) {
        return null;
    }
    if (!head.next) {
        return null;
    }
    const map = new Map();
    let node = head;
    while(node) {
        if (map.has(node)) {
            console.log('有环值为', node.val);
            return node;
        }
        map.set(node, true);
        node = node.next;
    }
    return null;
}

let head = '';
const res = detectCycle(head);
console.log('\nres', res);
