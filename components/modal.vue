<template>
    <Teleport to="body">
        <Transition name="slideBotTop">
            <div class="modal" v-if="open">
                <slot name="content"></slot>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ open: boolean }>(), { open: false });
</script>

<style scoped>
.modal {
    background: var(--background);
    border: 1px solid #333333;
    position: absolute;

    top: 20%;
    left: 0;
    right: 0;
    margin: 0  auto;

    max-width: 400px;
    max-height: 60dvh;
    height: 100%;

    z-index: 5;
}

.slideBotTop-enter-active,
.slideBotTop-leave-active {
    transition: top 0.5s ease;
}

.slideBotTop-enter-from,
.slideBotTop-leave-to {
    top: 100%
}

.slideBotTop-enter-to,
.slideBotTop-leave-from {
    top: 20%
}
</style>
