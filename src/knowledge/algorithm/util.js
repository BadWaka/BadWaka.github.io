
import util from 'util';

export function log(prefix, obj) {
    console.log(prefix, util.inspect(obj, {depth: null, colors: true}));
}

/**
 * 树节点
 *
 * @param {*} val
 * @param {*} left
 * @param {*} right
 */
export function TreeNode(val, left, right) {
    this.val = val;
    if (left) {
        this.left = left;
    }
    if (right) {
        this.right = right;
    }
}

/**
 * 生成二叉树，从数组
 *
 * @param {Array} nums
 * @returns
 */
export function genBinaryTree(nums) {
    if (nums === null || nums.length === 0 || nums[0] === null) {
        return null;
    }
    let root = new TreeNode(nums[0]);
    let queue = [root];
    let i = 1;
    while(i < nums.length) {
        const item = nums[i];
        const node = queue[0];
        // console.log('\nitem', item, 'node', node);
        if (node.left === undefined) {
            if (!item) {
                node.left = null;
            }
            else {
                node.left = new TreeNode(item);
                queue.push(node.left);
            }
        }
        else if (node.right === undefined) {
            if (!item) {
                node.right = null;
            }
            else {
                node.right = new TreeNode(item);
                queue.push(node.right);
            }
            queue.shift();
        }
        else {
            queue.shift();
        }
        i++;
    }
    // log('\nroot', root);
    return root;
}

/**
 * 链表节点
 *
 * @param {*} val
 * @param {*} next
 */
export function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * 把数组转换为链表
 *
 * @param {*} arr
 * @returns
 */
export function array2LinkedList(arr) {
    let head = null;
    let last = null;
    for (let i = 0; i < arr.length; i++) {
        if (!head) {
            head = new ListNode(arr[i], null);
            last = head;
            continue;
        }
        let cur = new ListNode(arr[i], null);
        if (last && !last.next) {
            last.next = cur;
        }
        last = cur;
    }
    return head;
}
