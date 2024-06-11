
function longestValidParentheses(s) {
    let maxLen = 0;
    let stack = [-1]; // 初始化栈，开始时压入-1作为基准
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        }
        else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            }
            else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    return maxLen;
}

/**
 * @returns
 */
function f(nums) {
    const stack = [];
    const map = {
        ')': '('
    };
    // 有效括号数组
    // const effectList = [];
    // 有效括号 map
    const effectMap = {};
    for (let i = 0; i < nums.length; i++) {
        const char = nums[i];
        const top = stack[stack.length - 1];
        console.log('char', char, 'top', top);
        if (!top) {
            stack.push({
                // 把索引也存进去用于判断是否连续
                i,
                char
            });
            continue;
        }
        if (top.char === map[char]) {
            stack.pop();
            effectMap[top.i] = top.char;
            // effectList.push(top);
            effectMap[i] = nums[i];
            // effectList.push({
            //     i,
            //     char: nums[i]
            // });
            continue;
        }
        stack.push({
            i,
            char: nums[i]
        });
    }
    console.log('effectMap', effectMap);
    const effectList = Object.keys(effectMap);
    console.log('effectList', effectList);

    let lastIndex = -1; // 上一次的索引
    let maxCount = 0; // 最大计数
    let curMaxCount = 0; // 当前最大计数
    for (let i = 0; i < effectList.length; i++) {
        const item = effectList[i];
        console.log('lastIndex', lastIndex, 'maxCount', maxCount);
        if (lastIndex === -1) {
            lastIndex = parseInt(item, 10);
            curMaxCount++;
            continue;
        }
        if (parseInt(item, 10) - lastIndex === 1) {
            lastIndex = parseInt(item, 10);
            curMaxCount++;
            continue;
        }
        if (parseInt(item, 10) - lastIndex > 1) {
            console.log('大于1');
            maxCount = Math.max(maxCount, curMaxCount);
            lastIndex = parseInt(item, 10);
            curMaxCount = 1; // 重置 curMaxCount
            continue;
        }
    }
    maxCount = Math.max(maxCount, curMaxCount);
    console.log('maxCount', maxCount);

    return maxCount;
}

let params = '(()';
// params = ')()())';
// params = '';
params = '()(()';
// params = '()(())';
const res = f(params);
console.log('\nres', res);
