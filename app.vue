<template>
  <div class="h-100% w-100%" @touchstart="setCoord" @touchmove="setCoord" @touchend="resetCoord">
    <div class="flex flex-wrap justify-center">
      <Dot v-for="(_, index) in dots" :key="index" :active="calculateIndex === index" :size="dotSize" />
    </div>

  </div>
</template>

<script lang="ts" setup>
const { calculateIndex, dots, dotSize, setCoord, resetCoord } = useGridControl();
</script>