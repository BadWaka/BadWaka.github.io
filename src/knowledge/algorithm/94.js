
/**
 * @returns
 */
function f(nums) {
    console.log('nums', nums);

    if (!nums || nums.length === 0) {
        return [];
    }

    // 栈
    const stack = [];
    // 结果数组
    const list = [];
    // 通过数组得到二叉树
    let tree = genBinaryTree(nums);
    console.log('tree', tree);

    let curNode = tree;

    // 递归
    // inorder(tree, list);

    // 迭代
    while(curNode || stack.length > 0) {
        // 当前 node 存在的时候
        while(curNode) {
            // 入栈
            stack.push(curNode);
            // 继续走向它的左叶子节点
            curNode = curNode.left;
        }
        // 当 node 不存在的时候
        // 出栈，拿到栈里最高的节点
        curNode = stack.pop();
        if (curNode.value) {
            // 把它的值放入结果列表
            list.push(curNode.value);
        }
        // 因为是中序遍历，遍历完当前值再遍历右叶子节点
        curNode = curNode.right;
    }

    return list;
}

/**
 * 中序遍历，递归
 *
 * @param {*} node
 * @param {*} list
 */
function inorder(node, list) {
    if (!node) {
        return;
    }
    node.left && inorder(node.left, list);
    if (node.value) {
        list.push(node.value);
    }
    node.right && inorder(node.right, list);
}

function TreeNode(val, left, right) {
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
function genBinaryTree(nums) {
    if (!nums || nums.length === 0 || !nums[0]) {
        return null;
    }
    let root = new TreeNode(nums[0]);
    let queue = [root];
    let i = 1;
    while(i < nums.length) {
        const item = nums[i];
        const node = queue[0];
        console.log('\nitem', item, 'node', node);
        if (node.left === undefined) {
            if (!item) {
                node.left = null;
            }
            else {
                node.left = new TreeNode(item);
                queue.push(node.left);
            }
        }
        else if (node.right === undefined) {
            if (!item) {
                node.right = null;
            }
            else {
                node.right = new TreeNode(item);
                queue.push(node.right);
            }
            queue.shift();
        }
        else {
            queue.shift();
        }
        i++;
    }
    log('\nroot', root);
}

let params = [1,null,2,3];
// params = [];
const res = f(params);
console.log('res', res);
