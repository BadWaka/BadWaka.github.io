
/**
 * 思路：
 * 首先需要两个变量定义当前行数 row 列数 col
 * 需要记录当前方向 上下左右 direction
 * 需要一个 map 记录已访问过的 node
 */
function clockwisePrintMatirx(matrix) {
    console.log('matrix', matrix);
    if (!matrix || !matrix[0]) {
        return [];
    }
    const rowNum = matrix.length;
    const colNum = matrix[0].length;
    console.log('rowNum', rowNum, 'colNum', colNum);

    let row = 0;
    let col = 0;
    let direction = 'right';
    const map = {};
    const arr = [];

    function findNext() {
        console.log('findNext', 'row', row, 'col', col, 'matrix', matrix[row][col], 'direction', direction);
        if (direction === 'right') {
            if (
                // 存在
                matrix[row][col + 1]
                // 且 map 里没有
                && !map[`${row},${col + 1}`]
            ) {
                col++;
            }
            else {
                // 向下找
                direction = 'down';
                findNext();
            }
        }
        else if (direction === 'down') {
            if (
                // 存在
                matrix[row + 1]
                && matrix[row + 1][col]
                // 且 map 里没有
                && !map[`${row + 1},${col}`]
            ) {
                row++;
            }
            else {
                // 向左找
                direction = 'left';
                findNext();
            }
        }
        else if (direction === 'left') {
            if (
                // 存在
                matrix[row][col - 1]
                // 且 map 里没有
                && !map[`${row},${col - 1}`]
            ) {
                col--;
            }
            else {
                // 向上找
                direction = 'up';
                findNext();
            }
        }
        else if (direction === 'up') {
            if (
                // 存在
                matrix[row - 1]
                && matrix[row - 1][col]
                // 且 map 里没有
                && !map[`${row - 1},${col}`]
            ) {
                row--;
            }
            else {
                // 向右找
                direction = 'right';
                findNext();
            }
        }
    }

    while(arr.length < rowNum * colNum) {
        arr.push(matrix[row][col]);
        map[`${row},${col}`] = true;
        if (arr.length < rowNum * colNum) {
            findNext();
        }
    }
    return arr;
}

let matrix = [
    [1,  2, 3, 4],
    [5,  6, 7, 8],
    [9, 10,11,12],
    [13,14,15,16]
];

const res = clockwisePrintMatirx(matrix);
console.log('res', res);
