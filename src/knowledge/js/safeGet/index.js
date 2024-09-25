
function safeGet(obj) {
    const handler = {
        // 拿属性的操作
        get(obj, prop) {
            // 判断属性是否在对象上
            if (prop in obj) {
                // 如果是对象
                if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                    // 递归的调用自身
                    return safeGet(obj[prop]);
                }
                // 返回一个方法
                return (value) => {
                    return value || obj[prop];
                };
            }
            // 如果不存在
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
