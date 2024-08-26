
/**
 * 思路：
 * 需要维护一个最小值索引栈 minIndexStack
 * 这个栈存的是索引，栈顶永远是当前栈内最小值的索引
 * 在入栈的时候判断入栈的值是否小于最小值索引栈栈顶的值
 *   如果小，就把入栈的这个元素的索引放在最小值索引栈最上面
 *   如果大于或等于，不管
 * 然后每次出栈的时候，判断当前出栈的元素是否在最小值索引栈里面
 *   如果在，移除去
 *   如果不在，直接出栈就完了
 *
 * 但是 pop 的时间不是 O(1)
 */

class Stack {

    list = [];
    // 最小值索引栈；存最小值的索引
    minIndexStack = [];

    constructor() {
    }

    push(item) {
        // 如果最小值索引栈没东西
        if (this.minIndexStack.length === 0) {
            // 直接存
            // this.list.length 其实就是索引
            this.minIndexStack.push(this.list.length);
        }
        // 最小值索引栈有值
        else {
            // 判断当前入栈值是否小于 最小值索引栈 顶端的值
            if (item < this.list[this.minIndexStack[this.minIndexStack.length - 1]]) {
                // 如果小于，就把索引放入最小值索引栈
                this.minIndexStack.push(this.list.length);
            }
            // 如果大于或者等于 不必理会
        }
        this.list.push(item);
    }

    pop() {
        // 找到当前要出栈的元素的索引是否在最小值索引栈中
        const index = this.minIndexStack.indexOf(this.list.length - 1);
        // 如果在
        if (index !== -1) {
            // 把它从最小值索引栈中移除
            this.minIndexStack.splice(index, 1);
        }
        return this.list.pop();
    }

    min() {
        return this.list[this.minIndexStack[this.minIndexStack.length - 1]];
    }
}

const stack = new Stack();
stack.push(3);
stack.push(2);
stack.push(1);
stack.push(20);
stack.push(100);
stack.push(1);
stack.pop();
const min = stack.min();
console.log('min', min);
