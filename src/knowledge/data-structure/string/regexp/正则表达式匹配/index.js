
/**
 *
 */
function isMatch(str, regExp) {
    // 双指针，一个指向字符串，一个指向正则
    let pS = 0;
    let pR = 0;
    while(pS < str.length && pR < regExp.length) {
        const charR = regExp[pR];
        // console.log('charR', charR);
        // 如果不是 .
        if (charR !== '.') {
            // 判断后一位是不是 *
            const nextCharR = regExp[pR + 1];
            // 如果后一位是 *
            if (nextCharR === '*') {
                // 判断当前字符串字符是否与正则字符相等
                // 直到找到下一个不相等的字符串字符
                while(str[pS] === charR) {
                    // 字符串指针后移一位
                    pS++;
                }
                // 正则要 +2，因为下一位是 *，再下一位才能找到下一个有意义的正则符号
                pR += 2;
                continue;
            }
            // 后一位不是 *
            // 直接判断是否与字符串相等
            const charS = str[pS];
            // 如果相等，双指针都++，继续循环
            if (charS === charR) {
                pS++;
                pR++;
                continue;
            }
            // 如果不相等，直接 return false
            return false;
        }
        // 如果是 .
        // 直接双指针++然后继续就行
        pS++;
        pR++;
    }
    console.log('pS', pS, 'pR', pR);
    // 双指针都移动到了最后的位置，就代表匹配成功
    if (pS === str.length && pR === regExp.length) {
        return true;
    }
    return false;
}

let str = 'aaa';
let regExp = 'a.a';
// regExp = 'ab*ac*a';
regExp = 'ab*a';
const res = isMatch(str, regExp);
console.log('res', res);