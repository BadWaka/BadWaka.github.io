
function curry(func) {
    return function curried(...args) {
        // 判断当前参数是否 >= 函数参数
        if (args.length >= func.length) {
            // 调用方法
            return func.apply(this, args);
        }
        // 返回一个函数，继续接收参数
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    }
}

// function curry(func) {
//     return function curried(...args) {
//         // 判断当前参数长度是否 >= 函数的参数长度
//         if (args.length >= func.length) {
//             return func(...args);
//         }
//         // 返回一个函数，继续接收参数
//         return function(...moreArgs) {
//             return curried(...args.concat(moreArgs));
//         };
//     };
// }

// 测试
function testFunc(a, b, c) {
    return a + b + c;
}

const curriedFunc = curry(testFunc);

console.log(curriedFunc(1)(2)(3));
console.log(curriedFunc(1)(2, 3));
console.log(curriedFunc(1, 2)(3));


