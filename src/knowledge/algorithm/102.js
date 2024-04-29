
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    if (nums === null || nums.length === 0 || nums[0] === null) {
        return false;
    }

    const tree = genBinaryTree(nums);
    log('tree', tree);
    const list = [];

    function getNodeLayer(node, list) {
        let queue = [node];
        let layer = 0;
        if (!node) {
            return layer;
        }
        while(queue.length > 0) {
            let layerNodeList = [];
            while(queue.length > 0) {
                node = queue.shift();
                list.push(node);
                layerNodeList.push(node);
            }
            layer++;
            for (let i = 0; i < layerNodeList.length; i++) {
                node = layerNodeList[i];
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

    getNodeLayer(tree, list);
    return list;
}

let params = [1,2,3,4,5];
// params = [5,2,null,4,3,1];
// params = [4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2];
params = [3,9,20,null,null,15,7];
const res = f(params);
console.log('res', res);
