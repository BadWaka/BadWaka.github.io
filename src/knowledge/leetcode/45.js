
function jump(nums) {
    let jumps = 0; // 跳跃次数
    let currentEnd = 0; // 当前跳跃能够到达的最远位置
    let farthest = 0; // 当前能够到达的最远位置
    let path = [0];         // 记录跳跃路径，初始位置为 0

    for (let i = 0; i < nums.length - 1; i++) {
        // console.log('\ni', i, 'nums[i]', nums[i], 'currentEnd', currentEnd, 'jumps', jumps);
        farthest = Math.max(farthest, i + nums[i]);
        // console.log('当前跳跃能够到达的最远位置 farthest', farthest);

        // 如果到达了当前跳跃的结束位置
        if (i === currentEnd) {
            // console.log('跳');
            jumps++;
            currentEnd = farthest;
            path.push(currentEnd); // 记录跳跃路径
        }
    }

    console.log('path', path);

    return jumps;
}

function f(nums) {
    const finalIndex = nums.length - 1;
    console.log('finalIndex', finalIndex);

    // 当前索引
    let index = 0;
    // 跳跃次数
    let count = 0;
    // 如果数组只有一个元素，则返回 0
    if (nums.length === 1) {
        return 0;
    }
    // 如果第 0 项的值已经大于等于 finalIndex 了，直接跳一次就到了
    if (nums[0] >= finalIndex) {
        return 1;
    }
    // 如果当前索引小于最终索引，就一直循环
    while (index < finalIndex) {
        console.log('\nindex', index, 'nums[index]', nums[index], 'count', count);
        let max = 0;
        let offset = 0;
        for (let i = index + 1; i <= (index + nums[index]); i++) {
            console.log('i', i, 'nums[i]', nums[i]);
            // 如果已经提前到达了 finalIndex
            if (i >= finalIndex) {
                count++;
                // 直接返回 count
                return count;
            }
            // 如果能到达的位置的索引，加上能到达位置的值，>= finalIndex
            if (i + nums[i] >= finalIndex) {
                // 直接跳两次
                count += 2;
                // 直接返回 count
                return count;
            }
            // 这里的等于是有说法的，如果后一个和前一个数值相等，优先取后一个，跳的更远
            if ((i + nums[i]) >= max) {
                max = i + nums[i];
                offset = i;
            }
        }
        console.log('offset', offset, 'max', max);
        index = offset;
        count++;
    }
    return count;
}

/**
 * @returns
 */
function f2(nums) {
    const finalIndex = nums.length - 1;
    console.log('finalIndex', finalIndex);
    if (finalIndex === 0) {
        return 0;
    }
    let count = 1;
    let sum = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        console.log('\ni', i, 'nums[i]', nums[i]);
        // if (nums[i] > 0) {
        //     count++;
        // }
        sum += nums[i];
        if (sum >= finalIndex) {
            break;
        }

        let maxSum = 0;
        let index = -1;
        for (let j = 1; j <= nums[i]; j++) {
            const curSum = j + nums[i + j];
            console.log('j', j, 'sum', sum, 'curSum', curSum);
            if (curSum > maxSum) {
                maxSum = curSum;
                index = j;
            }
        }
        console.log('maxSum', maxSum, 'index', index);
        if (maxSum > sum) {
            sum = maxSum;
            i = index + i - 1;
            count++;
        }
        if (sum >= finalIndex) {
            break;
        }

    }
    console.log('\ncount', count);
    return count;
}

let params = [2,3,1,1,4];
// params = [2,0,3,0,1,4];
// params = [2,0,0,1,3,0,4];
// params = [0];
// params = [2,0,2,0,1];
// params = [4,1,1,3,1,1,1];
// params = [3,4,3,2,5,4,3];
// params = [3,4,3,1,0,7,0,3,0,2,0,3];
// params = [1, 2];
// params = [1,1,1,1];
// params = [3,2,1];
// params = [1,1,2,1,1];
// params = [10,9,8,7,6,5,4,3,2,1,1,0];
params = [9,8,2,2,0,2,2,0,4,1,5,7,9,6,6,0,6,5,0,5];
// const res = f(params);
const res = jump(params);
console.log('\nres', res);
