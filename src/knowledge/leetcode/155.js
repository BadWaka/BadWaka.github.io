
/**
 * @returns
 */
function MinStack() {
    this.list = [];
    this.minList = [];

    this.push = function (item) {
        console.log('push item', item);
        this.list.push(item);
        if (this.minList.length === 0) {
            this.minList.push(item);
        }
        else {
            this.minList.push(Math.min(item, this.minList[this.minList.length - 1]));
        }
    }

    this.pop = function () {
        this.list.pop();
        this.minList.pop();
    }

    this.top = function () {
        return this.list[this.list.length - 1];
    }

    this.getMin = function () {
        return this.minList[this.minList.length - 1];
        // let min = null;
        // for (let i = 0; i < this.list.length; i++) {
        //     if (min === null) {
        //         min = this.list[i];
        //         continue;
        //     }
        //     if (this.list[i] < min) {
        //         min = this.list[i];
        //     }
        // }
        // return min;
    }
}

const minStack = new MinStack();
minStack.push(0);
minStack.push(1);
minStack.push(-1);
minStack.push(2);
const top = minStack.top();
const min = minStack.getMin();
minStack.pop();
console.log('minStack', minStack, 'top', top, 'min', min);

// let params = '';
// const res = f(params);
// console.log('res', res);
