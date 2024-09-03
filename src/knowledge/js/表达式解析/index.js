
/**
 * 请实现一个函数，输入一个字符串表达式，包含数字、加减乘除符合括号，计算表达式的值
 */

function getRes(str) {
    console.log('getRes str', str);
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
    // 括号开始索引
    let bracketStartIndex = -1;
    // 括号结束索引
    let bracketEndIndex = -1;
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
        // console.log('char', char);

        // 起始括号
        if (char === '(') {
            // 放入括号栈
            bracketStack.push(i);
            continue;
        }

        // 终止括号
        if (char === ')') {
            // 出栈
            const bracketStartIndex = bracketStack.pop();
            // console.log('bracketStartIndex', bracketStartIndex, 'bracketStack', bracketStack);
            // 如果栈里面没东西了，认为匹配括号成功
            if (bracketStack.length === 0) {
                const bracketEndIndex = i;
                // 截取两个括号中间的字符串
                const s = str.slice(bracketStartIndex + 1, bracketEndIndex);
                // console.log('s', s);
                if (s && s.length > 0) {
                    // 扔进去递归
                    preChar = getRes(s);
                }
            }
            // 如果还有东西，那就继续遍历，知道找到下一个 )
            else {
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
            tokenList.push(parseInt(preChar, 10));
            tokenList.push(char);
            preChar = '';
        }
    }
    if (preChar) {
        tokenList.push(parseInt(preChar, 10));
    }

    console.log('tokenList', tokenList);

    /**
     * 表达式计算
     */

    // 栈；用来存数字和运算符
    const stack = [];
    // 用来记录栈里有几个乘几个除
    const map = {
        '*': 0,
        '/': 0
    };
    // 遍历 tokenList
    for (let i = 0; i < tokenList.length; i++) {
        const token = tokenList[i];
        // 如果是数字，直接放栈里
        if (typeof token === 'number') {
            stack.push(token);
            continue;
        }
        // 如果是字符串
        // 如果是 + 或者 -
        if (token === '+' || token === '-') {
            // 判断栈里是否有乘除运算
            // 只要遇到操作符（不管是加、减、乘、除），就应该检查栈里是否有未处理的乘除运算
            if (map['*'] > 0 || map['/'] > 0) {
                console.log('栈里有乘除运算');

                // 优先计算栈里的乘除法
                let b = null;
                while (map['*'] > 0 || map['/'] > 0) {
                    if (!b) {
                        b = stack.pop();
                    }
                    // 操作符
                    const operator = stack.pop();
                    map[operator]--;
                    // 前面的数
                    const a = stack.pop();
                    b = calculate(a, operator, b);
                    console.log('b', b);
                }
                stack.push(b);

            }
            stack.push(token);
        }
        // 如果是乘除，直接压入栈
        else if (token === '*' || token === '/') {
            stack.push(token);
            map[token]++;
        }
    }
    console.log('stack', stack);

    // 后面的数
    let b = null;
    while (stack.length > 0) {
        if (!b) {
            b = stack.pop();
        }
        // 操作符
        const operator = stack.pop();
        // 前面的数
        const a = stack.pop();
        b = calculate(a, operator, b);
        console.log('b', b);
    }
    return b;

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
// 错误原因：只要遇到操作符（不管是加、减、乘、除），就应该检查栈里是否有未处理的乘除运算。
// 这是因为乘除法比加减法具有更高的优先级，并且乘除法的计算应该在遇到下一个操作符时立即处理
str = '6 / 2 * 4';
const res = getRes(str);
console.log('res', res);
