
import {
    log
} from '../../../../algorithm/util.js';

/**
 */
function getMirror(tree) {
    if (!tree) {
        return tree;
    }
    const tmp = tree.left;
    tree.left = tree.right;
    tree.right = tmp;
    getMirror(tree.left);
    getMirror(tree.right);
    return tree;
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

let b = {
    val: 8,
    left: {
        val: 9
    },
    right: {
        val: 2
    }
};

const res = getMirror(a);
log('res', res);
