<template>
  <div class="box">

    <div class="corner animation" v-if="animation" :class="[corners === 4 ? 'fat-border p' + corner : 'p' + corner]"
      v-for="corner in 4" :key="corner"></div>
    <div class="corner" :class="'p' + corner" v-for="corner in corners" :key="corner"></div>

    <div class="z-2">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  corners?: number,
  animation?: boolean
}>(), {
  corners: 0,
  animation: false
});
</script>

<style scoped>
.box {
  outline: 2px solid var(--color-8);
  background: var(--background);
  position: relative;
  width: auto;
  height: auto;
}

.box:hover .corner.animation {
  opacity: 1;
  width: 55%;
  height: 55%;
}

.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 5px solid var(--color-2);
}


.corner.animation {
  opacity: 0;
  width: 0;
  height: 0;
  border: 5px solid var(--color-2);
  transition: opacity .7s, width .7s, height .7s;
  z-index: 1;
}


.corner.animation.fat-border {
  border-width: 6px;
}

.corner.p1{
  right: -3px;
  top: -3px;
  border-bottom: none;
  border-left: none;
}
.corner.p2{
  left: -3px;
  top: -3px;
  border-bottom: none;
  border-right: none;
}

.corner.p3 {
  left: -3px;
  bottom: -3px;
  border-top: none;
  border-right: none;
}

.corner.p4{
  right: -3px;
  bottom: -3px;
  border-top: transparent;
  border-left: transparent;
}

</style>