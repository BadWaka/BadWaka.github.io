
/**
 * 十进制转换为二进制
 */
export function decimalToBinary(n) {
    let binaryString = '';

    while(n > 0) {
        const reminder = n % 2;
        binaryString = reminder + binaryString;
        n = Math.floor(n / 2);
    }

    return binaryString;
}

let n = 9;
const res = decimalToBinary(n);
console.log('res', res);
