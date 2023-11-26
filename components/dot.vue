<template>
    <div class="dot-container" :class="{ 'active': active }">
        <div class="dot"></div>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    active?: boolean
}>(),{
    active: false
})

</script>