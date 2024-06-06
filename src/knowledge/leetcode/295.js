
class MedianFinder {

    // 列表
    list;
    // 是否是奇数
    isOdd;
    // 中位数
    median;
    // 计算中位数的第一个数；如果 list 的长度是偶数，则是较小的那个值
    m1;
    // 计算中位数的第二个数；如果 list 的长度是偶数，则是较大的那个值；如果是奇数，则没有值
    m2;

    constructor() {
        this.list = [];
        this.isOdd = false;
        this.median = null;
    }

    addNum(num) {
        this.list.push(num);
        this.isOdd = !this.isOdd;

        if (this.list.length === 1) {
            this.median = num;
            this.m1 = num;
            return;
        }

        if (this.list.length === 2) {
            this.median = (this.list[0] + this.list[1]) / 2;
            this.m1 = Math.min(this.list[0], this.list[1]);
            this.m2 = Math.max(this.list[0], this.list[1]);
            return;
        }
    }

    findMedian() {
        if (this.list.length <= 2) {
            return this.median;
        }

        // 奇数
        if (this.isOdd) {
            const mid = Math.floor(this.list.length / 2);
            const val = this.quickSelect(this.list, 0, this.list.length - 1, mid);
            console.log('val', val);
        }

        // this.list = this.list.sort((a, b) => a - b);
        // 偶数
        // if (this.list.length % 2 === 0) {
        //     const mid = this.list.length / 2;
        //     const median = (this.list[mid - 1] + this.list[mid]) / 2;
        //     return median.toFixed(1);
        // }
        // const mid = Math.floor(this.list.length / 2);
        // const median = this.list[mid];
        // return median.toFixed(1);
    }

    // 快速选择，类似快速排序
    quickSelect(arr, left, right, k) {
        console.log('arr, left, right, k', arr, left, right, k);
        if (left === right) {
            return arr[left];
        }
    }

    // 得到中点
    partition(arr, left, right) {

    }

}

const medianFinder = new MedianFinder();
medianFinder.addNum(4);
medianFinder.addNum(1);
medianFinder.addNum(0);
// medianFinder.addNum(-1);
const median = medianFinder.findMedian();
console.log('medianFinder', medianFinder.list, 'medianFinder.isOdd', medianFinder.isOdd);
console.log('median', median);
