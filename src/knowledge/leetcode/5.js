
/**
 * 最长回文子串
 *
 * @returns
 */

// 中心扩展法
function longestPalindrome(s) {
    if (s.length <= 1) {
        return s;
    }
    let max = '';
    for (let i = 0; i < s.length; i++) {

        if (max.length === 0) {
            max = s[i];
        }

        // 首先先找每个字符左右两边的
        let count = 1;
        let str = s[i];
        while(
            s[i - count] !== undefined
            && s[i + count] !== undefined
        ) {
            if (s[i - count] === s[i + count]) {
                // 回文字符串
                str = `${s[i - count]}${str}${s[i + count]}`;
                // console.log('str', str);
                if (str.length > max.length) {
                    max = str;
                }
                count++;
            }
            else {
                break;
            }
        }

        // 然后再找每个字符缝隙左右两边的
        count = 1;
        str = '';
        while(
            s[i + 1 - count] !== undefined
            && s[i + count] !== undefined
        ) {
            if (s[i + 1 - count] === s[i + count]) {
                // 回文字符串
                str = `${s[i + 1 - count]}${str}${s[i + count]}`;
                // console.log('str', str);
                if (str.length > max.length) {
                    max = str;
                }
                count++;
            }
            else {
                break;
            }
        }

    }
    return max;
}

// 回溯
function longestPalindrome2(s) {
    // 如果 s 是回文，直接返回就完了
    if (isPalindrome(s)) {
        return s;
    }

    // 最长回文子串
    let maxP = '';

    // 深度优先遍历
    function dfs(start) {
        if (start > s.length - 1) {
            return;
        }
        for (let i = start + 1; i <= s.length; i++) {
            const str = s.slice(start, i);
            // console.log('str', str);
            // 是否是回文
            if (isPalindrome(str)) {
                if (str.length > maxP.length) {
                    maxP = str;
                }
                dfs(i);
            }
        }
    }

    dfs(0);

    return maxP;
}

// 是否是回文
function isPalindrome(s) {
    return s === s.split('').reverse().join('');
}

let s = 'babac';
s = 'abb';
s = 'a';
s = 'ac';
// s = "cbbc";
const res = longestPalindrome(s);
console.log('\nres', res);
