
## 难点：循环引用

使用 WeakMap 缓存已复制的对象

## 题目

有这样一个对象

```js
const a = {
    val: 'a',
    next: b
};
const b = {
    val: 'b',
    next: a
};
const obj = {
    a: a,
    b: b
};
```

请深复制 obj 对象
