# 上下布局 上方动态高度 下方固定高度

通过 flex 实现，重点是上方需要设置 flex-grow: 1、flex-shrink: 1 和 overflow: hidden

```
<style>
    /* 容器样式 */
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh; /* 设置容器高度为视口高度 */
        border: 1px solid #000;
    }

    /* 上面模块样式 */
    .top {
        flex-grow: 1; /* 使上面模块填充剩余空间 */
        flex-shrink: 1; /* 允许上面模块压缩 */
        overflow: hidden; /* 隐藏溢出内容 */
        background-color: #f0f0f0;
    }

    /* 下面模块样式 */
    .bottom {
        height: 100px; /* 下面模块固定高度 */
        background-color: #ccc;
    }
</style>
```
