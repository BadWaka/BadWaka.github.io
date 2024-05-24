
import {
    genBinaryTree,
    log
} from './util.js';

/**
 * @returns
 */
function f(preorder, inorder) {
    console.log('preorder', preorder, 'inorder', inorder);

    if (preorder.length === 0) {
        return null;
    }

    const root = {
        val: preorder[0]
    };
    // 记录索引
    const inorderMap = {
    };
    for (let i = 0; i < inorder.length; i++) {
        inorderMap[inorder[i]] = i;
    }
    console.log('\nroot', root);
    console.log('inorderMap', inorderMap);
    const leftInorder = inorder.slice(0, inorderMap[root.val]);
    const rightInorder = inorder.slice(inorderMap[root.val] + 1);
    console.log('leftInorder', leftInorder);
    console.log('rightInorder', rightInorder);
    const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
    const rightPreorder = preorder.slice(1 + leftPreorder.length);
    console.log('leftPreorder', leftPreorder);
    console.log('rightPreorder', rightPreorder);
    const left = f(leftPreorder, leftInorder);
    const right = f(rightPreorder, rightInorder);
    if (left) {
        root.left = left;
    }
    if (right) {
        root.right = right;
    }
    return root;

    // const root = {
    //     val: preorder[0]
    // };
    // let node = root;
    // for (let i = 1; i < preorder.length; i++) {
    //     // 假定是左
    //     const cur = preorder[i];
    //     console.log('\ncur', cur);
    //     const inorderIndex = inorder.indexOf(cur);
    //     console.log('在中序数组里的位置索引 inorderIndex', inorderIndex);
    //     const preorderPre = preorder[i - 1]
    //     console.log('在先序数组里的上一位 preorderPre', preorderPre);
    //     const inorderNext = inorder[inorderIndex + 1];
    //     console.log('在中序数组里下一位 inorderNext', inorderNext);
    //     const inorderNextPreorderIndex = preorder.indexOf(inorderNext);
    //     console.log('在先序数组里的位置索引 inorderNextPreorderIndex', inorderNextPreorderIndex);
    //     if (preorderPre === inorderNext) {
    //         node.left = {
    //             val: cur
    //         };
    //         if (inorderIndex !== 0) {
    //             node = node.left;
    //         }
    //     }
    //     else {
    //         node.right = {
    //             val: cur
    //         };
    //         node = node.right;
    //     }
    // }
    // log('root', root);
    // return root;
}

let preorder = [3,9,20,15,7], inorder = [9,3,15,20,7];
// preorder = [-1], inorder = [-1];
const res = f(preorder, inorder);
console.log('res', res);
