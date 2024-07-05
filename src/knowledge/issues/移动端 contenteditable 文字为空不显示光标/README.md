# 移动端 contenteditable 文字为空不显示光标

```css
[contenteditable]:empty:focus:before {
    content: '';
}
```

<!-- 这个 css 属性对 iOS 较大的 dom 有效果，但是 Android 和 iOS 较小的都没有效果 -->
这个 css 属性没卵用

设置 min-width: 1px 就行了
