
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// 把数组转换为链表
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

/**
 * @returns
 */
function f(nums) {
    if (!nums) {
        return nums;
    }
    let head = array2LinkedList(nums);

    // 最终的 head
    let finalHead = head;
    // 统计次数
    let count = 0;
    // 当前 head 的上一个
    let last = null;

    // head 存在且 head.next 也要存在
    while(head && head.next) {
        count++;
        const next = head.next;
        console.log('\nhead', head)
        console.log('next', next);

        const nextNextBak = next.next;
        console.log('nextNextBak', nextNextBak);

        next.next = head;
        head.next = nextNextBak;

        // 如果当前 head 的上一个不为空，更新 last.next
        if (last) {
            last.next = next;
        }
        // 保存当前 head 的上一个
        last = head;

        // 继续下一轮循环
        head = head.next;

        // 如果是第一次，更新最终的 head
        if (count === 1) {
            finalHead = next;
        }
    }

    return finalHead;
}

let params = [1, 2, 3, 4];
const res = f(params);
console.log('\nres', res);
