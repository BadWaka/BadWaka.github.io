
export function deepClone(obj, hash = new WeakMap()) {
    console.log('typeof obj', typeof obj, 'hash', hash);

    if (obj === null) {
        return null;
    }

    if (hash.has(obj)) {
        console.log('有缓存');
        return hash.get(obj);
    }

    // 基础类型、函数和 Symbol
    if (typeof obj !== 'object') {
        const newObj = obj;
        return obj;
    }

    // 数组
    if (Array.isArray(obj)) {
        console.log('数组');
        const newArray = [];
        hash.set(obj, newArray);
        for (let i = 0; i < obj.length; i++) {
            const newObj = deepClone(obj[i], hash);
            newArray.push(newObj);
        }
        return newArray;
    }

    // 对象
    let newObj = {};
    hash.set(obj, newObj);
    Object.keys(obj).forEach(key => {
        newObj[key] = deepClone(obj[key], hash);
    });
    return newObj;

}

const a = {
    val: 'a',
};
const b = {
    val: 'b',
    a: a
};
a.b = b;
let test = {
    a: a,
    b: b
};
test = [
    a,
    b
];
// test = 1;
// test = function () {
// };
// test = Symbol();
// test = null;
// test = undefined;
console.log('test', test);
const res = deepClone(test);
console.log('res', res);
