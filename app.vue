<template>
  <div
    class="h-100% w-100%"
    @touchstart="setTouches"
    @touchmove.prevent="setTouches"
    @touchend="resetTouches"
  >
    <div class="flex flex-wrap justify-center">
      <Dot
        v-for="(_, index) in dots"
        :key="index"
        :active="idsActive.includes(index)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { dots, touches, setTouches, resetTouches } = useGridControl();
const idsActive = computed(() => touches.value.map((item) => item.index));
</script>
