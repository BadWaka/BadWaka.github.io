
// 完全平方数
const list = [1, 4, 9, 16, 25, 36, 49, 64, 81];

/**
 * @returns
 */
function numSquares(n) {
    console.log('\nn', n);

    if (n === 0) {
        return 0;
    }

    // 先开根号
    const sqrt = Math.sqrt(n);
    console.log('sqrt', sqrt);

    // 向下取整
    const floor = Math.floor(sqrt);

    // 记录最小数量
    let minNum;

    // 遍历
    for (let i = 1; i <= floor; i++) {
        console.log('\ni', i, 'minNum', minNum);

        // 记录本次循环体内的数量
        let curNum;

        // 计算平方
        const i2 = i ** 2;
        console.log('i', i, 'i2', i2);

        // 计算商和余数
        const quotient = n / i2;
        const quotientInt = Math.floor(quotient); // 向下取整
        const remainder = n % i2;
        console.log('quotient', quotient, 'remainder', remainder);

        // 如果余数为 0
        if (remainder === 0) {
            // 本次数量等于商
            curNum = quotient;
            console.log('curNum', curNum);
            if (minNum === undefined) {
                minNum = curNum;
            }
            // 取最小的
            minNum = Math.min(minNum, curNum);
            continue;
        }

        // 递归
        curNum = numSquares(remainder) + quotientInt;
        // 取最小的
        if (minNum === undefined) {
            minNum = curNum;
        }
        minNum = Math.min(minNum, curNum);
        console.log('递归回来 curNum', curNum, 'minNum', minNum);
    }

    return minNum;
}

let params = 12;
params = 13;
params = 19;
params = 7168;
const res = numSquares(params);
console.log('\nres', res);
