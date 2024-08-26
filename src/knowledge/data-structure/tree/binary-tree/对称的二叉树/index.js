
import {
    log
} from '../../../../algorithm/util.js';

/**
 * 思路：
 * 先算出它的镜像二叉树
 * 再比较它和它的镜像二叉树是否相等
 */

/**
 * 思路：
 * 深度优先搜索
 * 先遍历当前节点，再遍历左子树，再遍历右子树，打印一遍
 * 再遍历当前节点，先遍历右子树，再遍历左子树，打印一遍
 */
function isSymmetry(tree) {

    if (!tree) {
        return false;
    }

    function dfs(node, arr, rightFirst) {
        if (!node) {
            arr.push(null);
            return;
        }
        arr.push(node.val);
        if (!rightFirst) {
            dfs(node.left, arr);
            dfs(node.right, arr);
        }
        else {
            dfs(node.right, arr, true);
            dfs(node.left, arr, true);
        }
    }

    const arr1 = [];
    dfs(tree, arr1);
    console.log('arr1', arr1);

    const arr2 = [];
    dfs(tree, arr2, true);
    console.log('arr2', arr2);

    if (arr1.toString() === arr2.toString()) {
        return true;
    }
    return false;
}

let a = {
    val: 8,
    left: {
        val: 8,
        left: {
            val: 9
        },
        right: {
            val: 2,
            left: {
                val: 4
            },
            right: {
                val: 7
            }
        }
    },
    right: {
        val: 7
    }
};

a = null;

a = {
    val: 1
};

const res = isSymmetry(a);
log('res', res);
