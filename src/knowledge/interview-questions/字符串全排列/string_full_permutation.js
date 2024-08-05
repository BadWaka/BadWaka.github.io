
/**
 * 字符串全排列
 *
 * @param {*} str
 * @returns
 */
function fullPer(str) {
    if (str.length === 1) {
        return [str];
    }
    if (str.length === 2) {
        const left = str[0] + str[str.length - 1];
        const right = str[str.length - 1] + str[0];
        return [left, right];
    }
    const list = [];
    for (let i = 0; i < str.length; i++) {
        const left = str[i];
        const right = deleteChar(str, i);
        const rightList = fullPer(right);
        console.log('i', i, 'left', left, 'right', right, 'rightList', rightList);
        for (let j = 0; j < rightList.length; j++) {
            list.push(`${left}${rightList[j]}`);
        }
    }
    return list;
}

/**
 * 删除字符串的字符，根据索引
 *
 * @param {*} str
 * @param {*} index
 * @returns
 */
function deleteChar(str, index) {
    return str.slice(0, index) + str.slice(index + 1);
}

let str = 'a';
str = 'ab';
str = 'abc';
str = 'abcd';
const res = fullPer(str);
console.log('res', res);
