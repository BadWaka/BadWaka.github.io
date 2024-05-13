
/**
 * @returns
 */
function f(s) {
    console.log('s', s);
    let str = s;
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        const cur = str[i];
        // console.log('\ncur', cur, 'i', i);
        if (cur === '[') {
            stack.push({
                index: i,
                val: cur
            });
        }
        else if (cur === ']') {
            const l = stack.pop();
            // 字段值
            const val = str.substring(l.index + 1, i);
            console.log('\nval', val);
            // 倍数，倍数可以不只一位数字
            let k = 1;
            let multiple = '';
            // 当 str[l.index - k] 存在，且转换成数字后不是 NaN
            while(str[l.index - k] && !isNaN(+str[l.index - k])) {
                console.log('str[l.index - k]', str[l.index - k]);
                multiple = str[l.index - k] + '' + multiple;
                k++;
            }
            console.log('multiple', multiple, 'k', k);
            // 乘以倍数的字段值
            let valMultiple = '';
            for (let j = 0; j < multiple; j++) {
                valMultiple += val;
            }
            console.log('valMultiple', valMultiple);
            const oldStr = str.substring(l.index - k + 1, i + 1);
            console.log('oldStr', oldStr);
            // 偏移，如果替换字符串的时候，新的字符串长了或者短了，i 需要重新移位
            const offset = valMultiple.length - oldStr.length;
            console.log('offset', offset);
            str = str.substring(0, l.index - k + 1) + '' + valMultiple + str.substring(i + 1);
            i += offset;
            console.log('str', str);
        }
        // console.log('cur', cur);
    }
    return str;
}

let params = '3[a2[c]]';
// params = '3[a]2[bc]';
// params = '100[leetcode]';
const res = f(params);
console.log('res', res);
