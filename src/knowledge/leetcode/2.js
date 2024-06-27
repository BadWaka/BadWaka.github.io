
import {
    array2LinkedList
} from '../algorithm/util.js';

/**
 * @returns
 */
function f(l1, l2) {
    l1 = array2LinkedList(l1);
    l2 = array2LinkedList(l2);
    console.log('l1', l1, 'l2', l2);
}

let l1 = [2,4,3];
let l2 = [5,6,4];
const res = f(l1, l2);
console.log('\nres', res);
