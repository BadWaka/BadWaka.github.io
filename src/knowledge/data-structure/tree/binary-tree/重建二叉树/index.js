
/**
 * 题目:
 * 输入某 二叉树的前序遍历和中序遍历的结果，请重建该 二叉树。
 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 例如，
 * 输入 前 序 遍 历 序 列 1 ，2 . 4 ，7 , 3 , 5 . 6 . 8 }
 * 和 中 序 遍 历 序 列 {4 ，7 , 2 , 1 , 5 , 3 ，8 ，6 }，
 * 则 重建如图2.6 所示的二叉树并输出它的头节点
 *
 * 思路：
 * 首先通过前序遍历数组找到根节点
 * 再在中序遍历数组中找到根节点的位置，左边的都是左子树；右边的都是右子树
 * 然后根据数量可以在前序遍历数组中，找到左子树和右子树的前序遍历数组
 * 这样左子树的前序遍历数组和右子树的前序遍历数组都有了，可以继续通过一样的方法递归还原左子树和右子树
 */
function rebuildBinaryTree(preorder, inorder) {
    // 容错
    if (!preorder || preorder.length === 0) {
        return null;
    }
    if (!inorder || inorder.length === 0) {
        return null;
    }

    // 前序列表第一项就是根节点的值
    const rootVal = preorder[0];
    // 根节点
    const root = {
        val: rootVal
    };

    // 在中序列表里找根节点的位置
    const index = inorder.indexOf(rootVal);
    console.log('index', index);

    // 左子树的中序列表
    const leftChildInorder = inorder.slice(0, index);
    console.log('leftChildInorder', leftChildInorder);

    // 右子树的中序列表
    const rightChildInorder = inorder.slice(index + 1);
    console.log('rightChildInorder', rightChildInorder);

    // 左子树的前序列表
    const leftChildPreorder = preorder.slice(1, leftChildInorder.length + 1);
    console.log('leftChildPreorder', leftChildPreorder);

    // 右子树的中序列表
    const rightChildPreorder = preorder.slice(leftChildInorder.length + 1);
    console.log('rightChildPreorder', rightChildPreorder);

    // 递归的找左右子树
    root.leftChild = rebuildBinaryTree(leftChildPreorder, leftChildInorder);
    root.rightChild = rebuildBinaryTree(rightChildPreorder, rightChildInorder);

    return root;
}

let preorder = [1, 2, 4, 7, 3, 5, 6, 8];
let inorder = [4, 7, 2, 1, 5, 3, 8, 6];
const res = rebuildBinaryTree(preorder, inorder);
console.log('res', res);
