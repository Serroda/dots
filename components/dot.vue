<template>
    <div class="dot-container" :class="{ 'active': active }">
        <div class="dot" :style="'width:' + (size - 12) + 'px; height:'+(size - 12)+ 'px'"></div>
    </div>
</template>

<script lang="ts" setup>
 withDefaults(defineProps<{
    active?: boolean,
    size: number
}>(),{
    active: false
})

</script>