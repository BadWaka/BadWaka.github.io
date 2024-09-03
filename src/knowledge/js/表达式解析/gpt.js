
/**
 * 请实现一个函数，输入一个字符串表达式，包含数字、加减乘除符合括号，计算表达式的值
 */

function getRes(str) {
    if (!str) {
        return null;
    }

    /**
     * 词法分析
     */

    // 词法分析后的 token list
    let tokenList = [];
    // 前一个字符，用来拼数字
    let preChar = '';
    // 括号栈
    const bracketStack = [];
    // 符号 map
    const symbolMap = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        // 起始括号
        if (char === '(') {
            if (bracketStack.length === 0 && preChar) {
                tokenList.push(parseInt(preChar, 10));
                preChar = '';
            }
            // 放入括号栈
            bracketStack.push(i);
            continue;
        }

        // 终止括号
        if (char === ')') {
            // 出栈
            const bracketStartIndex = bracketStack.pop();
            // 如果栈里面没东西了，认为匹配括号成功
            if (bracketStack.length === 0) {
                const bracketEndIndex = i;
                // 截取两个括号中间的字符串
                const s = str.slice(bracketStartIndex + 1, bracketEndIndex);
                if (s && s.length > 0) {
                    // 扔进去递归
                    preChar = getRes(s);
                }
            }
            continue;
        }

        // 如果是 0-9 的数字
        if (isDigit(char) && bracketStack.length === 0) {
            preChar += char;
            continue;
        }

        // 是符号
        if (symbolMap[char] > 0 && bracketStack.length === 0) {
            if (preChar !== '') {
                tokenList.push(parseInt(preChar, 10));
                preChar = '';
            }
            tokenList.push(char);
        }
    }
    if (preChar) {
        tokenList.push(parseInt(preChar, 10));
    }

    /**
     * 表达式计算
     */

    // 栈；用来存数字和运算符
    const stack = [];
    for (let i = 0; i < tokenList.length; i++) {
        const token = tokenList[i];
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            while (stack.length >= 2 && ['*', '/'].includes(stack[stack.length - 2])) {
                const b = stack.pop();
                const operator = stack.pop();
                const a = stack.pop();
                stack.push(calculate(a, operator, b));
            }
            stack.push(token);
        }
    }

    while (stack.length >= 2) {
        const b = stack.pop();
        const operator = stack.pop();
        const a = stack.pop();
        stack.push(calculate(a, operator, b));
    }

    return stack[0];
}

/**
 * 判断字符是否是数字
 */
function isDigit(char) {
    return /^[0-9]$/.test(char);
}

/**
 * 计算
 */
function calculate(a, operator, b) {
    if (operator === '+') {
        return a + b;
    }
    else if (operator === '-') {
        return a - b;
    }
    else if (operator === '*') {
        return a * b;
    }
    else if (operator === '/') {
        return a / b;
    }
}

let str = '11 + 2 - 3 * 4 + 6 / 2 * 4 + (8 / 2) * (23 - (8 + 4)) + 10 / 5';
// str = '11 + 3 - 7';
// str = '10 * 2 / 4';
// str = '10 + 3 * 4 / 2 - 8';
str = '6 / 2 * 4';
const res = getRes(str);
console.log('res', res);
