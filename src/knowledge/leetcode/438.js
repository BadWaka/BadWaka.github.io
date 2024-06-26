
/**
 * @returns
 */
function f(s, p) {
    let result = [];
    let sLen = s.length;
    let pLen = p.length;
    if (sLen < pLen) {
        return [];
    }

    let pCount = new Array(26).fill(0);
    let sCount = new Array(26).fill(0);

    for (let i = 0; i < pLen; i++) {
        const char = p[i];
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        pCount[index]++;
    }
    console.log(pCount);

    for (let i = 0; i < pLen; i++) {
        const char = s[i];
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        sCount[index]++;
    }
    console.log(sCount);

    if (sCount.toString() === pCount.toString()) {
        result.push(0);
    }

    for (let i = pLen; i < sLen; i++) {
        const index = s[i].charCodeAt(0) - 'a'.charCodeAt(0);
        sCount[index]++;
        // 当我们将滑动窗口向右移动一个位置时，窗口的左边界位置上的字符会从窗口中移出，因此需要在字符频率计数器中将该字符的计数减 1。
        // 这个操作确保 sCount 数组始终准确地反映滑动窗口内字符的频率。
        const index2 = s[i - pLen].charCodeAt(0) - 'a'.charCodeAt(0);
        sCount[index2]--;

        if (sCount.toString() === pCount.toString()) {
            result.push(i - pLen + 1);
        }
    }
    console.log(sCount);

    return result;
}

function f2(s, p) {
    let finalArr = [];
    if (s.length < p.length) {
        return [];
    }

    const pMap = {};
    for (let char of p) {
        pMap[char] = (pMap[char] || 0) + 1;
    }
    console.log('pMap', pMap);

    for (let i = 0; i <= s.length - p.length; i++) {
        let str = s.slice(i, i + p.length);
        const res = isYiweici(str, pMap);
        console.log('res', res);
        if (res) {
            finalArr.push(i);
        }
    }
    return finalArr;
}

function isYiweici(str, pMap) {
    console.log('str', str);
    let map = {};
    for (let char of str) {
        map[char] = (map[char] || 0) + 1;
    }

    let isTrue = true;
    Object.keys(pMap).forEach(key => {
        if (pMap[key] !== map[key]) {
            isTrue = false;
        }
    });
    return isTrue;
}

function isYiweici2(str, p) {
    // 临时字符串
    let temp = p;
    console.log('str', str);
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const index = temp.indexOf(char);
        if (index === -1) {
            return false;
        }
        temp = temp.slice(0, index) + temp.slice(index + 1);
    }
    return true;
}

let s = 'cbaebabacd';
// s = 'abab';
let p = 'abc';
// p = 'ab';
const res = f(s, p);
console.log('\nres', res);
