
import {
    log
} from '../../../algorithm/util.js';

/**
 * 思路：
 * 新建一个链表
 * 用两个指针遍历两个链表
 * 谁小谁就先放进新链表里
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
function mergeSortLinkedList(head1, head2) {
    log('head1', head1);
    log('head2', head2);

    if (!head1 && !head2) {
        return null;
    }
    if (!head1) {
        return head2;
    }
    if (!head2) {
        return head1;
    }

    let p1 = head1;
    let p2 = head2;
    let root = {
        val: null
    };
    let p3 = root;
    while(p1 || p2) {
        if (!p1) {
            p3.next = {
                val: p2.val
            };
            p3 = p3.next;
            p2 = p2.next;
            continue;
        }
        if (!p2) {
            p3.next = {
                val: p1.val
            };
            p3 = p3.next;
            p1 = p1.next;
            continue;
        }

        if (p1.val < p2.val) {
            p3.next = {
                val: p1.val
            };
            p1 = p1.next;
        }
        else {
            p3.next = {
                val: p2.val
            };
            p2 = p2.next;
        }
        p3 = p3.next;
    }
    return root.next;
}

let head1 = {
    val: 3,
    next: {
        val: 4,
        next: {
            val: 6,
            next: null
        }
    }
};

// node2.next.next.next = node;

let head2 = {
    val: 1,
    next: {
        val: 7,
        next: {
            val: 10,
            next: null
        }
    }
};

const res = mergeSortLinkedList(head1, head2);
log('res', res);
