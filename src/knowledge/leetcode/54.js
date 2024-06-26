
/**
 * @returns
 */
function f(matrix) {
    if (!matrix || !matrix[0]) {
        return [];
    }
    const m = matrix[0].length;
    const n = matrix.length;

    const map = {};
    const arr = [];
    let curN = 0; // 当前行数
    let curM = 0; // 当前列数
    let direction = 'right'; // 方向
    let cur = matrix[curN][curM]; // 当前值
    arr.push(cur);
    map[`${curN},${curM}`] = true;

    function right() {
        if (
            matrix[curN] !== undefined
            && matrix[curN][curM + 1] !== undefined
            && !map[`${curN},${curM + 1}`]
        ) {
            curM = curM + 1;
            cur = matrix[curN][curM];
            arr.push(cur);
            map[`${curN},${curM}`] = true;
            direction = 'right';
            return true;
        }
    }

    function bottom() {
        if (
            matrix[curN + 1] !== undefined
            && matrix[curN + 1][curM] !== undefined
            && !map[`${curN + 1},${curM}`]
        ) {
            curN = curN + 1;
            cur = matrix[curN][curM];
            arr.push(cur);
            map[`${curN},${curM}`] = true;
            direction = 'down';
            return true;
        }
    }

    function left() {
        if (
            matrix[curN] !== undefined
            && matrix[curN][curM - 1] !== undefined
            && !map[`${curN},${curM - 1}`]
        ) {
            curM = curM - 1;
            cur = matrix[curN][curM];
            arr.push(cur);
            map[`${curN},${curM}`] = true;
            direction = 'left';
            return true;
        }
    }

    function top() {
        if (
            matrix[curN - 1] !== undefined
            && matrix[curN - 1][curM] !== undefined
            && !map[`${curN - 1},${curM}`]
        ) {
            curN = curN - 1;
            cur = matrix[curN][curM];
            arr.push(cur);
            map[`${curN},${curM}`] = true;
            direction = 'top';
            return true;
        }
    }

    function find() {
        if (direction === 'top') {
            // 往上找
            if (top()) {
            }
            // 往右找
            else if (right()) {
            }
            // 往下找
            else if (bottom()) {
            }
            // 往左找
            else if (left()) {
            }
            else {
                cur = undefined;
            }
            return;
        }
        // 往右找
        if (right()) {
        }
        // 往下找
        else if (bottom()) {
        }
        // 往左找
        else if (left()) {
        }
        // 往上找
        else if (top()) {
        }
        else {
            cur = undefined;
        }
    }

    while(cur !== undefined) {
        find();
    }

    console.log('\nmap', map);

    return arr;
}

let matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
// matrix = [
//     [2,5],
//     [8,4],
//     [0,-1]
// ];
matrix = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
];
const res = f(matrix);
console.log('\nres', res);
