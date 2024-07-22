
export function deepClone(obj) {
    console.log('typeof obj', typeof obj);

    // 基础类型、函数和 Symbol
    if (typeof obj !== 'object') {
        const newObj = obj;
        return obj;
    }

    // 数组
    if (Array.isArray(obj)) {
        console.log('数组');
        const newArray = [];
        for (let i = 0; i < obj.length; i++) {
            const newObj = deepClone(obj[i]);
            newArray.push(newObj);
        }
        return newArray;
    }

    // 对象

}

let test = {};
// test = [];
// test = 1;
// test = function () {
// };
// test = Symbol();
deepClone(test);
