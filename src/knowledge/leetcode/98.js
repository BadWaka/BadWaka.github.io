
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    const root = genBinaryTree(nums);
    log('root', root);

    const list = [];
    function dfs(node) {
        if (!node) {
            return;
        }
        dfs(node.left);
        list.push(node.val);
        dfs(node.right);
    }
    dfs(root);
    console.log('list', list);

    for (let i = 0; i < list.length; i++) {
        if (list[i] >= list[i + 1]) {
            return false;
        }
    }
    return true;

    // 是否是二叉搜索树
    // function isBinarySearchTree(node, valList = []) {
    //     if (!node) {
    //         return true;
    //     }
    //     valList.push(node.val);
    //     let leftCurRes = false;
    //     let rightCurRes = false;
    //     if (
    //         !node.left || (node.left && node.val > node.left.val)
    //     ) {
    //         leftCurRes = true;
    //     }
    //     if (
    //         !node.right || (node.right && node.val < node.right.val)
    //     ) {
    //         rightCurRes = true;
    //     }
    //     // 后进入递归，能减少循环次数
    //     let leftChildRes = false;
    //     let rightChildRes = false;
    //     if (leftCurRes && rightCurRes) {
    //         leftChildRes = isBinarySearchTree(node.left, valList.slice());
    //         rightChildRes = isBinarySearchTree(node.right, valList.slice());
    //     }
    //     console.log('\n', 'node.val', node.val, 'valList', valList, 'leftCurRes', leftCurRes, 'rightChildRes', rightChildRes, 'leftCurRes', leftCurRes, 'rightCurRes', rightCurRes, 'leftChildRes', leftChildRes, 'rightChildRes', rightChildRes);
    //     if (leftChildRes && rightChildRes && leftCurRes && rightCurRes) {
    //         return true;
    //     }
    //     return false;
    // }
    // return isBinarySearchTree(tree);
}

let params = [2,1,3];
params = [5,1,4,null,null,3,6];
params = [5,4,6,null,null,3,7];
const res = f(params);
console.log('res', res);
