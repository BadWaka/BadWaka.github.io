
/**
 * @returns
 */

function f(nums) {
    if (nums.length < 3) {
        return [];
    }

    // 排序，从小到大
    nums = nums.sort((a, b) => a - b);
    console.log('nums', nums);

    let result = [];
    const map = {};

    for (let i = 0; i < nums.length; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                const arr = [nums[i], nums[left], nums[right]];
                const str = arr.toString();
                if (!map[str]) {
                    result.push(arr);
                    map[str] = true;
                }
                left++;
                right--;
            }
            else if (sum < 0) {
                left++;
            }
            else {
                right--;
            }
        }
    }

    return result;
}

function f2(nums) {
    console.log('nums', nums);
    const arr = [];
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        console.log('\nnums[i]', nums[i]);
        const arr2 = find2sum(nums.slice(i + 1), 0 - nums[i], i);
        console.log('arr2', arr2);
        if (arr2.length > 0) {
            arr2.forEach(itemArr => {
                console.log('nums[i]', nums[i], 'itemArr', itemArr);
                if (nums[i] > itemArr[0] && nums[i] < itemArr[1]) {
                    itemArr.splice(1, 0, nums[i]);
                }
                else if (nums[i] <= itemArr[0]) {
                    itemArr.unshift(nums[i]);
                }
                else {
                    itemArr.push(nums[i]);
                }
                console.log('itemArr', itemArr.toString());
                const itemArrStr = itemArr.toString();
                if (!map[itemArrStr]) {
                    arr.push(itemArr);
                    map[itemArrStr] = true;
                }
            });
        }
    }
    console.log('arr', arr);
    return arr;
}

// 找到两个数的和 === sum
function find2sum(nums, sum, index) {
    console.log('find2sum nums', nums, 'sum', sum);
    const arr = [];
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === sum) {
                if (nums[i] > nums[j]) {
                    arr.push([nums[j], nums[i]]);
                }
                else {
                    arr.push([nums[i], nums[j]]);
                }
                // arr.push([i + index, j + index]);
            }
        }
    }
    return arr;
}

let params = [-1,0,1,2,-1,-4];
const res = f(params);
console.log('\nres', res);
