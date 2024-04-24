
<template>
    <div
        v-if="data"
        class="article"
    >
        <div>
            {{ data.title }}
        </div>
        <div
            v-html="data.html"
        >
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    data: Object
});

</script>

<style scoped lang="scss">
.article {
    padding: 20px;
    background-color: #fff;
}
</style>
