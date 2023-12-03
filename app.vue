<template>
  <div class="h-100% w-100% relative">
    <div
      class="flex flex-wrap justify-center"
      @touchstart="setTouches"
      @touchmove.prevent="setTouches"
      @touchend="resetTouches"
    >
      <Dot
        v-for="(_, index) in dots"
        :key="index"
        :active="idsActive.includes(index)"
        :hoverAnimation="values[Names.PAINT_ON_HOVER]"
      />
    </div>

    <div class="flex justify-center button-position">
      <Box
        :corners="2"
        animation
        class="cursor-pointer"
        @click="openMenu = !openMenu"
      >
        <template #content>
          <div class="ml-40px mr-40px mt-15px mb-25px">
            <label v-if="!openMenu">MENU</label>
            <label v-else>CLOSE</label>
          </div>
        </template>
      </Box>
    </div>

    <modal :open="openMenu">
      <template #content>
        <div class="p-40px">
          <h2 class="mt-0">OPTIONS</h2>
          <div class="mt-26px">
            <h3>GENERAL</h3>
            <CustomInput
             class="cursor-pointer"
              text="Paint on hover"
              mode="checkbox"
              :nameValue= "Names.PAINT_ON_HOVER"
            ></CustomInput>
            <CustomInput
             class="cursor-pointer"
              text="Seconds before fade "
              mode="number"
              :nameValue= "Names.SECONDS_ON_FADE"
            ></CustomInput>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts" setup>

const {values,Names} = useVariableControl()
const { dots, touches, setTouches, resetTouches } = useGridControl();

const idsActive = computed(() => touches.value.map((item) => item.index));
const openMenu = ref(false);

</script>
