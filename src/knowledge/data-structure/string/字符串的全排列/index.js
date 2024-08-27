
import {
    log
} from '../../../../algorithm/util.js';

/**
 * 序列化用层序遍历就行
 * 需要输出空节点
 */
function serializeBT(root) {
}

/**
 * 反序列化
 * 需要用到公式
 * 如果 n 是索引，那么 2n + 1 和 2n + 2 就是它的左子节点和右子节点
 */
function deserializeBT(arr) {
}

let a = {
    val: 10,
    left: {
        val: 6,
        left: {
            val: 4
        },
        right: {
            val: 8
        }
    },
    right: {
        val: 14,
        left: {
            val: 12
        },
        right: {
            val: 16
        }
    }
};

const res = transBST2DLL(a);
log('res', res);
