
/**
 * @returns
 */
function gpt(heights) {
    // 初始化最大面积为0
    let maxArea = 0;
    // 初始化栈
    const stack = [];
    // 在heights尾部添加一个0高度，确保所有柱子都能被处理
    heights.push(0);

    for (let i = 0; i < heights.length; i++) {
        console.log('\ni', i, 'heights[i]', heights[i], 'stack', stack);
        let count = 0;
        // 当栈不为空，且当前柱子的高度小于栈顶柱子的高度
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            count++;
            // 弹出栈顶元素，计算以该高度为矩形的高的最大面积
            const height = heights[stack.pop()];
            // 计算宽度
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            console.log('height', height, 'width', width, 'area', height * width);
            // 更新最大面积
            maxArea = Math.max(maxArea, height * width);
        }
        console.log('count', count);
        // 将当前索引压入栈
        stack.push(i);
    }

    console.log('\nstack', stack);

    // 清除在heights末尾添加的0
    heights.pop();
    return maxArea;
}

function f(heights) {
    const stack = [];
    let maxArea = 0;
    heights.push(0);
    for (let i = 0; i < heights.length; i++) {
        console.log('\ni', i, 'heights[i]', heights[i], 'stack', stack);
        if (stack.length === 0) {
            stack.push(i);
            continue;
        }
        let top = stack[stack.length - 1];
        let topHeight = heights[top];
        let count = 0;
        // 栈不为空，且栈顶高度大于当前高度
        while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
            count++;
            top = stack.pop();
            topHeight = heights[top];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            const area = topHeight * width;
            console.log('height', topHeight, 'width', width, 'area', area);
            if (area > maxArea) {
                maxArea = area;
            }
        }
        console.log('count', count);
        stack.push(i);
    }
    if (stack.length > 0) {
        console.log('\nstack', stack);
        // while (stack.length > 0) {
        //     const top = stack.pop();
        //     const topHeight = heights[top];
        //     const width = heights.length - (stack[stack.length - 1] || -1) - 1;
        //     const area = topHeight * width;
        //     console.log('topHeight', topHeight, 'width', width, 'area', area);
        //     if (area > maxArea) {
        //         maxArea = area;
        //     }
        // }
    }
    heights.pop();
    return maxArea;
}

let params = [2,1,5,6,2,3];
// params = [2,4];
const res = f(params);
// const res = gpt(params);
console.log('res', res);
