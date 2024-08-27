
/**
 * 思路：
 * 遍历字符串，把每个字符放进 path 数组里，剩下的字符串拼起来继续递归
 * 如果 path 的长度等于字符串的长度，终止递归
 * 每次 dfs 完要 path.pop()，这是回溯的关键
 *
 * 如果有重复字母，需要用到 hashMap，以便在 O1 时间判断是否有已经相同的值
 */
function fullPermutation(str) {

    // 避免与 dfs 的形参重名
    let fStr = str;
    // 如果有重复的，就用 map 存一下
    let map = {};
    let arr = [];

    function dfs(str, path) {
        if (path.length === fStr.length) {
            arr.push(path.join(''));
            return;
        }

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const restStr = str.slice(0, i) + '' + str.slice(i + 1);
            console.log('char', char, 'restStr', restStr);
            path.push(char);
            dfs(restStr, path);
            // 回溯
            path.pop();
        }
    }

    dfs(str, []);

    return arr;
}

let str = 'abcd';

const res = fullPermutation(str);
console.log('res', res);
