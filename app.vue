<template>
  <div class="h-100% w-100% relative">
    <canvas ref="canvas" @touchmove.prevent="setTouches" @touchend="resetTouches" 
    @mousemove="setTouches"
      @mouseleave="resetTouches"></canvas>

    <div class="flex justify-center button-position">
      <Box :corners="2" animation class="cursor-pointer" @click="openMenu = !openMenu">
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
          <div class="flex mt-46px gap-66px flex-wrap">
            <div>
              <h3 class="mt-0">GENERAL</h3>
              <CustomInput class="cursor-pointer mb-20px" text="Paint on hover" mode="checkbox"
                :nameValue="Names.PAINT_ON_HOVER"></CustomInput>
              <CustomInput class="mb-20px" text="Seconds before fade " mode="number" :nameValue="Names.SECONDS_ON_FADE">
              </CustomInput>
              <h3 class="mt-0 mb-0">EXPERIMENTAL</h3>
              <p class="mt-0 danger">This options can freeze your browser</p>
              <CustomInput class="mb-20px" text="Dot size " mode="number" :nameValue="Names.DOT_SIZE"></CustomInput>
              <CustomInput text="Gap" mode="number" :nameValue="Names.GRID_GAP"></CustomInput>
            </div>
            <div>
              <h3 class="mt-0">COLORS</h3>
              <CustomInput class="cursor-pointer mb-20px" text="Dot active" mode="color"
                :nameValue="Names.DOT_COLOR_ACTIVE"></CustomInput>
              <CustomInput class="cursor-pointer mb-20px" text="Dot inactive" mode="color"
                :nameValue="Names.DOT_COLOR_INACTIVE"></CustomInput>
              <CustomInput class="cursor-pointer" text="Background" mode="color" :nameValue="Names.BACKGROUND_COLOR">
              </CustomInput>
            </div>

          </div>

          <div class="flex mt-40px gap-26px">
            <Box :corners="4" animation class="cursor-pointer" @click="applyChanges">
              <template #content>
                <div class="ml-40px mr-40px mt-16px mb-16px">
                  <label>APPLY</label>
                </div>
              </template>
            </Box>
            <Box :corners="4" animation class="cursor-pointer" @click="resetVariables">
              <template #content>
                <div class="ml-40px mr-40px mt-16px mb-16px">
                  <label>RESET</label>
                </div>
              </template>
            </Box>

          </div>

        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts" setup>
const openMenu = ref(false);
const canvas: Ref<HTMLCanvasElement | null> = ref(null)

const { Names, resetDefaults, saveValues } = useVariableControl()
const { customCanvas, setTouches, resetTouches, calculateItemSize, createDots } = useGridControl();

function start() {
  if (!canvas.value) {
    console.error('Canvas not defined')
    return
  }

  customCanvas.value = new CustomCanvas(canvas.value, window.innerWidth, window.innerHeight, calculateItemSize(), window.devicePixelRatio)
  createDots()
}

function applyChanges() {
  saveValues()
  start()
  openMenu.value = false
}

function resetVariables() {
  resetDefaults()
  start()
  openMenu.value = false
}

onMounted(() => {
  start()
  window.onresize = start;
})

</script>
