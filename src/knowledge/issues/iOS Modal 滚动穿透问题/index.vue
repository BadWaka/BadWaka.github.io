
<template>
    <div>
        iOS Modal 滚动穿透问题
        <div>
            <div @touchmove.prevent></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button, Modal } from 'ant-design-vue';

let startY = null;
const handleTouchStart = e => {
    startY = e.touches[0].clientY;
};
const handleTouchMove = e => {
    // 0 代表该没有滚动区域；1 代表有滚动区域且滚动到了最上面；2 代表滚动到底部了且滚动到了最下面；3 代表滚动在滚动区域
    let status = 3;
    let direction = null;
    const el = textarea.value;
    const currentY = e.touches[0].clientY;
    if (el.scrollTop === 0) {
        // 如果内容小于容器则同时禁止上下滚动
        status = el.offsetHeight >= el.scrollHeight
            ? 0
            : 1;
    }
    else if (el.scrollTop + el.offsetHeight + 1 >= el.scrollHeight) {
        // 已经滚到底部了只能向上滚动
        status = 2;
    }
    if (status !== 3) {
        // 判断当前的滚动方向；10 为向上；01 为向下
        direction = currentY - startY > 0
            ? 1
            : 2;
        // 没有滚动区域
        if (status === 0) {
            e.cancelable && e.preventDefault();
        }
        // 已经滑到最上了还滑
        else if (status === 1 && direction === 1) {
            e.cancelable && e.preventDefault();
        }
        // 已经滑到最下了还滑
        else if (status === 2 && direction === 2) {
            e.cancelable && e.preventDefault();
        }
    }
};
</script>

<style scoped lang="scss">
</style>
