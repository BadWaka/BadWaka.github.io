
/**
 * @returns
 */

function maxSlidingWindow(nums, k) {
    // 最后返回的数组
    const fArr = [];
    // 队列；双端队列；递减；里面放的是索引
    let deque = [];
    for (let i = 0; i < nums.length; i++) {
        console.log('\n', 'i', i, 'nums[i]', nums[i]);
        // if (deque.length === 0) {
        //     deque.push(i);
        // }

        // 从后往前遍历队列
        // 如果队列的最后一项存在，并且值小于当前值
        while(
            deque[deque.length - 1] !== undefined
            && nums[deque[deque.length - 1]] < nums[i]
        ) {
            // 把最后一项干掉
            deque.pop();
        }

        // 从前往后遍历队列
        // 如果索引比 i 小了，则说明它不在窗口里了，要去掉
        while(deque[0] !== undefined && deque[0] <= i - k) {
            console.log('比他小');
            deque.shift();
        }
        console.log('deque', deque);

        // 把当前 i 放进去
        deque.push(i);
        console.log('deque', deque);

        if (i >= k - 1) {
            fArr.push(nums[deque[0]]);
        }

    }
    return fArr;
}

function maxSlidingWindow2(nums, k) {
    const fArr = [];
    let start = 0;
    while(start <= nums.length - k) {
        let tArr = nums.slice(start, start + k);
        console.log('tArr', tArr);
        let max = tArr[0];
        for (let i = 1; i < tArr.length; i++) {
            if (tArr[i] > max) {
                max = tArr[i];
            }
        }
        fArr.push(max);
        start++;
    }
    return fArr;
}

let nums = [1,3,-1,-3,5,3,6,7];
let k = 3;
// nums = [1, -1];
// k = 1;
const res = maxSlidingWindow(nums, k);
console.log('\nres', res);
