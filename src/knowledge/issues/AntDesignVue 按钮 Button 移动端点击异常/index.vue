
<template>
    <div>
        AntDesignVue 按钮 Button 移动端点击异常
        <div class="flex">
            <div class="left">
                left
            </div>
            <div class="right">
                <Button style="margin-right: 20px;" type="primary">按钮1</Button>
                <Button type="primary" @click="showConfirm">出弹窗</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button, Modal } from 'ant-design-vue';

const showConfirm = () => {
    Modal.confirm({
        content: 'text'
    });
};
</script>

<style scoped lang="scss">

// 导致问题的样式代码
// .ant-btn:focus {
//     // 禁止tab选中
//     /* autoprefixer: ignore next */
//     display: contents;
// }

// 修复代码
/* 仅在支持 hover 的设备上应用，也就是 PC */
// @media (hover: hover) and (pointer: fine) {
//     .ant-btn:focus {
//         // 禁止tab选中
//         /* autoprefixer: ignore next */
//         display: contents;
//     }
// }

.flex {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    -webkit-box-pack: justify;
    z-index: 9;
}
.left,
.right {
    display: flex;
    align-items: center;
    -webkit-box-align: center;
}
</style>
