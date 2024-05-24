
/**
 * @returns
 */
function f(str) {
    console.log('str', str);
    const stack = [];
    const prefix = {
        '(': 1,
        '[': 2,
        '{': 3
    };
    const suffix = {
        ')': 1,
        ']': 2,
        '}': 3
    };
    for (let i = 0; i < str.length; i++) {
        const cur = str[i];
        if (prefix[cur]) {
            stack.push(cur);
        }
        else if (suffix[cur]) {
            const pre = stack.pop();
            console.log('pre', pre, 'cur', cur);
            if (prefix[pre] !== suffix[cur]) {
                return false;
            }
        }
    }
    if (stack.length > 0) {
        return false;
    }
    return true;
}

let params = "()[]{}";
params = '[';
const res = f(params);
console.log('res', res);
