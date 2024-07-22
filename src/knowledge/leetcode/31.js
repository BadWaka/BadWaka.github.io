
/**
 * @returns
 */
function f(nums) {

    console.log('nums', nums);

    // 首先从最后一个数开始，从后往前找，找到第一个比它小的数
    // 交换
    // 在交换位置后的数组，进行升序排列
    // 得到的结果就是符合预期的

    // 如果最后一个数前面没有比它小的怎么办？
    // 那就再从倒数第二个数开始找

    if (nums.length <= 1) {
        return nums;
    }

    for (let i = nums.length - 1; i > 0; i--) {
        console.log('\ni', i, 'nums[i]', nums[i]);
        for (let j = i - 1; j >= 0; j--) {
            console.log('j', j, 'nums[j]', nums[j]);
            if (nums[i] > nums[j]) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                const arr = nums.slice(j + 1).sort();
                console.log('arr', arr);
                arr.forEach((item, index) => {
                    nums[j + 1 + index] = item;
                });
                return nums;
            }
        }
    }

    return nums.sort();

}

function f1(nums) {
    console.log('nums', nums);

    if (nums.length <= 1) {
        return nums;
    }

    // const sortNums = nums.sort();
    // console.log('sortNums', sortNums);

    // 计算出 nums 的值
    const numsVal = getVal(nums);
    console.log('numsVal', numsVal);

    // 前一个大于当前的数量
    let preGreaterCurCount = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] >= nums[i + 1]) {
            preGreaterCurCount++;
        }
    }
    console.log('preGreaterCurCount', preGreaterCurCount);

    /**
     * 升序排列
     */
    if (preGreaterCurCount === 0) {
        // 最后两位换位置
        [nums[nums.length - 2], nums[nums.length - 1]] = [nums[nums.length - 1], nums[nums.length - 2]];
        return nums;
    }

    /**
     * 降序排列
     */
    if (preGreaterCurCount === nums.length - 1) {
        // 已达最大，重新取最小，直接升序排列，反转术式
        return nums.reverse();
    }

    /**
     * 混序
     */
    // // 开始索引，从最后开始
    // let startIndex = nums.length - 1;
    // // 记录值
    // let val = 0;
    // for (let i = 1; i < nums.length; i++) {
    //     if (startIndex - i >= 0) {
    //         [nums[startIndex - i], nums[startIndex]] = [nums[startIndex], nums[startIndex - i]];
    //         val = getVal(nums);
    //         console.log('val', val);
    //         if (val > numsVal && val > minGreaterNumsVal) {
    //             minGreaterNumsVal = val;
    //         }
    //         // 再交换回去，避免打乱顺序
    //         [nums[startIndex - i], nums[startIndex]] = [nums[startIndex], nums[startIndex - i]];
    //     }
    // }
    // console.log('minGreaterNumsVal', minGreaterNumsVal);
    const arrArrange = getAllArrange(nums);
    console.log('arrArrange', arrArrange);

    // 记录字典序大于 nums 的排列哪个最小
    let minGreaterNumsVal = Infinity;
    let minArr = [];
    let val = 0;
    arrArrange.forEach(item => {
        val = getVal(item);
        console.log('val', val);
        if (val > numsVal && val < minGreaterNumsVal) {
            minGreaterNumsVal = val;
            minArr = item;
        }
    });
    console.log('minGreaterNumsVal', minGreaterNumsVal, 'minArr', minArr);

    for (let i = 0; i < nums.length; i++) {
        nums[i] = minArr[i];
    }

    return nums;

}

// 获得数组的值
function getVal(nums) {
    return +nums.join('');
}

// 数组全排列
function getAllArrange(nums) {
    // console.log('全排列 nums', nums);
    if (nums.length === 0) {
        return [];
    }
    if (nums.length === 1) {
        return [nums];
    }
    if (nums.length === 2) {
        return [
            [nums[0], nums[1]],
            [nums[1], nums[0]]
        ];
    }

    const arr = [];
    for (let i = 0; i < nums.length; i++) {
        const item = nums[i];
        const restArr = nums.slice(0, i).concat(nums.slice(i + 1));
        // console.log('item', item, 'restArr', restArr);
        const newArr = getAllArrange(restArr);
        // console.log('newArr', newArr);
        newArr.forEach(itemArr => {
            itemArr.unshift(item);
            arr.push(itemArr);
        });
    }
    return arr;
}

let params = [1, 2, 3];
params = [3, 2, 1];
params = [4,2,0,2,3,2,0];
// params = [2, 1, 3];
// params = [1, 3, 2];
// params = [5, 1, 1];
// params = [3,1,4,4,2,3,4,0,0];
// params = [1];
// params = [1, 1, 5];
const res = f(params);
console.log('\nres', res);
