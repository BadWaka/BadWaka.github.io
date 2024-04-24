
<template>
    <div
        class="list"
    >
        <div
            v-for="item in list"
        >
            <Article
                :data="item"
            />
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
    list
} = storeToRefs(mainStore);

import Article from '@/components/Article.vue';

</script>

<style scoped lang="scss">
.list {
    width: 1000px;
}
</style>
