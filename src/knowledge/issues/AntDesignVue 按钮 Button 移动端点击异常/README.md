# AntDesignVue 按钮 Button 移动端点击异常

在设置以下样式后，在移动端 ant-btn 按钮会出现
- Android 和 PC 模拟：点击左半边无法触发点击事件，且闪屏的问题
- iOS 确认按钮消失，点击取消后确认按钮才出现的问题
    - iCafe: https://console.cloud.baidu-int.com/devops/icafe/issue/wkpc-bug-64194/show?source=copy-shortcut
    - cr: https://console.cloud.baidu-int.com/devops/icode/repos/baidu/wenku/flower-web/reviews/112742016/files/base...latest/src/commonStyles/antd.scss

```css
.ant-btn:focus {
    display: contents;
}
```
