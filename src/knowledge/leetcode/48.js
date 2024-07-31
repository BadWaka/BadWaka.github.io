
/**
 * @returns
 */
function rotate(matrix) {
    const n = matrix.length;
    // map 里面存的就是原始位置的数，key 是 rowIndex,colIndex
    const map = {};
    matrix.forEach((row, rowIndex) => {
        row.forEach((item, colIndex) => {
            console.log('rowIndex', rowIndex, 'colIndex', colIndex, 'item', item);
            const key = `${rowIndex},${colIndex}`;
            const targetKey = `${colIndex},${n - 1 - rowIndex}`;
            // 当前位置和目标位置里没有的都存 map 里
            // 当前位置
            if (map[key] === undefined) {
                map[key] = item;
            }
            // 目标位置
            if (map[targetKey] === undefined) {
                map[targetKey] = matrix[colIndex][n - 1 - rowIndex];
            }
            matrix[colIndex][n - 1 - rowIndex] = map[key];
        });
    });
    return matrix;
}

let matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
const resS = [
    [7,4,1],
    [8,5,2],
    [9,6,3]
];
// matrix = [
//     [5,1,9,11],
//     [2,4,8,10],
//     [13,3,6,7],
//     [15,14,12,16]
// ];
const res = rotate(matrix);
console.log('\nres', res);
