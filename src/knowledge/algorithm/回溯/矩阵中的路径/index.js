
/**
 * 回溯
 */
function findPath(matrix, str) {
    // 容错
    if (!str || str.length === 0) {
        return false;
    }
    if (!matrix || matrix.length === 0 || !matrix[0] || matrix[0].length === 0) {
        return false;
    }

    // 是否有字符串的标记
    let isHas = false;
    // 这个 map 用来存放已经遍历过的位置，如果一个位置已经遍历过，那就不用再看了
    // key 为 行,列
    const map = {};
    // 首先找到第一个字符
    const char = str[0];
    // 遍历矩阵找入口
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            // 找到入口
            if (matrix[row][col] === char) {
                console.log('row', row, 'col', col, 'matrix[row][col]', matrix[row][col]);
                map[`${row},${col}`] = true;
                let path = matrix[row][col];
                // 调用递归函数
                travel(row, col, path);
            }
        }
    }

    /**
     * 递归函数体
     * @param {*} row 行数
     * @param {*} col 列数
     * @param {*} path 已遍历的路径
     */
    function travel(row, col, path) {
        console.log('travel row', row, 'col', col, 'matrix[row][col]', matrix[row][col], 'path', path);
        // 如果找到了字符串
        if (path === str) {
            isHas = true;
            return true;
        }
        // 下一个字符
        const nextChar = str[path.length];
        console.log('nextChar', nextChar);
        // 往上下左右四个方向找
        function directionFind(row, col, path) {
            if (matrix[row] && matrix[row][col] && !map[`${row},${col}`] && matrix[row][col] === nextChar) {
                map[`${row},${col}`] = true;
                const newPath = path + matrix[row][col];
                travel(row, col, newPath);
                map[`${row},${col}`] = false;
            }
        }
        // 上
        directionFind(row - 1, col, path);
        // if (matrix[row - 1] && matrix[row - 1][col] && !map[`${row - 1},${col}`] && matrix[row - 1][col] === nextChar) {
        //     map[`${row - 1},${col}`] = true;
        //     path += matrix[row - 1][col];
        //     travel(row - 1, col, path);
        //     path = path.substring(0, path.length - 1);
        //     map[`${row - 1},${col}`] = false;
        // }
        // 下
        directionFind(row + 1, col, path);
        // if (matrix[row + 1] && matrix[row + 1][col] && !map[`${row + 1},${col}`] && matrix[row + 1][col] === nextChar) {
        //     map[`${row + 1},${col}`] = true;
        //     path += matrix[row + 1][col];
        //     travel(row + 1, col, path);
        //     path = path.substring(0, path.length - 1);
        //     map[`${row + 1},${col}`] = false;
        // }
        // 左
        directionFind(row, col - 1, path);
        // if (matrix[row][col - 1] && !map[`${row},${col - 1}`] && matrix[row][col - 1] === nextChar) {
        //     map[`${row},${col - 1}`] = true;
        //     path += matrix[row][col - 1];
        //     travel(row, col - 1, path);
        //     path = path.substring(0, path.length - 1);
        //     map[`${row},${col - 1}`] = false;
        // }
        // 右
        directionFind(row, col + 1, path);
        // if (matrix[row][col + 1] && !map[`${row},${col + 1}`] && matrix[row][col + 1] === nextChar) {
        //     map[`${row},${col + 1}`] = true;
        //     path += matrix[row][col + 1];
        //     travel(row, col + 1, path);
        //     path = path.substring(0, path.length - 1);
        //     map[`${row},${col + 1}`] = false;
        // }
    }

    return isHas;
}

let matrix = [
    ['a', 'b', 't', 'g'],
    ['c', 'f', 'c', 's'],
    ['j', 'd', 'e', 'h']
];
let path = 'bfce';
const res = findPath(matrix, path);
console.log('res', res);