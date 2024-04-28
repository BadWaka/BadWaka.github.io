
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    if (nums === null || nums.length === 0 || nums[0] === null) {
        return null;
    }

    const tree = genBinaryTree(nums);
    log('tree', tree);

    function flip(node) {
        if (!node) {
            return;
        }
        const tmp = node.left;
        node.left = node.right;
        node.right = tmp;
        if (node.left) {
            flip(node.left);
        }
        if (node.right) {
            flip(node.right);
        }
    }
    flip(tree);

    return tree;

}

let params = [4,2,7,1,3,6,9];
const res = f(params);
console.log('res', res);
