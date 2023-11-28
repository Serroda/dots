<template>
  <div class="dot-container" :style="gridGap" :class="{ active: active }">
    <div class="dot" :style="dotSize"></div>
  </div>
</template>

<script lang="ts" setup>
const variableControl = useVariableControl();
withDefaults(
  defineProps<{
    active?: boolean;
  }>(),
  {
    active: false,
  }
);

const dotSize = computed(
  () =>
    "width:" +
    (variableControl.dotSize - variableControl.gridGap * 2) +
    "px;height:" +
    (variableControl.dotSize - variableControl.gridGap * 2) +
    "px;"
);

const gridGap = computed(() => "padding:" + variableControl.gridGap + "px;");
</script>
