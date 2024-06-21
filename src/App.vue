
<template>
    <div
        class="container"
    >
        <Tabs/>
        <List/>

        <div>
            测试面板
            <!-- <div class="hover-test">
                <div class="hover-item">
                    hover 时才出现
                </div>
            </div> -->
            <AndroidIframeDownload/>
            <!-- <AntDesignVueButton/> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

import Tabs from '@/components/Tabs.vue';
import List from '@/pages/list/List.vue';
import AndroidIframeDownload from '@/knowledge/issues/Android iframe 文件 url 触发下载/index.vue';
import AntDesignVueButton from '@/knowledge/issues/AntDesignVue 按钮 Button 移动端点击异常/index.vue';

const isShowIframe = ref(false);
function openIframe() {
    console.log('openIframe');
    isShowIframe.value = true;
}

</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    // align-items: center;
}
.hover-test {
    height: 100px;
    width: 200px;
    background-color: red;
    .hover-item {
        display: none;
    }
    &:hover {
        .hover-item {
            display: block;
        }
    }
}
</style>
