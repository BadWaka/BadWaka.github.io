
import {
    log
} from '../../../../algorithm/util.js';

/**
 * 思路：
 * 后序遍历根节点在最后
 * 二叉搜索树比它小的就是左子树
 * 比它大的就是右子树
 *
 * 先找到根节点
 * 再找到左右子树
 * 判断左子树是不是都小于根，右子树是不是都大于根
 * 如果符合，把左右子树扔进去继续递归
 */
function isLRD(arr) {
}

let arr = [5, 7, 6, 9, 11, 10, 8];
arr = [7, 4, 6, 5];
const res = isLRD(arr);
log('res', res);
