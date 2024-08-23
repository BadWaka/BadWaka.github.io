
import {
    log
} from '../../../algorithm/util.js';

/**
 * 
 */
function deleteLinkedListRepeatNode(root) {
}

let node = {
    val: 4,
    next: {
        val: 5,
        next: {
            val: 6,
            next: null
        }
    }
};

let root = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: node
        }
    }
};

const res = deleteLinkedListRepeatNode(root);
console.log('res', res);
