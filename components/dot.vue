<template>
  <div class="dot-container" :class="dotClass">
    <div class="dot"></div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    active?: boolean;
    hoverAnimation: boolean
  }>(),
  {
    active: false,
  }
);

const dotClass = computed(() => {
  let result = ''

  if (props.active) {
    result += 'active '
  }

  if (props.hoverAnimation) {
    result += 'hover-animation '
  }

  return result
})

</script>
