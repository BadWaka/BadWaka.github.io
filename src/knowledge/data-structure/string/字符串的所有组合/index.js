
/**
 * 思路：暴力方法
 * 把字符串拆成每个字符
 * 按字符数开始组合
 * 1个、2个、3个 直到小于字符串长度
 */

/**
 * 思路：
 * 遍历字符串
 * 把当前字符和上一次传进来的合并，并把右边剩下的字符串扔进去递归
 */
function fullCombinations(str) {
    let arr = [];

    function dfs(cur, restStr) {
        console.log('dfs cur', cur, 'restStr', restStr);
        if (cur) {
            arr.push(cur);
        }
        if (!restStr) {
            return;
        }
        for (let i = 0; i < restStr.length; i++) {
            console.log('restStr[i]', restStr[i]);
            dfs(cur + '' + restStr[i], restStr.slice(i + 1));
        }
    }

    dfs('', str);
    return arr;
}

function fullCombinations1(str) {
    const result = [];
    function generateCombinations(current, remaining) {
      result.push(current);
      for (let i = 0; i < remaining.length; i++) {
        generateCombinations(current + remaining[i], remaining.slice(i + 1));
      }
    }
    generateCombinations('', str);
    return result;
  }

let str = 'abc';

const res = fullCombinations(str);
console.log('res', res);
