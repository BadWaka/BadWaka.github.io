
import {
    log
} from '../../../algorithm/util.js';

/**
 * 第一种方法时间复杂度是 O(n)，需要从头到尾顺序遍历链表
 *
 * 第二种方法是
 */
function deleteLinkedListNode(root, node) {
    // log('', root);
    let next = node.next;
    log('next', next);
    node.val = next.val;
    node.next = next.next;
    log('root', root);
    next = null;
}

let node = {
    val: 4,
    next: {
        val: 5,
        next: {
            val: 6,
            next: null
        }
    }
};

let root = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: node
        }
    }
};

const res = deleteLinkedListNode(root, node);
console.log('res', res);
