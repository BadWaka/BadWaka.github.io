
/**
 * 首先要把十进制转换为二进制
 * 然后
 */
function binary1NumCount(n) {
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

let n = 10;
const res = binary1NumCount(n);
console.log('res', res);
