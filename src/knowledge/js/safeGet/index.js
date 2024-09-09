
function safeGet(obj) {
    // 返回一个新的代理对象
    // 第一个参数是对象
    // 第二个参数是 handle

    const handler = {
        // 拿属性的操作
        // 第一个参数是对象
        // 第二个参数是属性名
        get(obj, prop) {
            console.log('get obj', obj, 'prop', prop, prop in obj);
            // 判断属性是否在对象上
            if (prop in obj) {
                // 如果是对象
                if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                    // 递归的调用自身
                    return safeGet(obj[prop]);
                }
                return (value) => {
                    return value || obj[prop];
                };
            }
            // 如果不存在
            /**
             * 解释：
                new Proxy(() => undefined, handler)：这行代码创建了一个新的代理对象。这个代理的目标是一个箭头函数 () => undefined，该函数的作用是返回 undefined。

                目的：当你尝试访问一个在原始对象上不存在的属性时，这行代码确保不会直接返回 undefined（因为如果你对 undefined 继续访问属性，会导致 TypeError）。相反，它返回一个新的代理，这个代理同样具备安全访问属性的能力。

                重用处理器（Handler）：这个新的代理使用了相同的 handler。这意味着在这个函数代理上访问任何属性时，会再次检查该属性是否存在，如果不存在，则会返回另一个代理。这实现了无限制的安全属性访问链。

                通过使用以函数为目标的代理，确保即使调用一个方法（例如 x.i.q.w.f.q.s.g()），它实际上返回的是 undefined（通过函数返回），而不会导致错误。这种设计允许对深层嵌套或不存在的属性进行安全访问，而不会意外地引发运行时错误。
             */
            return new Proxy(() => undefined, handler);
        }
    };

    return new Proxy(obj, handler);
}

function safeGet1(obj) {
    const handler = {
        get(target, prop) {
            if (prop in target) {
                const value = target[prop];
                if (typeof value === 'object' && value !== null) {
                    return new Proxy(value, handler);
                } else if (typeof value === 'function') {
                    return value.bind(target);
                } else {
                    return () => value;
                }
            } else {
                // Return a proxy that always returns a function returning undefined for non-existent properties
                return new Proxy(() => undefined, handler);
            }
        }
    };

    return new Proxy(obj, handler);
}

const obj = {
    a: 2,
    b: 'hello',
    c: [100, -100, 8],
    d: { e: 'wtf' }
};

const x = safeGet(obj);
console.log(x);
console.log(x.a());
console.log(x.b('demacia'));
console.log(x.c[0]());
console.log(x.c[100]());
console.log(x.d.e());
console.log(x.i.q.w.f.q.s.g());
