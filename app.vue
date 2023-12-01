<template>
  <div class="h-100% w-100% relative">
    <div class="flex flex-wrap justify-center" @touchstart="setTouches" @touchmove.prevent="setTouches"
      @touchend="resetTouches">
      <Dot v-for="(_, index) in dots" :key="index" :active="idsActive.includes(index)" />
    </div>

    <div class="flex justify-center button-position">
      <Box :corners="2" animation class="cursor-pointer" @click="openMenu = !openMenu">
        <template #content>
          <div class="ml-40px mr-40px mt-20px mb-20px">
            <label>MENU</label>
          </div>
        </template>
      </Box>
    </div>

    <modal :open="openMenu"></modal>
  </div>
</template>

<script lang="ts" setup>
const { dots, touches, setTouches, resetTouches } = useGridControl();
const idsActive = computed(() => touches.value.map((item) => item.index));

const openMenu = ref(false)


</script>
