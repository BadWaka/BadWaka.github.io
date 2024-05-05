
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function pathSum(nums, targetSum) {
    const root = genBinaryTree(nums);

    // 前缀和
    const map = {
        0: 1
    };
    // 首先要计算出每个节点的前缀和
    function dfs(node, cursum) {
        if (!node) {
            return 0;
        }
        console.log('\ndfs node', node, 'cursum', cursum);
        cursum += node.val;
        node.cursum = cursum;
        let result = 0;
        const oldsum = cursum - targetSum;
        console.log('oldsum', oldsum);
        result = map[oldsum] || 0;
        map[cursum] = (map[cursum] || 0) + 1
        console.log('map[cursum]', map[cursum]);
        result += dfs(node.left, cursum);
        result += dfs(node.right, cursum);
        map[cursum] = map[cursum] - 1;
        return result;
    }
    return dfs(root, 0);

    // function nodeSum(node, sum) {
    //     if (!node) {
    //         return 0;
    //     }
    //     let curNum = 0;
    //     if (node.val === sum) {
    //         curNum = 1;
    //     }
    //     const leftNum = nodeSum(node.left, sum - node.val);
    //     const rightNum = nodeSum(node.right, sum - node.val);
    //     console.log('\nnodeSum node.val', node.val, 'sum', sum, 'curNum', curNum, 'leftNum', leftNum, 'rightNum', rightNum);
    //     return leftNum + rightNum + curNum;
    // }

    // const stack = [root];
    // let count = 0;
    // while(stack.length > 0) {
    //     let node = stack.pop();
    //     const res = nodeSum(node, targetSum);
    //     count += res;
    //     console.log('node.val', node.val, 'res', res);
    //     if (node.right) {
    //         stack.push(node.right);
    //     }
    //     if (node.left) {
    //         stack.push(node.left);
    //     }
    // }
    // return count;
}

let params = [10,5,-3,3,2,null,11,3,-2,null,1];
let targetSum = 8;
params = [0,1,1];
targetSum = 1;
const res = pathSum(params, targetSum);
console.log('res', res);
