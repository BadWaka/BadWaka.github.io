
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    if (nums === null || nums.length === 0 || nums[0] === null) {
        return false;
    }

    const tree = genBinaryTree(nums);
    log('tree', tree);

    const listLeft = [];
    const listRight = [];

    // 根节点的左叶子前序遍历，右叶子后序遍历，然后对比两个数组是否相等

    // 前序遍历
    function dfsF(node, list) {
        if (!node) {
            list.push(null);
            return;
        }
        list.push(node.val);
        dfsF(node.left, list);
        dfsF(node.right, list);
    }

    // 后序遍历
    function dfsB(node, list) {
        if (!node) {
            list.push(null);
            return;
        }
        list.push(node.val);
        dfsB(node.right, list);
        dfsB(node.left, list);
    }

    dfsF(tree.left, listLeft);
    dfsB(tree.right, listRight);

    console.log('listLeft', listLeft);
    console.log('listRight', listRight);

    if (listLeft.join(',') === listRight.join(',')) {
        return true;
    }

    return false;
}

let params = [1,2,2,3,4,4,3];
// params = [1,2,2,null,3,null,3];
params = [2,3,3,4,5,5,4,null,null,8,9,9,8];
const res = f(params);
console.log('res', res);
