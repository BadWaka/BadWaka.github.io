
/**
 * @returns
 */
function generate(numRows) {
    const fArr = new Array(numRows).fill();
    for (let i = 0; i < numRows; i++) {
        if (i === 0) {
            fArr[i] = [1];
            continue;
        }
        if (!fArr[i]) {
            fArr[i] = [];
        }
        for (let j = 0; j < i + 1; j++) {
            const val = (fArr[i - 1][j - 1] || 0) + (fArr[i - 1][j] || 0);
            fArr[i].push(val);
        }
    }
    return fArr;
}

let numRows = 5;
const res = generate(numRows);
console.log('\nres', res);
