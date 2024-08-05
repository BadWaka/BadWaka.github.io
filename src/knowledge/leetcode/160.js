import {
    array2LinkedList
} from '../data-structure/linkedlist/index.js';

/**
 * @returns
 */
function getIntersectionNode(headA, headB) {
    headA = array2LinkedList(headA);
    headB = array2LinkedList(headB);
    const map = new Map();
    let node = headA;
    while(node) {
        map.set(node, true);
        // map[node.val] = true;
        node = node.next;
    }
    console.log('map', map);
    node = headB;
    while(node) {
        if (map.has(node)) {
            return node;
        }
        node = node.next;
    }
    return null;
}

let headA = [4,1,8,4,5];
let headB = [5,6,1,8,4,5];
const res = getIntersectionNode(headA, headB);
console.log('\nres', res);
