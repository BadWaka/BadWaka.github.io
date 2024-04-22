
<template>
    <div
        class="tabs"
    >
        <div
            v-for="tab in tabs"
            class="item"
        >
            {{ tab.name }}
        </div>
    </div>
</template>

<script setup lang="ts">

import {
    useMainStore
} from '@/store';
import {
    storeToRefs
} from 'pinia';

const mainStore = useMainStore();
const {
    tabs
} = storeToRefs(mainStore);

const props = defineProps({
    list: Array
});

</script>

<style scoped lang="scss">
.tabs {
    display: flex;
    .item {
        padding: 10px;
        cursor: pointer;
    }
}
</style>
