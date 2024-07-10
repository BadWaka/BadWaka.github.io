# iOS iPhoneX 以上设备底部安全区的间距问题 safe-area-inset-bottom

```css
    // 解决 iOS iPhoneX 以上设备底部安全区的间距问题
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容早期 iOS Safari */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容现代浏览器 */
```
