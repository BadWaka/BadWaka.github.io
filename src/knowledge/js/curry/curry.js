
function curry(func) {
    console.log('func', func, 'func.length', func.length);
    return function curried(...args) {
        console.log('args', args);
        if (args.length >= func.length) {
            return func.apply(this, args);
        }
        return function(...moreArgs) {
            console.log('moreArgs', moreArgs);
            return curried.apply(this, args.concat(moreArgs));
        };
    }
}

function testFunc(a, b, c) {
    return a + b + c;
}

const curriedFunc = curry(testFunc);

console.log(curriedFunc(1)(2)(3));
console.log(curriedFunc(1)(2, 3));
console.log(curriedFunc(1, 2)(3));
