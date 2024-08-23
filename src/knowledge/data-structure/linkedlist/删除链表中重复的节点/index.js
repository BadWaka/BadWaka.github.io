
import {
    log
} from '../../../algorithm/util.js';

/**
 * 思路：
 * 既然是排序的链表
 * 那我从前往后遍历就好了
 * 记录上一个 node 的值
 * 如果当前 node 的值等于上一个 node 的值，就把当前 node 删掉
 * 如果当前 node 的值不等于上一个 node 的值，就把上一个 node 的值更新然后继续找下一个
 * 时间复杂度 O(n)
 */
function deleteLinkedListRepeatNode(root) {
    if (!root || !root.next) {
        return root;
    }
    // 上一个 node 的值
    let lastNode = root;
    let node = root.next;
    while(node) {
        if (node.val === lastNode.val) {
            lastNode.next = node.next;
        }
        else {
            lastNode = node;
        }
        node = node.next;
    }
    log('', root);
}

let node = {
    val: 4,
    next: {
        val: 5,
        next: {
            val: 5,
            next: null
        }
    }
};

let root = {
    val: 1,
    next: {
        val: 1,
        next: {
            val: 3,
            next: node
        }
    }
};

const res = deleteLinkedListRepeatNode(root);
console.log('res', res);
