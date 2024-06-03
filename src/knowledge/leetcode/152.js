
function f(nums) {
    let max = nums[0];
    let min = nums[0];
    let finalMax = nums[0];
    for (let i = 1; i < nums.length; i++) {
        console.log('\nmax', max, 'min', min, 'nums[i]', nums[i]);
        if (nums[i] < 0) {
            [max, min] = [min, max];
        }
        max = Math.max(nums[i], max * nums[i]);
        min = Math.min(nums[i], min * nums[i]);
        finalMax = Math.max(finalMax, max);
        console.log('after max', max, 'min', min);
    }
    return finalMax;
}

/**
 * @returns
 */
function f2(nums) {
    console.log('nums', nums);
    let maxArea = nums[0];
    let maxAreaList = [nums[0]];
    for (let i = 0; i < nums.length; i++) {
        let area = nums[i];
        console.log('\narea', area, 'maxArea', maxArea, 'maxAreaList', maxAreaList);
        if (area > maxArea) {
            maxArea = area;
            maxAreaList = [nums[i]];
        }
        for (let j = i + 1; j < nums.length; j++) {
            area *= nums[j];
            console.log('area', area, 'maxArea', maxArea, 'maxAreaList', maxAreaList);
            if (area > maxArea) {
                maxArea = area;
                maxAreaList.push(nums[j]);
            }
        }
    }
    return maxArea;
}

let params = [2,3,-2,4];
params = [-2,0,-1];
const res = f(params);
console.log('\nres', res);
