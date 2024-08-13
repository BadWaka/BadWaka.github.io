
import {genBinaryTree} from '../../tree.js';

/**
 * 题目：
 * 给定一棵二叉树和其中的一个节点，如何找出中序遍历序列的下一个节点?
 * 树中的节点除了有两个分别指向左、右子节点的指针，还有一个指向父节点的指针。
 *
 * 思路：
 * 找它的右子节点
 * - 如果它有右子节点
 *      如果右子节点有左子节点，继续往下找，递归
 *      如果右子节点没有左子节点，下一个节点就是右子节点
 * - 如果它没有右子节点
 *      找它的父元素
 *          如果它是它的父元素的左子节点，下一个节点就是它的父元素
 *          如果它是它的父元素的右子节点
 *              继续往上找，知道找到一个是左子节点的节点，这个节点的父节点就是下一个节点；
 *                  如果没有，那它已经是最后一个节点了
 */
function nextNode(nums) {
    const head = genBinaryTree(nums, true);
    console.log('head', head);
}

let nums = [1, 2, 4, 7, 3, 5, 6, 8];
const res = nextNode(nums);
console.log('res', res);
