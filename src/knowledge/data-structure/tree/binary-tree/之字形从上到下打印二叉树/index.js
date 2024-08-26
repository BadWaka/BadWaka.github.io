
import {
    log
} from '../../../../algorithm/util.js';

/**
 * 思路：
 * 层序遍历
 */
function bfs(tree) {
    if (!tree) {
        return [];
    }
    let queue = [tree];
    let arr = [];
    while(queue.length > 0) {
        const layerArr = [];
        while(queue.length > 0) {
            const node = queue.shift();
            layerArr.push(node);
        }
        console.log('layerArr', layerArr);
        for (let i = 0; i < layerArr.length; i++) {
            arr.push(layerArr[i].val);
            if (layerArr[i].left) {
                queue.push(layerArr[i].left);
            }
            if (layerArr[i].right) {
                queue.push(layerArr[i].right);
            }
        }
    }
    return arr;
}

let a = {
    val: 8,
    left: {
        val: 8,
        left: {
            val: 9
        },
        right: {
            val: 2,
            left: {
                val: 4
            },
            right: {
                val: 7
            }
        }
    },
    right: {
        val: 7
    }
};

// a = null;

// a = {
//     val: 1
// };

const res = bfs(a);
log('res', res);
