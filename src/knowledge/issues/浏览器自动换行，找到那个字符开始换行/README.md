# 浏览器自动换行，找到那个字符开始换行

把 DOM 中的文案都用 span 包裹，再通过 getBoundingClientRect 方法计算位置

```js
/**
 * 计算换行字符
 */
const calcWrapChar = () => {
    console.log('calcWrapChar textDom.value', textDom.value);
    let text = textDom.value.innerText;
    console.log('text', text);

    // 因为要拼 span 标签，所以必须使用 innerHTML；但是会导致样式没了
    let newHTML = '';
    // 将每个字符包裹在 <span> 标签中
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        newHTML += `<span>${char}</span>`;
    }
    textDom.value.innerHTML = newHTML;
    const children = textDom.value.children;
    for (let i = 0; i < children.length; i++) {
        const span = children[i];
        const rect = span.getBoundingClientRect();
        console.log('char', text[i], 'rect.y', rect.y);
    }
    textDom.value.innerHTML = text;

};
```

如果正在输入，这样会导致光标位置发生重置，导致光标位置错乱问题

解决方案是在 blur 的时候执行，而不是正在输入的时候执行
