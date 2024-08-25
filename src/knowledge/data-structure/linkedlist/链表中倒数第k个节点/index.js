
import {
    log
} from '../../../algorithm/util.js';

/**
 * 思路：
 * 额外数组
 * 新建一个数组 arr
 * 从头到尾遍历链表，把每个 node push 至数组末端
 * 拿数组的 arr.length - k 即可
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 *
 * 空间复杂度较高
 */

/**
 * 思路：
 * 快慢指针
 * 快指针先走 k 步
 * 然后慢指针再和快指针一起走
 * 当快指针走完时，慢指针就是倒数第 k 的节点
 *
 * 边界条件：
 * 如果 k 大于链表的长度，return null
 * 如果链表是空的，return null
 * 如果 k 为 0，return null
 * 如果 k 为 1，return root
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
function reverseKNode(root, k) {
    log('', root);
    if (!root) {
        return null;
    }
    if (k === 0) {
        return null;
    }
    if (k === 1) {
        return root;
    }
    let slow = root;
    let fast = root;
    for (let i = 1; i <= k; i++) {
        // 链表长度不足 k
        if (!fast.next) {
            return null;
        }
        fast = fast.next;
    }
    console.log('fast', fast);
    console.log('slow', slow);
    while(fast && slow) {
        fast = fast.next;
        slow = slow.next;
    }
    console.log('fast', fast);
    console.log('slow', slow);
    return slow;
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

let k = 2;

const res = reverseKNode(root, k);
console.log('res', res);
