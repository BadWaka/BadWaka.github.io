
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(nums) {
    const root = genBinaryTree(nums);
    log('root', root);

    // const list = [];
    // function rightSideView(node) {
    //     if (!node) {
    //         return;
    //     }
    //     list.push(node.val);
    //     if (node.right) {
    //         rightSideView(node.right);
    //     }
    //     else if (node.left) {
    //         rightSideView(node.left);
    //     }
    // }
    // rightSideView(root);
    // console.log('list', list);

    const list = [];
    const queue = [root];
    while(queue.length > 0) {
        const layerList = [];
        let node = null;
        while(queue.length > 0) {
            node = queue.shift();
            layerList.push(node);
        }
        console.log('\nlayerList', layerList);
        for (let i = 0; i < layerList.length; i++) {
            node = layerList[i];
            if (i === layerList.length - 1) {
                list.push(node.val);
            }
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }
    return list;
}

let params = [1,2,3,null,5,null,4];
params = [1, 2];
params = [1,2,3,4];
const res = f(params);
console.log('res', res);
