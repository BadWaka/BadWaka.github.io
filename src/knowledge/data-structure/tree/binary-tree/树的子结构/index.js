
import {
    log
} from '../../../../algorithm/util.js';

/**
 */
function isBIsAChildTree(a, b) {
    // log('a', a);
    // log('b', b);
    if (!a) {
        return false;
    }
    if (!b) {
        return false;
    }
    // 如果 a 的值和 b 的值相等
    if (a.val === b.val) {
        let resLeft = true;
        let resRight = true;
        // 如果 b 有左子树
        if (b.left) {
            // 递归的往下面找
            resLeft = isBIsAChildTree(a.left, b.left);
        }
        // 右子树也一样
        if (b.right) {
            resRight = isBIsAChildTree(a.right, b.right);
        }
        if (resLeft && resRight) {
            return true;
        }
        return false;
    }
    // 如果 a 的值和 b 的值不相等呢，继续往下找
    const resLeft = isBIsAChildTree(a.left, b);
    const resRight = isBIsAChildTree(a.right, b);
    // 有一个为 true 就行了
    if (resLeft || resRight) {
        return true;
    }
    return false;
}

/**
 * 思路：
 * 需要实现一个函数，传入 a,b 两个树，判断它们是否相等
 */
var isSubStructure = function(A, B) {
    if (!A) {
        return false;
    }
    if (!B) {
        return false;
    }
    if (isSameStructure(A, B)) {
        return true;
    }
    const resLeft = isSubStructure(A.left, B);
    const resRight = isSubStructure(A.right, B);
    if (resLeft || resRight) {
        return true;
    }
    return false;
};

function isSameStructure(A, B) {
    if (!A && !B) {
        return false;
    }
    if (!A || !B) {
        return false;
    }
    if (A.val === B.val) {
        let resLeft = true;
        let resRight = true;
        if (B.left) {
            resLeft = isSameStructure(A.left, B.left);
        }
        if (B.right) {
            resRight = isSameStructure(A.right, B.right);
        }
        if (resLeft && resRight) {
            return true;
        }
        return false;
    }
    return false;
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

const res = isSubStructure(a, b);
log('res', res);
