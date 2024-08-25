
import {
    log
} from '../../../algorithm/util.js';

/**
 * 思路：
 * 用额外 hashMap
 * 遍历链表中的每个节点，把该节点作为 key 放入 map
 * 判断它的下一个节点 next 是否在 map 中
 * 如果已经在了，就 return node.next
 * 如果不在，就继续往下找
 * 如果都遍历完了还没找到在 map 中的，就认为这链表没环
 *
 * 边界条件：
 * 链表为空
 * 链表没环
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */

/**
 * 思路：
 * 双指针
 * 先计算得到环的长度 k
 *   怎么才能得到环的长度呢
 *     用快慢指针，一个走一步，一个走两步
 *     如果它们相遇了，则证明有环，且相遇的节点必定在环内
 *     那么就当他们第一次相遇时开始计数，到他们第二次相遇时，就可以算出环的长度 k 了
 * 快指针先走 k 步
 * 然后和慢指针一起走
 * 当他们俩相遇便是环的入口节点
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
function findLoopNode(root) {
    log('', root);

    /**
     * 容错
     */
    if (!root || !root.next) {
        return null;
    }

    /**
     * 找到环的数量
     */
    let slow = root;
    let fast = root;
    // 慢的一次走一步
    slow = slow.next;
    // 快的一次走两步
    fast = fast.next.next;
    // 他俩不相等的话就一直循环
    while(slow !== fast) {
        // 如果有一个为 null 了，就认为链表没有环
        if (!slow || !fast) {
            return null;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    // 这个时候 slow 和 fast 应该是相等的
    // console.log('slow', slow);
    // console.log('fast', fast);
    // 开始计数
    let count = 0;
    // 记录当前节点
    let point = slow;
    slow = slow.next;
    count++;
    while(slow !== point) {
        slow = slow.next;
        count++;
    }
    // console.log('count', count);
    // 所以 count 就是环的长度

    /**
     * 快指针先走环的长度
     * 再和慢指针一起走
     * 相遇的时候就是环的入口
     */
    slow = root;
    fast = root;
    for (let i = 1; i <= count; i++) {
        fast = fast.next;
    }
    console.log('fast', fast);
    while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
}

let node2 = {
    val: 7,
    next: {
        val: 8,
        next: {
            val: 9,
            next: null
        }
    }
};

let node = {
    val: 4,
    next: {
        val: 5,
        next: {
            val: 6,
            next: node2
        }
    }
};

node2.next.next.next = node;

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

const res = findLoopNode(root);
console.log('res', res);
