<template>
  <div class="h-100% w-100%" @touchstart="setCoord" @touchmove="setCoord" @touchend="resetCoord">
    <div class="flex flex-wrap justify-center">
      <Dot v-for="(_, index) in dots" :key="index" :active="calculateIndex === index" />
    </div>

  </div>
</template>

<script lang="ts" setup>
const dotSize = 32;
const { calculateIndex, dots, setCoord, resetCoord } = useGridControl(dotSize);
</script>