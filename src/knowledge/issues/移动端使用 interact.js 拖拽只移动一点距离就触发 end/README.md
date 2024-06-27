# 移动端使用 interact.js 拖拽只移动一点距离就触发 end

需要设置 touch-action: none 这个 css 属性

```
.draggable {
    // 用户在该元素上进行的触摸操作不会触发任何默认的浏览器行为，例如滚动、缩放、双击缩放等
    // 这个属性很重要，不加的话会导致只能拖动一小段距离就触发 end 了
    touch-action: none;
}
```
