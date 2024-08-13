
/**
 * 调用 js 内置方法
 *
 * @param {*} s
 * @returns
 */
function replaceSpace1(s) {
    s = s.replaceAll(/ /g, '%20');
    return s;
}

/**
 * 遍历每个字符
 */
function replaceSpace(s) {
    let arr = [];
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (char === ' ') {
            char = '%20';
        }
        arr.push(char);
    }
    return arr.join('');
}

let params = 'We are happy.';
const res = replaceSpace(params);
console.log('res', res);