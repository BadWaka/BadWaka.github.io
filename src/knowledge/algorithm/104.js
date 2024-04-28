
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    if (nums === null || nums.length === 0 || nums[0] === null) {
        return 0;
    }

    const tree = genBinaryTree(nums);
    log('tree', tree);

    // 广度优先遍历
    function bfs(tree) {
        console.log('bfs');
        let queue = [tree];
        let node = null;
        let layer = 0;
        while(queue.length > 0) {
            let nodeList = [];
            // 全部出队列
            while(queue.length > 0) {
                node = queue.shift();
                nodeList.push(node);
            }
            // 层级++
            layer++;
            console.log('\nnodeList', nodeList);
            // 下一层全部入队列
            for (let i = 0; i < nodeList.length; i++) {
                node = nodeList[i];
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }
        }
        return layer;
    }
    return bfs(tree);

    // 递归
    // let maxDepth = 0;
    // function travel(node, depth) {
    //     console.log('\ntravel', node, 'depth', depth);
    //     if (!node) {
    //         return;
    //     }
    //     if (node.left || node.right) {
    //         depth++;
    //         if (maxDepth < depth) {
    //             maxDepth = depth;
    //         }
    //     }
    //     if (node.left) {
    //         travel(node.left, depth);
    //     }
    //     if (node.right) {
    //         travel(node.right, depth);
    //     }
    // }
    // travel(tree, 1);
    // return maxDepth;
    // return Math.max(maxDepthLeft, maxDepthRight);
}

let params = [3,9,20,null,null,15,7];
// params = [1,2,3,4,null,null,5];
params = [0,2,4,1,null,3,-1,5,1,null,6,null,8];
const res = f(params);
console.log('res', res);
