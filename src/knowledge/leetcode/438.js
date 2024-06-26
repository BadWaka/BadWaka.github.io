
/**
 * @returns
 */
function f(s, p) {
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
