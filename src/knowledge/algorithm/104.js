
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    const tree = genBinaryTree(nums);
    log('tree', tree);
}

let params = [3,9,20,null,null,15,7];
const res = f(params);
console.log('res', res);
