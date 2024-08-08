
/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 2
输出：["(())", "()()"]

输入：n = 1
输出：["()"]

 * @returns
 */

function generateParenthesis(n) {

}

function generateParenthesis2(n) {
    if (n < 1) {
        return [];
    }
    if (n === 1) {
        return ['()'];
    }
    const res = generateParenthesis(n - 1);
    // console.log('n', n, 'res', res);
    const map = {};
    res && res.forEach(item => {
        // 这里需要遍历每个 (，在右侧加上一个 ()
        map[`(${item})`] = true;
        map[item + '()'] = true;
        map['()' + item] = true;
    });
    const arr = Object.keys(map);
    // console.log('arr', arr);
    return arr;
}

let n = 3;
const res = generateParenthesis(n);
console.log('\nres', res);
