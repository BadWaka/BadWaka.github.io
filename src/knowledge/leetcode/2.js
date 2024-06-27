
// import {
//     ListNode,
//     array2LinkedList
// } from '../algorithm/util.js';

/**
 * @returns
 */
function f(l1, l2) {
    l1 = array2LinkedList(l1);
    l2 = array2LinkedList(l2);
    console.log('l1', l1, 'l2', l2);

    // 是否加 1
    let isPlus1 = false;
    // 上一个节点
    let last = null;
    // 新的链表起始节点
    let l3 = null;

    while (l1 || l2) {
        let sum = (l1?.val || 0) + (l2?.val || 0) + (isPlus1 ? 1 : 0);
        if (sum >= 10) {
            isPlus1 = true;
            sum = sum - 10;
        }
        else {
            isPlus1 = false;
        }
        console.log('sum', sum, 'isPlus1', isPlus1);
        const newNode = new ListNode(sum, null);
        if (!l3) {
            l3 = newNode;
        }
        if (last) {
            last.next = newNode;
        }
        last = newNode;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    console.log('isPlus1', isPlus1);
    if (isPlus1) {
        const newNode = new ListNode(1, null);
        last.next = newNode;
    }

    return l3;
}

/**
 * 链表节点
 *
 * @param {*} val
 * @param {*} next
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * 把数组转换为链表
 *
 * @param {*} arr
 * @returns
 */
function array2LinkedList(arr) {
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

let l1 = [2,4,3];
l1 = [9,9,9,9,9,9,9];
let l2 = [5,6,4];
l2 = [9,9,9,9];
const res = f(l1, l2);
console.log('\nres', res);
