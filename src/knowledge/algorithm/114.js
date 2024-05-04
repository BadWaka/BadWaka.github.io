
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
        list.push(node);
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    console.log('节点数组 list', list);

    for (let i = 0; i < list.length; i++) {
        const node = list[i];
        node.left = null;
        if (list[i + 1]) {
            node.right = list[i + 1];
        }
    }
    console.log('链表 list', list);
    return root;
}

let params = [1,2,5,3,4,null,6];
const res = f(params);
console.log('res', res);
