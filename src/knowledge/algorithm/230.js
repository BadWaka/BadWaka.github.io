
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums, k) {
    const root = genBinaryTree(nums);
    log('root', root);

    const list = [];
    function inorderTraversal(node) {
        if (!node) {
            return;
        }
        inorderTraversal(node.left);
        list.push(node.val);
        inorderTraversal(node.right);
    }
    inorderTraversal(root);
    console.log('list', list);
    return list[k];
}

let params = [3,1,4,null,2];
let k = 1;
const res = f(params, k);
console.log('res', res);
