
/**
 * 树节点
 *
 * @param {*} val
 * @param {*} left
 * @param {*} right
 */
export function TreeNode(val, left, right) {
    this.val = val;
    if (left) {
        this.left = left;
    }
    if (right) {
        this.right = right;
    }
}

/**
 * 生成二叉树，从数组
 *
 * @param {Array} nums
 * @returns
 */
export function genBinaryTree(nums, isParent = false) {
    if (nums === null || nums.length === 0 || nums[0] === null) {
        return null;
    }
    let root = new TreeNode(nums[0]);
    let queue = [root];
    let i = 1;
    while(i < nums.length) {
        const item = nums[i];
        const node = queue[0];
        // console.log('\nitem', item, 'node', node);
        if (node.left === undefined) {
            if (!item) {
                node.left = null;
            }
            else {
                node.left = new TreeNode(item);
                if (isParent) {
                    node.left.parent = node;
                }
                queue.push(node.left);
            }
        }
        else if (node.right === undefined) {
            if (!item) {
                node.right = null;
            }
            else {
                node.right = new TreeNode(item);
                if (isParent) {
                    node.right.parent = node;
                }
                queue.push(node.right);
            }
            queue.shift();
        }
        else {
            queue.shift();
        }
        i++;
    }
    // log('\nroot', root);
    return root;
}
