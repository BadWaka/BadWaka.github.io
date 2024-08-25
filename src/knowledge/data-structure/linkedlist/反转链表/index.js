
import {
    log
} from '../../../algorithm/util.js';

/**
 * 三个指针
 */
function reverse1(root) {
    log('', root);
    if (!root || !root.next) {
        return root;
    }
    let prefix = null;
    let cur = root;
    let next = cur.next;
    while(cur) {
        // 先把当前 node 的 next 指向前一个
        cur.next = prefix;
        // 再把前一个指向当前 node
        prefix = cur;
        // 当年 node 往前移
        cur = next;
        if (next) {
            next = next.next;
            cur.next = prefix;
        }
    }
    return prefix;
}

/**
 * 用递归实现
 */
function reverse(root) {

}

// let node2 = {
//     val: 7,
//     next: {
//         val: 8,
//         next: {
//             val: 9,
//             next: null
//         }
//     }
// };

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

// node2.next.next.next = node;

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

const res = reverse(root);
log('res', res);
