
/**
 * @returns
 */
function f(nums) {
    // console.log('nums', nums);
    const answer = new Array(nums.length).fill(0);
    const stack = [];
    for (let i = 0; i < nums.length; i++) {
        console.log('\nnums[i]', nums[i]);
        let top = stack[stack.length - 1];
        if (stack.length === 0) {
            stack.push(i);
            continue;
        }
        console.log('stack', stack);
        console.log('nums[stack[stack.length - 1]', nums[stack[stack.length - 1]]);
        // 当前值大于栈顶端的值
        while(nums[i] > nums[stack[stack.length - 1]]) {
            // 出栈
            top = stack.pop();
            // 设置结果的值
            answer[top] = i - top;
        }
        stack.push(i);
    }
    // console.log('stack', stack);
    // console.log('map', map);
    return answer;
}

let params = [73,74,75,71,69,72,76,73];
// params = [89,62,70,58,47,47,46,76,100,70];
const res = f(params);
console.log('res', res);
