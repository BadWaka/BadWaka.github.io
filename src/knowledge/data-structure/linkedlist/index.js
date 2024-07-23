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