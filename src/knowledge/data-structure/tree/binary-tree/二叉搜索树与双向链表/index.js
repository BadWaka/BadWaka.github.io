
import {
    log
} from '../../../../algorithm/util.js';

/**
 * 转换二叉搜索树 to 双向链表
 * 思路：
 * 递归
 * 先转换左子树，再转换右子树
 * 然后把它们的结果和当前节点的值链接起来
 * 如果当前节点是叶子节点，就直接连
 */
function transBST2DLL(node) {
    // log('node', node);

    function dfs(node) {
        if (!node) {
            return [];
        }

        // 放入数组
        // 因为左子树是最后一个节点和当前节点链接，右子树是第一个节点和当前节点链接
        // 数组比较好查询
        let arr = [];
        const left = dfs(node.left);
        const right = dfs(node.right);
        delete node.left;
        delete node.right;
        if (left && left.length > 0) {
            // 先把左边都放入数组
            arr = arr.concat(left);
            console.log('arr', arr);
            // 数组的最后一项的 next 指向当前节点 node
            arr[arr.length - 1].next = node;
            // 当前节点 node 的 prev 指向数组的最后一项
            node.prev = arr[arr.length - 1];
        }
        // 把当前节点放进数组
        arr.push(node);
        if (right && right.length > 0) {
            right[0].prev = node;
            node.next = right[0];
            arr = arr.concat(right);
        }
        return arr;
    }

    const arr = dfs(node);
    return arr[0];
}

let a = {
    val: 10,
    left: {
        val: 6,
        left: {
            val: 4
        },
        right: {
            val: 8
        }
    },
    right: {
        val: 14,
        left: {
            val: 12
        },
        right: {
            val: 16
        }
    }
};

const res = transBST2DLL(a);
log('res', res);
