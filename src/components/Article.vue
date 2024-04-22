
<template>
    <div
        v-if="data"
    >
        <div>
            {{ data.title }}
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    data: Object
});

</script>

<style scoped lang="scss">
</style>
