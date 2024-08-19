
/**
 * 首先要把十进制转换为二进制字符串
 * 然后再遍历字符串比较是否等于 '1'
 */
function binary1NumCount1(n) {
    let binaryString = '';

    while(n > 0) {
        const reminder = n % 2;
        binaryString = reminder + binaryString;
        n = Math.floor(n / 2);
    }

    console.log('binaryString', binaryString);

    let count = 0;
    for (let i = 0; i < binaryString.length; i++) {
        if (binaryString[i] === '1') {
            count++;
        }
    }
    return count;
}

/**
 * 位运算
 * @param {*} n
 */
function binary1NumCount(n) {
    // console.log('', n & 1);

    // 整数向右移位
    // let count = 0;
    // while(n) {
    //     if (n & 1 === 1) {
    //         count++;
    //     }
    //     n = n >> 1;
    // }
    // return count;

    // 标志位向左移位
    let count = 0;
    let flag = 1;
    while(flag) {
        console.log('flag', flag);
        if (n & flag) {
            count++;
        }
        flag = flag << 1;
    }
    console.log('flag', flag);
    return count;
}

let n = 10;
const res = binary1NumCount(n);
console.log('res', res);
