
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    console.log('\nnums', nums);
    if (!nums || nums.length === 0) {
        return null;
    }

    // 找到中点的 index
    const middleIndex = findMiddleIndex(nums);
    console.log('middleIndex', middleIndex);

    const node = {
        val: nums[middleIndex]
    };

    const left = f(nums.slice(0, middleIndex));
    if (left) {
        node.left = left;
    }
    const right = f(nums.slice(middleIndex + 1, nums.length));
    if (right) {
        node.right = right;
    }

    return node;
}

function findMiddleIndex(list) {
    if (!list || list.length === 0) {
        return 0;
    }
    return parseInt(list.length / 2, 10);
}

let params = [-10,-3,0,5,9];
const res = f(params);
console.log('res', res);
