
import {
    array2LinkedList
} from '../data-structure/linkedlist/index.js';
console.log('array2LinkedList', array2LinkedList);

/**
 * @returns
 */
function f(nums) {
    if (nums.length === 0) {
        return false;
    }
    console.log('nums', nums);
    const head = array2LinkedList(nums);
    console.log('head', head);

    const map = new WeakMap();
    let node = head;
    while(node && !map.has(node)) {
        map.set(node, true);
        node = node.next;
    }
    console.log('lastNode', node);
    return map.has(node);
}

let params = [3,2,0,-4];
let pos = 1;
const res = f(params, pos);
console.log('\nres', res);
