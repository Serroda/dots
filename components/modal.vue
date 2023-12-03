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
    background: #0D0D0D;
    border: 1px solid #333333;
    position: absolute;

    top: 10%;
    left: 0;
    right: 0;
    margin: 0  auto;

    max-width: 660px;
    max-height: 80dvh;
    height: auto;

    z-index: 5;

    overflow-y: auto;
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
    top: 10%
}
</style>
