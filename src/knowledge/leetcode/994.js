
/**
 * @returns
 */
function f(nums) {
    console.log('nums', nums);

    // 找到好的和坏的，放入 map
    let badMap = {};
    let goodMap = {};
    for (let i = 0; i < nums.length; i++) {
        const arr = nums[i];
        console.log('arr', arr);
        for (let j = 0; j < arr.length; j++) {
            const item = arr[j];
            if (item === 2) {
                badMap[`${i},${j}`] = true;
            }
            else if (item === 1) {
                goodMap[`${i},${j}`] = true;
            }
        }
    }
    console.log('badMap', badMap);
    console.log('goodMap', goodMap);

    // 极限情况判断
    if (Object.keys(goodMap).length === 0) {
        return 0;
    }
    if (Object.keys(badMap).length === 0) {
        return -1;
    }

    // 还有好的就一直循环
    let count = 0;
    // let lastBadListLength = 0;

    while(Object.keys(goodMap).length > 0 && Object.keys(badMap).length > 0) {
        count++;

        // 如果上一次坏的数量没有变化，则认为永远有好的无法被感染
        // if (lastBadListLength === Object.keys(badMap).length) {
        //     return -1;
        // }

        // 记录上一次的 badList length
        // lastBadListLength = Object.keys(badMap).length;

        Object.keys(badMap).forEach(key => {
            delete badMap[key];
            const arr = key.split(',');
            const x = parseInt(arr[0], 10);
            const y = parseInt(arr[1], 10);
            console.log('x', x, 'y', y);

            const top = `${x},${y - 1}`;
            const bottom = `${x},${y + 1}`;
            const left = `${x - 1},${y}`;
            const right = `${x + 1},${y}`;

            // 上
            if (goodMap[top]) {
                console.log('上边有好的');
                badMap[top] = true;
                delete goodMap[top];
            }
            // 下
            if (goodMap[bottom]) {
                console.log('下边有好的');
                badMap[bottom] = true;
                delete goodMap[bottom];
            }
            // 左
            if (goodMap[left]) {
                console.log('左边有好的');
                badMap[left] = true;
                delete goodMap[left];
            }
            // 右
            if (goodMap[right]) {
                console.log('右边有好的');
                badMap[right] = true;
                delete goodMap[right];
            }
        });
    }
    console.log('badMap', badMap);
    console.log('goodMap', goodMap);

    if (Object.keys(goodMap).length > 0) {
        return -1;
    }

    return count;
}

let params = [[2,1,1],[1,1,0],[0,1,1]];
// params = [[0,2]];
params = [[2,1,1],[0,1,1],[1,0,1]];
// params = [[0]];
const res = f(params);
console.log('\nres', res);
