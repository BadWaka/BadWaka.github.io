
<template>
    <div
        class="container"
    >
        <Tabs/>
        <List/>
    </div>
</template>

<script setup lang="ts">

import Tabs from '@/components/Tabs.vue';
import List from '@/pages/list/List.vue';

</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
